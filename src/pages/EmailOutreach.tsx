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
import { 
  Mail, 
  Users, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  LogOut, 
  RefreshCw,
  Database
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
      // Always simulate email sending in database mode
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

      // Show results
      if (successCount > 0) {
        toast.success(`[SIMULATED] Successfully sent ${successCount} email${successCount !== 1 ? 's' : ''}`);
      }
      if (failCount > 0) {
        toast.error(`[SIMULATED] Failed to send ${failCount} email${failCount !== 1 ? 's' : ''}`);
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
            <p className="text-gray-600">Loading your contacts from database...</p>
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
          {/* Database Status Section */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-blue-100">
                    {databaseConnected ? (
                      <Database className="h-6 w-6 text-blue-600" />
                    ) : (
                      <AlertCircle className="h-6 w-6 text-red-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900">
                      {databaseConnected ? 'Database Connected' : 'Database Connection Issue'}
                    </h3>
                    <p className="text-blue-700">
                      {databaseConnected 
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
                    className="border-blue-300 text-blue-700 hover:bg-blue-100"
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${isLoadingContacts ? 'animate-spin' : ''}`} />
                    Refresh Contacts
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Connection Alert */}
          {!databaseConnected && (
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