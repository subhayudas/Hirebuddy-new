import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { contactsService, ContactForDisplay } from '@/services/contactsService';
import { testDatabaseConnection } from '@/utils/databaseTest';
import ContactList from '@/components/email/ContactList';
import SimpleEmailComposer from '@/components/email/SimpleEmailComposer';
import AWSEmailComposer from '@/components/email/AWSEmailComposer';
import { useAuth } from '@/contexts/AuthContext';
import { googleAuthService, GoogleUser, GoogleContact } from '@/services/googleAuthService';
import emailService from '@/services/emailService';
import { 
  Mail, 
  Users, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  LogOut, 
  RefreshCw,
  Database,
  Shield,
  ShieldCheck,
  Link as LinkIcon,
  Info,
  Zap,
  Cloud,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const EmailOutreach = () => {
  const { signOut } = useAuth();
  const [contacts, setContacts] = useState<ContactForDisplay[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingContacts, setIsLoadingContacts] = useState(false);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [databaseConnected, setDatabaseConnected] = useState(false);
  const [activeEmailMode, setActiveEmailMode] = useState<'aws' | 'gmail' | 'simulation'>('aws');
  const [awsApiStatus, setAwsApiStatus] = useState<{ connected: boolean; message: string } | null>(null);
  
  // Gmail authentication states - Always start as null to force authentication
  const [googleUser, setGoogleUser] = useState<GoogleUser | null>(null);
  const [isGoogleAuthenticating, setIsGoogleAuthenticating] = useState(false);
  const [googleContacts, setGoogleContacts] = useState<GoogleContact[]>([]);
  const [useGmailMode, setUseGmailMode] = useState(false);
  const [hasAttemptedAuth, setHasAttemptedAuth] = useState(false);

  // Load Google contacts
  const loadGoogleContacts = async () => {
    if (!googleUser) return;
    
    setIsLoadingContacts(true);
    try {
      const googleContactsData = await googleAuthService.getContacts(googleUser.access_token);
      setGoogleContacts(googleContactsData);
      
      // Convert Google contacts to display format
      const displayContacts: ContactForDisplay[] = googleContactsData.map(contact => ({
        id: contact.id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone || '',
        company: contact.company || '',
        title: contact.title || '',
        status: 'active',
        email_sent: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));
      
      setContacts(displayContacts);
      toast.success(`Loaded ${googleContactsData.length} contacts from Google`);
    } catch (error) {
      console.error('Error loading Google contacts:', error);
      toast.error('Failed to load Google contacts');
    } finally {
      setIsLoadingContacts(false);
    }
  };

  // Handle Gmail authentication - Always required
  const handleGmailAuth = async () => {
    setIsGoogleAuthenticating(true);
    setHasAttemptedAuth(true);
    try {
      await googleAuthService.initiateAuth();
    } catch (error) {
      console.error('Error initiating Google auth:', error);
      toast.error('Failed to initiate Gmail authentication');
      setIsGoogleAuthenticating(false);
    }
  };

  // Handle successful authentication (called from callback)
  const handleAuthSuccess = (user: GoogleUser) => {
    setGoogleUser(user);
    setIsGoogleAuthenticating(false);
    
    // Show detailed success message
    const hasRefreshToken = !!user.refresh_token;
    toast.success(
      `Gmail authentication successful! ${hasRefreshToken ? 'Full access granted' : 'Limited access - may need re-authentication later'}`
    );
    
    console.log('Gmail authentication details:', {
      email: user.email,
      hasAccessToken: !!user.access_token,
      hasRefreshToken: hasRefreshToken,
      provider: user.provider,
      lastUpdated: user.updated_at
    });
  };

  // Check authentication status and refresh if needed
  const checkAuthStatus = async () => {
    if (!googleUser) return;
    
    try {
      setIsGoogleAuthenticating(true);
      const refreshedUser = await googleAuthService.getStoredUser();
      
      if (refreshedUser) {
        setGoogleUser(refreshedUser);
        toast.success('Authentication status verified');
      } else {
        setGoogleUser(null);
        toast.warning('Authentication expired. Please re-authenticate.');
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      toast.error('Error checking authentication status');
    } finally {
      setIsGoogleAuthenticating(false);
    }
  };

  // Switch between Gmail and Database modes
  const switchToGmailMode = () => {
    if (!googleUser) {
      toast.warning('Please authenticate with Gmail first');
      return;
    }
    setUseGmailMode(true);
    loadGoogleContacts();
  };

  const switchToDatabaseMode = () => {
    setUseGmailMode(false);
    loadContactsFromDatabase();
  };

  // Load contacts from Supabase database
  const loadContactsFromDatabase = async () => {
    setIsLoadingContacts(true);
    try {
      console.log('🔍 Loading contacts from database...');
      
      // First test the database connection
      const testResult = await testDatabaseConnection();
      if (!testResult.success) {
        console.error('Database connection test failed:', testResult);
        toast.error(`Database connection failed: ${testResult.message}`);
        setDatabaseConnected(false);
        return;
      }

      setDatabaseConnected(true);
      const contactsData = await contactsService.getContacts();
      setContacts(contactsData);
      
      if (contactsData.length > 0) {
        toast.success(`Loaded ${contactsData.length} contacts from database`);
      } else {
        toast.info('No contacts found in database');
      }
      
      // Log environment info for debugging
      console.log('Environment:', {
        mode: import.meta.env.MODE,
        supabaseUrl: import.meta.env.VITE_SUPABASE_URL ? 'Present' : 'Missing',
        supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Present' : 'Missing'
      });
    } catch (error) {
      console.error('Error loading contacts from database:', error);
      toast.error(`Failed to load contacts from database: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setDatabaseConnected(false);
    } finally {
      setIsLoadingContacts(false);
    }
  };

  // Test AWS API connection
  const testAwsApiConnection = async () => {
    try {
      const result = await emailService.testConnection();
      setAwsApiStatus({
        connected: result.success,
        message: result.message
      });
      if (result.success) {
        toast.success('AWS Email API connected successfully');
      } else {
        toast.error(`AWS Email API connection failed: ${result.message}`);
      }
    } catch (error) {
      setAwsApiStatus({
        connected: false,
        message: `Connection error: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
  };

  useEffect(() => {
    const initializePage = async () => {
      setIsLoading(true);
      
      // Test AWS API connection first
      await testAwsApiConnection();
      
      // First, check for existing Gmail authentication in database
      try {
        console.log('🔍 Checking for existing Gmail authentication...');
        const storedUser = await googleAuthService.getStoredUser();
        if (storedUser) {
          console.log('✅ Found valid Gmail authentication in database');
          handleAuthSuccess(storedUser);
        } else {
          console.log('❌ No valid Gmail authentication found');
        }
      } catch (error) {
        console.error('Error checking for existing Gmail auth:', error);
      }
      
      // Load database contacts
      await loadContactsFromDatabase();
      setIsLoading(false);
    };

    initializePage();
  }, []);

  // Check for OAuth callback completion
  useEffect(() => {
    const checkForCallbackAuth = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const fromCallback = urlParams.get('authenticated') === 'true';
        
        if (fromCallback) {
          console.log('🔄 Checking authentication after OAuth callback...');
          const storedUser = await googleAuthService.getStoredUser();
          if (storedUser) {
            console.log('✅ OAuth callback successful - user authenticated');
            handleAuthSuccess(storedUser);
          } else {
            console.log('❌ OAuth callback completed but no valid tokens found');
            toast.error('Authentication completed but tokens are invalid. Please try again.');
          }
          // Clean up URL
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      } catch (error) {
        console.error('Error checking callback auth:', error);
        toast.error('Error validating authentication. Please try again.');
      }
    };
    
    checkForCallbackAuth();
  }, []);

  const handleContactSelect = (contactId: string) => {
    setSelectedContacts(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleSelectAll = () => {
    setSelectedContacts(contacts.map(contact => contact.id));
  };

  const handleClearSelection = () => {
    setSelectedContacts([]);
  };

  const handleSendEmail = (contactIds: string[]) => {
    const selectedContactsData = contacts.filter(contact => 
      contactIds.includes(contact.id)
    );
    setSelectedContacts(contactIds);
    
    // Show warning if not authenticated with Gmail
    if (!googleUser) {
      toast.warning('Gmail not authenticated - emails will be simulated only. Authenticate Gmail to send real emails.');
    }
    
    setIsComposerOpen(true);
  };

  const handleEmailSend = async (subject: string, body: string, isHtml: boolean) => {
    setIsSending(true);
    const selectedContactsData = contacts.filter(contact => 
      selectedContacts.includes(contact.id)
    );

    let successCount = 0;
    let failCount = 0;

    try {
      if (useGmailMode && googleUser) {
        // Use FastAPI backend for real Gmail sending
        if (!googleUser.access_token) {
          toast.error('Gmail authentication expired. Please re-authenticate.');
          setGoogleUser(null);
          setIsSending(false);
          return;
        }
        
        toast.info('Sending emails through FastAPI backend...');
        
        for (const contact of selectedContactsData) {
          try {
            // Use your FastAPI backend instead of direct Gmail API
            const request = {
              sender: googleUser.email,
              to: contact.email,
              subject: subject,
              body: isHtml ? body : emailService.formatAsHtml(body)
            };

            const response = await emailService.sendEmail(request);
            
            successCount++;
            console.log(`Email sent to ${contact.name} (${contact.email}) via FastAPI`);
            console.log(`Response:`, response);
            
            toast.success(`Email sent to ${contact.name}`, {
              description: `Message ID: ${response.messageId}`
            });
            
          } catch (error) {
            failCount++;
            console.error(`Error sending email to ${contact.email}:`, error);
            
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            toast.error(`Failed to send to ${contact.name}`, {
              description: errorMessage
            });
          }
        }
      } else {
        // Simulate email sending in database mode
        toast.info('Simulating email sending...');
        
        for (const contact of selectedContactsData) {
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Simulate 90% success rate
          const success = Math.random() > 0.1;
          
          if (success) {
            successCount++;
            console.log(`[SIMULATED] Email sent to ${contact.name} (${contact.email})`);
            console.log(`[SIMULATED] Subject: ${subject}`);
            console.log(`[SIMULATED] Body: ${body}`);
            
            // Mark email as sent in database
            try {
              await contactsService.markEmailSent(contact.id);
            } catch (error) {
              console.error(`Error marking email as sent for ${contact.id}:`, error);
            }
          } else {
            failCount++;
            console.log(`[SIMULATED] Failed to send email to ${contact.email}`);
          }
        }
      }

      // Show results
      if (successCount > 0) {
        const mode = useGmailMode && googleUser ? '' : '[SIMULATED] ';
        toast.success(`${mode}Successfully sent ${successCount} email${successCount !== 1 ? 's' : ''}`);
      }
      if (failCount > 0) {
        const mode = useGmailMode && googleUser ? '' : '[SIMULATED] ';
        toast.error(`${mode}Failed to send ${failCount} email${failCount !== 1 ? 's' : ''}`);
      }

      // Refresh contacts to show updated email sent status
      if (!useGmailMode) {
        await loadContactsFromDatabase();
      }
      
      // Close composer and clear selection
      setIsComposerOpen(false);
      setSelectedContacts([]);
    } catch (error) {
      console.error('Error sending emails:', error);
      toast.error('Failed to send emails');
    } finally {
      setIsSending(false);
    }
  };

  const handleRefreshDatabase = () => {
    if (useGmailMode) {
      loadGoogleContacts();
    } else {
      loadContactsFromDatabase();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fff7f8] flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#d35c65] mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Loading Email Outreach</h3>
            <p className="text-gray-600">Loading your contacts...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff7f8]">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(236,72,153,0.08)_1px,transparent_0)] bg-[length:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      {/* Header */}
      <header className="bg-white border-b border-pink-100 shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-mabry font-semibold text-[#403334]">Email Outreach</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/email-api-test">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Test API
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={signOut} 
                className="border-pink-200 text-[#403334] hover:bg-pink-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="space-y-8">
          {/* Re-authenticate Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleGmailAuth}
              variant="outline"
              size="sm"
              className="border-orange-300 text-orange-700 hover:bg-orange-50"
              disabled={isGoogleAuthenticating}
            >
              {isGoogleAuthenticating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Re-authenticate Gmail
                </>
              )}
            </Button>
          </div>
          
          <Alert className="bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Having trouble sending emails?</strong> If you're experiencing issues with email delivery, try re-authenticating your Gmail account using the button above.
            </AlertDescription>
          </Alert>

          {/* Connection Alert */}
          {!useGmailMode && !databaseConnected && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Database Connection Issue:</strong> Unable to load contacts from the database. 
                Please check your internet connection and try refreshing the page.
              </AlertDescription>
            </Alert>
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                    <p className="text-2xl font-bold text-[#403334]">{contacts.length}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Selected</p>
                    <p className="text-2xl font-bold text-[#403334]">{selectedContacts.length}</p>
                  </div>
                  <div className="bg-[#d35c65]/10 p-3 rounded-full">
                    <CheckCircle className="h-6 w-6 text-[#d35c65]" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Email Mode</p>
                    <p className="text-2xl font-bold text-[#403334]">
                      {useGmailMode && googleUser ? 'Real' : 'Simulation'}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${useGmailMode && googleUser ? 'bg-green-100' : 'bg-yellow-100'}`}>
                    <Mail className={`h-6 w-6 ${useGmailMode && googleUser ? 'text-green-600' : 'text-yellow-600'}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Auth Status</p>
                    <p className="text-2xl font-bold text-[#403334]">
                      {googleUser ? 'Active' : 'None'}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${googleUser ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <Shield className={`h-6 w-6 ${googleUser ? 'text-green-600' : 'text-gray-600'}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Debug Information - Only show in development */}
          {import.meta.env.DEV && googleUser && (
            <Card className="bg-gray-50 border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-sm text-gray-700 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Debug: Authentication Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-600">Google ID:</p>
                    <p className="text-gray-800 font-mono text-xs">{googleUser.google_id}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Provider:</p>
                    <p className="text-gray-800">{googleUser.provider}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Access Token:</p>
                    <p className="text-gray-800">{googleUser.access_token ? `${googleUser.access_token.substring(0, 20)}...` : 'None'}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Refresh Token:</p>
                    <p className="text-gray-800">{googleUser.refresh_token ? 'Present' : 'None'}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Created:</p>
                    <p className="text-gray-800">{new Date(googleUser.created_at).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Updated:</p>
                    <p className="text-gray-800">{new Date(googleUser.updated_at).toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* AWS Email API Section */}
          <div className="space-y-6">
            <Alert className={awsApiStatus?.connected ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
              <Cloud className={`h-4 w-4 ${awsApiStatus?.connected ? 'text-green-600' : 'text-red-600'}`} />
              <AlertDescription className={awsApiStatus?.connected ? "text-green-800" : "text-red-800"}>
                <strong>AWS Email API:</strong> {awsApiStatus?.message || 'Checking connection...'}
              </AlertDescription>
            </Alert>
            
            <AWSEmailComposer
              contacts={contacts.map(c => ({
                id: c.id,
                name: c.name,
                email: c.email,
                company: c.company,
                position: c.title
              }))}
              selectedContacts={selectedContacts}
              onContactSelect={handleContactSelect}
              onSelectAll={handleSelectAll}
              onClearSelection={handleClearSelection}
            />
          </div>
        </div>
      </div>

      {/* Email Composer Modal */}
      {isComposerOpen && (
        <SimpleEmailComposer
          selectedContacts={contacts.filter(contact => selectedContacts.includes(contact.id))}
          onSendEmail={handleEmailSend}
          onClose={() => setIsComposerOpen(false)}
          isOpen={isComposerOpen}
          sending={isSending}
        />
      )}
    </div>
  );
};

export default EmailOutreach; 