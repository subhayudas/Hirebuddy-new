import { supabase } from '@/lib/supabase';

export interface GoogleUser {
  id: string;
  google_id: string;
  email: string;
  name: string;
  profile_picture?: string;
  access_token: string;
  refresh_token?: string;
  provider: string;
  created_at: string;
  updated_at: string;
}

export interface GoogleContact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  title?: string;
}

class GoogleAuthService {
  private clientId: string;
  private redirectUri: string;
  private scope: string;

  constructor() {
    this.clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
    this.redirectUri = `${window.location.origin}/auth/google/callback`;
    this.scope = [
      'https://www.googleapis.com/auth/gmail.send',
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/gmail.metadata',
      'https://www.googleapis.com/auth/gmail.labels',
      'https://www.googleapis.com/auth/gmail.modify',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/contacts.readonly'
    ].join(' ');
  }

  // Initialize Google OAuth flow
  async initiateAuth(): Promise<void> {
    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authUrl.searchParams.set('client_id', this.clientId);
    authUrl.searchParams.set('redirect_uri', this.redirectUri);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('scope', this.scope);
    authUrl.searchParams.set('access_type', 'offline');
    authUrl.searchParams.set('prompt', 'consent');
    
    // Store current user session for later reference
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      localStorage.setItem('pending_google_auth_user', session.user.id);
    }
    
    window.location.href = authUrl.toString();
  }

  // Handle OAuth callback and exchange code for tokens
  async handleCallback(code: string): Promise<GoogleUser | null> {
    try {
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: this.clientId,
          client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET || '',
          code,
          grant_type: 'authorization_code',
          redirect_uri: this.redirectUri,
        }),
      });

      if (!tokenResponse.ok) {
        throw new Error('Failed to exchange code for tokens');
      }

      const tokens = await tokenResponse.json();
      
      // Get user info from Google
      const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      });

      if (!userInfoResponse.ok) {
        throw new Error('Failed to get user info');
      }

      const userInfo = await userInfoResponse.json();
      
      // Store user info and tokens in Supabase
      const googleUser = await this.storeUserTokens({
        google_id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        profile_picture: userInfo.picture,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      });

      return googleUser;
    } catch (error) {
      console.error('Error handling Google OAuth callback:', error);
      return null;
    }
  }

  // Store user tokens in Supabase
  private async storeUserTokens(userData: {
    google_id: string;
    email: string;
    name: string;
    profile_picture?: string;
    access_token: string;
    refresh_token?: string;
  }): Promise<GoogleUser> {
    const { data, error } = await supabase
      .from('users')
      .upsert({
        google_id: userData.google_id,
        email: userData.email,
        name: userData.name,
        profile_picture: userData.profile_picture,
        access_token: userData.access_token,
        refresh_token: userData.refresh_token,
        provider: 'google',
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'google_id',
        ignoreDuplicates: false
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to store user tokens: ${error.message}`);
    }

    return data;
  }

  // Get stored user by current session and validate tokens
  async getStoredUser(): Promise<GoogleUser | null> {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return null;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', session.user.email)
      .single();

    if (error || !data) return null;

    // Validate that user has both access_token and refresh_token
    if (!data.access_token) {
      console.log('User found but no access token');
      return null;
    }

    // Test if the access token is still valid
    const isValid = await this.validateAccessToken(data.access_token);
    if (isValid) {
      return data;
    }

    // If access token is invalid, try to refresh it
    if (data.refresh_token) {
      const newAccessToken = await this.refreshAccessToken(data.refresh_token);
      if (newAccessToken) {
        // Update the access token in database
        const { data: updatedData, error: updateError } = await supabase
          .from('users')
          .update({ 
            access_token: newAccessToken,
            updated_at: new Date().toISOString()
          })
          .eq('id', data.id)
          .select()
          .single();

        if (!updateError && updatedData) {
          return updatedData;
        }
      }
    }

    // If we can't refresh the token, the user needs to re-authenticate
    console.log('Unable to refresh token, user needs to re-authenticate');
    return null;
  }

  // Validate access token by making a test API call
  private async validateAccessToken(accessToken: string): Promise<boolean> {
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v1/tokeninfo', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const tokenInfo = await response.json();
        // Check if token has required scopes
        const requiredScopes = [
          'https://www.googleapis.com/auth/gmail.send',
          'https://www.googleapis.com/auth/gmail.labels',
          'https://www.googleapis.com/auth/gmail.modify',
          'https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/contacts.readonly'
        ];
        
        const tokenScopes = tokenInfo.scope ? tokenInfo.scope.split(' ') : [];
        const hasRequiredScopes = requiredScopes.every(scope => 
          tokenScopes.includes(scope)
        );

        return hasRequiredScopes;
      }

      return false;
    } catch (error) {
      console.error('Error validating access token:', error);
      return false;
    }
  }

  // Clear stored authentication - for forcing re-authentication
  async clearStoredAuth(): Promise<void> {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;

    const { error } = await supabase
      .from('users')
      .delete()
      .eq('email', session.user.email);

    if (error) {
      console.error('Error clearing stored auth:', error);
    }
  }

  // Refresh access token if needed
  async refreshAccessToken(refreshToken: string): Promise<string | null> {
    try {
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: this.clientId,
          client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET || '',
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const tokens = await response.json();
      return tokens.access_token;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      return null;
    }
  }

  // Get Google contacts
  async getContacts(accessToken: string): Promise<GoogleContact[]> {
    try {
      const response = await fetch(
        'https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses,phoneNumbers,organizations',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }

      const data = await response.json();
      
      return (data.connections || []).map((connection: any) => ({
        id: connection.resourceName,
        name: connection.names?.[0]?.displayName || 'Unknown',
        email: connection.emailAddresses?.[0]?.value || '',
        phone: connection.phoneNumbers?.[0]?.value,
        company: connection.organizations?.[0]?.name,
        title: connection.organizations?.[0]?.title,
      })).filter((contact: GoogleContact) => contact.email);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return [];
    }
  }

  // Send email via Gmail API
  async sendEmail(
    accessToken: string,
    to: string,
    subject: string,
    body: string,
    isHtml = false
  ): Promise<boolean> {
    try {
      const email = [
        `To: ${to}`,
        `Subject: ${subject}`,
        `Content-Type: ${isHtml ? 'text/html' : 'text/plain'}; charset=utf-8`,
        '',
        body
      ].join('\n');

      const encodedEmail = btoa(unescape(encodeURIComponent(email)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

      const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          raw: encodedEmail,
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }

  // Revoke access
  async revokeAccess(accessToken: string): Promise<boolean> {
    try {
      const response = await fetch(`https://oauth2.googleapis.com/revoke?token=${accessToken}`, {
        method: 'POST',
      });
      return response.ok;
    } catch (error) {
      console.error('Error revoking access:', error);
      return false;
    }
  }
}

export const googleAuthService = new GoogleAuthService(); 