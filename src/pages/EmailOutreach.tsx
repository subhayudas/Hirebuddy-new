import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { googleAuthService, GoogleUser, GoogleContact } from '@/services/googleAuthService';
import { contactsService, ContactForDisplay } from '@/services/contactsService';
import ContactList from '@/components/email/ContactList';
import SimpleEmailComposer from '@/components/email/SimpleEmailComposer';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Mail, 
  Shield, 
  Users, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  LogOut, 
  RefreshCw,
  Send,
  ExternalLink,
  Lock,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

const EmailOutreach = () => {
  const { signOut } = useAuth();
  const [googleUser, setGoogleUser] = useState<GoogleUser | null>(null);
  const [contacts, setContacts] = useState<ContactForDisplay[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingContacts, setIsLoadingContacts] = useState(false);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isDevelopmentMode, setIsDevelopmentMode] = useState(
    import.meta.env.MODE === 'development' && 
    localStorage.getItem('dev_use_real_google_auth') !== 'true'
  );

  // Load contacts from Supabase database
  const loadContactsFromDatabase = async () => {
    setIsLoadingContacts(true);
    try {
      const contactsData = await contactsService.getContacts();
      setContacts(contactsData);
      toast.success(`Loaded ${contactsData.length} contacts from database`);
    } catch (error) {
      console.error('Error loading contacts from database:', error);
      toast.error('Failed to load contacts from database');
    } finally {
      setIsLoadingContacts(false);
    }
  };

  useEffect(() => {
    checkGoogleAuth();
    // Always load contacts from database
    loadContactsFromDatabase();
  }, []);

  const checkGoogleAuth = async () => {
    setIsLoading(true);
    try {
      // In development mode, you can skip Google auth and use database data
      if (import.meta.env.MODE === 'development') {
        // Check if user wants to use real Google auth or just database data
        const useRealAuth = localStorage.getItem('dev_use_real_google_auth') === 'true';
        
        if (!useRealAuth) {
          // Use database data for development
          setIsLoading(false);
          return;
        }
      }
      
      const user = await googleAuthService.getStoredUser();
      if (user) {
        setGoogleUser(user);
        await loadContacts(user.access_token);
      }
    } catch (error) {
      console.error('Error checking Google auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadContacts = async (accessToken: string) => {
    setIsLoadingContacts(true);
    try {
      const contactsData = await googleAuthService.getContacts(accessToken);
      setContacts(contactsData);
      toast.success(`Loaded ${contactsData.length} contacts from Google`);
    } catch (error) {
      console.error('Error loading contacts:', error);
      toast.error('Failed to load contacts');
    } finally {
      setIsLoadingContacts(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await googleAuthService.initiateAuth();
    } catch (error) {
      console.error('Error initiating Google auth:', error);
      toast.error('Failed to start Google authentication');
    }
  };

  const handleRefreshContacts = async () => {
    if (!googleUser) return;
    await loadContacts(googleUser.access_token);
  };

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
      if (isDevelopmentMode) {
        // In development mode, simulate email sending
        toast.info('Development Mode: Simulating email sending...');
        
        for (const contact of selectedContactsData) {
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Simulate 90% success rate
          const success = Math.random() > 0.1;
          
          if (success) {
            successCount++;
            console.log(`[MOCK] Email sent to ${contact.name} (${contact.email})`);
            console.log(`[MOCK] Subject: ${subject}`);
            console.log(`[MOCK] Body: ${body}`);
            
            // Mark email as sent in database
            try {
              await contactsService.markEmailSent(contact.id);
            } catch (error) {
              console.error(`Error marking email as sent for ${contact.id}:`, error);
            }
          } else {
            failCount++;
            console.log(`[MOCK] Failed to send email to ${contact.email}`);
          }
        }
      } else {
        // Real email sending
        if (!googleUser) {
          toast.error('Google authentication required');
          return;
        }

        // Send emails to all selected contacts
        for (const contact of selectedContactsData) {
          try {
            const success = await googleAuthService.sendEmail(
              googleUser.access_token,
              contact.email,
              subject,
              body,
              isHtml
            );
            
            if (success) {
              successCount++;
              // Mark email as sent in database
              try {
                await contactsService.markEmailSent(contact.id);
              } catch (error) {
                console.error(`Error marking email as sent for ${contact.id}:`, error);
              }
            } else {
              failCount++;
            }
          } catch (error) {
            console.error(`Error sending email to ${contact.email}:`, error);
            failCount++;
          }
        }
      }

      // Show results
      if (successCount > 0) {
        toast.success(`${isDevelopmentMode ? '[MOCK] ' : ''}Successfully sent ${successCount} email${successCount !== 1 ? 's' : ''}`);
      }
      if (failCount > 0) {
        toast.error(`${isDevelopmentMode ? '[MOCK] ' : ''}Failed to send ${failCount} email${failCount !== 1 ? 's' : ''}`);
      }

      // Refresh contacts to show updated email sent status
      await loadContactsFromDatabase();
      
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

  const handleRevokeAccess = async () => {
    if (!googleUser) return;

    try {
      await googleAuthService.revokeAccess(googleUser.access_token);
      setGoogleUser(null);
      setContacts([]);
      setSelectedContacts([]);
      toast.success('Google access revoked successfully');
    } catch (error) {
      console.error('Error revoking access:', error);
      toast.error('Failed to revoke access');
    }
  };

  const handleToggleDevelopmentMode = () => {
    const newMode = !isDevelopmentMode;
    setIsDevelopmentMode(newMode);
    
    if (newMode) {
      // Switch to development mode with database data
      localStorage.setItem('dev_use_real_google_auth', 'false');
      setGoogleUser(null);
      setContacts([]);
      setSelectedContacts([]);
      loadContactsFromDatabase();
      toast.success('Switched to development mode with database contacts');
    } else {
      // Switch to real Google auth mode
      localStorage.setItem('dev_use_real_google_auth', 'true');
      setContacts([]);
      setSelectedContacts([]);
      checkGoogleAuth();
      toast.success('Switched to real Google authentication mode');
    }
  };

  const handleRefreshDatabase = () => {
    loadContactsFromDatabase();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fff7f8] flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#d35c65] mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Loading Email Outreach</h3>
            <p className="text-gray-600">Checking your authentication status...</p>
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
              {/* Development Mode Controls */}
              {import.meta.env.MODE === 'development' && (
                <div className="flex items-center space-x-2">
                  <Badge variant={isDevelopmentMode ? "default" : "secondary"} className="text-xs">
                    {isDevelopmentMode ? 'Database Mode' : 'Real Auth'}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleToggleDevelopmentMode}
                    className="border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    {isDevelopmentMode ? 'Use Real Auth' : 'Use Database Only'}
                  </Button>
                </div>
              )}
              
              {googleUser && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRevokeAccess}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Revoke Access
                </Button>
              )}
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
        {!googleUser && !isDevelopmentMode ? (
          // Authentication Required View
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-[#d35c65] rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
              
              <div className="relative z-10">
                <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium bg-white/20 text-white border-white/30">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Gmail Integration
                </Badge>
                
                <h2 className="text-3xl md:text-4xl font-mabry font-semibold mb-4">
                  Connect Your Gmail Account
                </h2>
                <p className="text-white/90 text-lg mb-6 max-w-2xl font-light">
                  Authenticate with Google to access your contacts and send personalized emails 
                  directly through your Gmail account with full security and privacy.
                </p>
              </div>
            </div>

            {/* Authentication Card */}
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                  <Shield className="h-6 w-6 text-[#d35c65]" />
                  Google Authentication Required
                </CardTitle>
                <CardDescription className="text-base">
                  To send emails and access your contacts, you need to authenticate with Google
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="bg-[#d35c65]/10 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <Lock className="h-8 w-8 text-[#d35c65]" />
                    </div>
                    <h3 className="font-semibold mb-2">Secure Authentication</h3>
                    <p className="text-sm text-gray-600">
                      OAuth 2.0 secure authentication with Google
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-[#d35c65]/10 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <Users className="h-8 w-8 text-[#d35c65]" />
                    </div>
                    <h3 className="font-semibold mb-2">Access Contacts</h3>
                    <p className="text-sm text-gray-600">
                      View and select from your Google contacts
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-[#d35c65]/10 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <Send className="h-8 w-8 text-[#d35c65]" />
                    </div>
                    <h3 className="font-semibold mb-2">Send Emails</h3>
                    <p className="text-sm text-gray-600">
                      Send personalized emails through Gmail
                    </p>
                  </div>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Privacy Notice:</strong> We only request access to send emails and read your contacts. 
                    Your data is never stored permanently and tokens are encrypted.
                  </AlertDescription>
                </Alert>

                <div className="text-center">
                  <Button
                    onClick={handleGoogleAuth}
                    size="lg"
                    className="bg-[#d35c65] hover:bg-[#b24e55] text-white px-8 py-3"
                  >
                    <ExternalLink className="h-5 w-5 mr-3" />
                    Connect with Google
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Authenticated View - Show Contacts and Email Interface
          <div className="space-y-8">
            {/* Welcome Back Section */}
            <Card className={`bg-gradient-to-r ${isDevelopmentMode ? 'from-blue-50 to-purple-50 border-blue-200' : 'from-green-50 to-blue-50 border-green-200'}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${isDevelopmentMode ? 'bg-blue-100' : 'bg-green-100'}`}>
                      <CheckCircle className={`h-6 w-6 ${isDevelopmentMode ? 'text-blue-600' : 'text-green-600'}`} />
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold ${isDevelopmentMode ? 'text-blue-900' : 'text-green-900'}`}>
                        {isDevelopmentMode ? 'Development Mode Active' : 'Connected to Gmail'}
                      </h3>
                      <p className={isDevelopmentMode ? 'text-blue-700' : 'text-green-700'}>
                        {isDevelopmentMode 
                          ? 'Using database contacts - no real emails will be sent'
                          : `Signed in as ${googleUser?.name} (${googleUser?.email})`
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isDevelopmentMode ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRefreshDatabase}
                        disabled={isLoadingContacts}
                        className="border-blue-300 text-blue-700 hover:bg-blue-100"
                      >
                        <RefreshCw className={`h-4 w-4 mr-2 ${isLoadingContacts ? 'animate-spin' : ''}`} />
                        Refresh Database
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRefreshContacts}
                        disabled={isLoadingContacts}
                        className="border-green-300 text-green-700 hover:bg-green-100"
                      >
                        <RefreshCw className={`h-4 w-4 mr-2 ${isLoadingContacts ? 'animate-spin' : ''}`} />
                        Refresh Contacts
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      <p className="text-sm font-medium text-gray-600">Ready to Send</p>
                      <p className="text-2xl font-bold text-[#403334]">
                        {selectedContacts.length > 0 ? 'Yes' : 'No'}
                      </p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact List */}
            <ContactList
              contacts={contacts}
              selectedContacts={selectedContacts}
              onContactSelect={handleContactSelect}
              onSelectAll={handleSelectAll}
              onClearSelection={handleClearSelection}
              onSendEmail={handleSendEmail}
              loading={isLoadingContacts}
            />
          </div>
        )}
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