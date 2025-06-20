import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { contactsService, ContactForDisplay } from '@/services/contactsService';
import { testDatabaseConnection } from '@/utils/databaseTest';
import ContactList from '@/components/email/ContactList';
import SimpleEmailComposer from '@/components/email/SimpleEmailComposer';
import { useAuth } from '@/contexts/AuthContext';
import { googleAuthService, GoogleUser, GoogleContact } from '@/services/googleAuthService';
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
  Link
} from 'lucide-react';
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
  
  // Gmail authentication states
  const [googleUser, setGoogleUser] = useState<GoogleUser | null>(null);
  const [isGoogleAuthenticating, setIsGoogleAuthenticating] = useState(false);
  const [googleContacts, setGoogleContacts] = useState<GoogleContact[]>([]);
  const [useGmailMode, setUseGmailMode] = useState(false);

  // Check for existing Google authentication
  const checkGoogleAuth = async () => {
    try {
      const storedUser = await googleAuthService.getStoredUser();
      if (storedUser) {
        setGoogleUser(storedUser);
        toast.success('Gmail authentication found - you can send real emails!');
      }
    } catch (error) {
      console.error('Error checking Google auth:', error);
    }
  };

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

  // Handle Gmail authentication
  const handleGmailAuth = async () => {
    setIsGoogleAuthenticating(true);
    try {
      await googleAuthService.initiateAuth();
    } catch (error) {
      console.error('Error initiating Google auth:', error);
      toast.error('Failed to initiate Gmail authentication');
      setIsGoogleAuthenticating(false);
    }
  };

  // Switch between Gmail and Database modes
  const switchToGmailMode = () => {
    setUseGmailMode(true);
    if (googleUser) {
      loadGoogleContacts();
    }
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

  useEffect(() => {
    const initializePage = async () => {
      setIsLoading(true);
      await checkGoogleAuth();
      await loadContactsFromDatabase();
      setIsLoading(false);
    };

    initializePage();
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
        // Real Gmail sending
        toast.info('Sending emails through Gmail...');
        
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
              console.log(`Email sent to ${contact.name} (${contact.email})`);
            } else {
              failCount++;
              console.log(`Failed to send email to ${contact.email}`);
            }
          } catch (error) {
            failCount++;
            console.error(`Error sending email to ${contact.email}:`, error);
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
          {/* Gmail Authentication Section */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-green-900">
                <Mail className="h-5 w-5" />
                Gmail Integration
              </CardTitle>
              <CardDescription className="text-green-700">
                Connect your Gmail account to send real emails directly through your Gmail
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!googleUser ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-orange-100">
                      <Shield className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Gmail Not Connected</p>
                      <p className="text-sm text-gray-600">Connect Gmail to send real emails instead of simulations</p>
                    </div>
                  </div>
                  <Button
                    onClick={handleGmailAuth}
                    disabled={isGoogleAuthenticating}
                    className="bg-[#4285f4] hover:bg-[#3367d6] text-white"
                  >
                    {isGoogleAuthenticating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Link className="h-4 w-4 mr-2" />
                        Connect Gmail
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-green-100">
                        <ShieldCheck className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Gmail Connected</p>
                        <p className="text-sm text-gray-600">{googleUser.email}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Authenticated
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={switchToGmailMode}
                      disabled={useGmailMode}
                      variant={useGmailMode ? "default" : "outline"}
                      size="sm"
                      className={useGmailMode ? "bg-green-600 hover:bg-green-700" : "border-green-300 text-green-700 hover:bg-green-50"}
                    >
                      Use Gmail Mode
                    </Button>
                    <Button
                      onClick={switchToDatabaseMode}
                      disabled={!useGmailMode}
                      variant={!useGmailMode ? "default" : "outline"}
                      size="sm"
                      className={!useGmailMode ? "bg-blue-600 hover:bg-blue-700" : "border-blue-300 text-blue-700 hover:bg-blue-50"}
                    >
                      Use Database Mode
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Connection Status Section */}
          <Card className={`bg-gradient-to-r ${useGmailMode ? 'from-green-50 to-emerald-50 border-green-200' : 'from-blue-50 to-indigo-50 border-blue-200'}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${useGmailMode ? 'bg-green-100' : 'bg-blue-100'}`}>
                    {useGmailMode ? (
                      <Mail className="h-6 w-6 text-green-600" />
                    ) : databaseConnected ? (
                      <Database className="h-6 w-6 text-blue-600" />
                    ) : (
                      <AlertCircle className="h-6 w-6 text-red-600" />
                    )}
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${useGmailMode ? 'text-green-900' : 'text-blue-900'}`}>
                      {useGmailMode 
                        ? 'Gmail Mode Active' 
                        : databaseConnected 
                          ? 'Database Connected' 
                          : 'Database Connection Issue'
                      }
                    </h3>
                    <p className={useGmailMode ? 'text-green-700' : 'text-blue-700'}>
                      {useGmailMode 
                        ? 'Contacts loaded from Google - emails will be sent through Gmail'
                        : databaseConnected 
                          ? 'Your contacts are loaded from the database - emails will be simulated'
                          : 'Unable to connect to database - please check your connection'
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRefreshDatabase}
                    disabled={isLoadingContacts}
                    className={`${useGmailMode ? 'border-green-300 text-green-700 hover:bg-green-100' : 'border-blue-300 text-blue-700 hover:bg-blue-100'}`}
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${isLoadingContacts ? 'animate-spin' : ''}`} />
                    Refresh Contacts
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

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