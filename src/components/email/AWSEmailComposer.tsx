import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import emailService, { EmailSendRequest, FollowUpRequest } from '@/services/emailService';
import { 
  Mail, 
  Send, 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  User,
  MessageSquare,
  RefreshCw,
  Loader2
} from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  company?: string;
  position?: string;
}

interface AWSEmailComposerProps {
  contacts: Contact[];
  selectedContacts: string[];
  onContactSelect: (contactId: string) => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
}

const AWSEmailComposer = ({ 
  contacts, 
  selectedContacts, 
  onContactSelect, 
  onSelectAll, 
  onClearSelection 
}: AWSEmailComposerProps) => {
  const [emailData, setEmailData] = useState({
    subject: '',
    body: '',
    senderEmail: ''
  });
  const [followUpData, setFollowUpData] = useState({
    body: '',
    recipientEmail: ''
  });
  const [activeTab, setActiveTab] = useState<'compose' | 'followup' | 'conversation'>('compose');
  const [isSending, setIsSending] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [apiStatus, setApiStatus] = useState<{ connected: boolean; message: string } | null>(null);
  const [conversationData, setConversationData] = useState<any[]>([]);
  const [isLoadingConversation, setIsLoadingConversation] = useState(false);

  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    // Set default sender email from authenticated user
    if (user?.email) {
      setEmailData(prev => ({ ...prev, senderEmail: user.email }));
    }
  }, [user]);

  useEffect(() => {
    // Test API connection on component mount
    testApiConnection();
  }, []);

  const testApiConnection = async () => {
    setIsTestingConnection(true);
    try {
      const result = await emailService.testConnection();
      setApiStatus({
        connected: result.success,
        message: result.message
      });
      if (result.success) {
        toast({
          title: "API Connected",
          description: result.message,
        });
      } else {
        toast({
          title: "API Connection Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      setApiStatus({
        connected: false,
        message: `Connection error: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleSendEmail = async () => {
    if (!emailData.subject.trim()) {
      toast({
        title: "Subject Required",
        description: "Please enter a subject line.",
        variant: "destructive",
      });
      return;
    }

    if (!emailData.body.trim()) {
      toast({
        title: "Email Body Required",
        description: "Please enter the email content.",
        variant: "destructive",
      });
      return;
    }

    if (selectedContacts.length === 0) {
      toast({
        title: "No Recipients",
        description: "Please select at least one contact.",
        variant: "destructive",
      });
      return;
    }

    if (!emailData.senderEmail) {
      toast({
        title: "Sender Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    let successCount = 0;
    let failCount = 0;

    const selectedContactsData = contacts.filter(c => selectedContacts.includes(c.id));

    try {
      for (const contact of selectedContactsData) {
        try {
          const request: EmailSendRequest = {
            sender: emailData.senderEmail,
            to: contact.email,
            subject: emailData.subject,
            body: emailService.formatAsHtml(emailData.body)
          };

          await emailService.sendEmail(request);
          successCount++;
          
          toast({
            title: "Email Sent",
            description: `Successfully sent to ${contact.name} (${contact.email})`,
          });
        } catch (error) {
          failCount++;
          console.error(`Failed to send email to ${contact.email}:`, error);
          
          toast({
            title: "Email Failed",
            description: `Failed to send to ${contact.name}: ${error instanceof Error ? error.message : 'Unknown error'}`,
            variant: "destructive",
          });
        }
      }

      if (successCount > 0) {
        toast({
          title: "Emails Sent Successfully",
          description: `Successfully sent ${successCount} email${successCount !== 1 ? 's' : ''}`,
        });
        
        // Clear form after successful send
        setEmailData(prev => ({ ...prev, subject: '', body: '' }));
        onClearSelection();
      }

    } catch (error) {
      toast({
        title: "Error Sending Emails",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleSendFollowUp = async () => {
    if (!followUpData.body.trim()) {
      toast({
        title: "Follow-up Body Required",
        description: "Please enter the follow-up message.",
        variant: "destructive",
      });
      return;
    }

    if (!followUpData.recipientEmail.trim()) {
      toast({
        title: "Recipient Email Required",
        description: "Please enter the recipient's email address.",
        variant: "destructive",
      });
      return;
    }

    if (!emailData.senderEmail) {
      toast({
        title: "Sender Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      const request: FollowUpRequest = {
        sender: emailData.senderEmail,
        body: followUpData.body,
        to: followUpData.recipientEmail
      };

      const result = await emailService.sendFollowUp(request);
      
      toast({
        title: "Follow-up Sent",
        description: result.message,
      });

      setFollowUpData({ body: '', recipientEmail: '' });
    } catch (error) {
      toast({
        title: "Follow-up Failed",
        description: error instanceof Error ? error.message : "Failed to send follow-up",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleLoadConversation = async () => {
    if (!followUpData.recipientEmail.trim()) {
      toast({
        title: "Recipient Email Required",
        description: "Please enter the recipient's email address to load conversation.",
        variant: "destructive",
      });
      return;
    }

    setIsLoadingConversation(true);
    try {
      const conversation = await emailService.getEmailConversation({
        sender: emailData.senderEmail,
        to: followUpData.recipientEmail
      });

      setConversationData(conversation);
      
      toast({
        title: "Conversation Loaded",
        description: `Found ${conversation.length} message${conversation.length !== 1 ? 's' : ''}`,
      });
    } catch (error) {
      toast({
        title: "Failed to Load Conversation",
        description: error instanceof Error ? error.message : "Could not load conversation",
        variant: "destructive",
      });
    } finally {
      setIsLoadingConversation(false);
    }
  };

  const generateEmailContent = async () => {
    if (selectedContacts.length === 0) {
      toast({
        title: "No Contacts Selected",
        description: "Please select a contact to generate personalized content.",
        variant: "destructive",
      });
      return;
    }

    const contact = contacts.find(c => c.id === selectedContacts[0]);
    if (!contact) return;

    try {
      const content = await emailService.generateEmailContent(
        contact.company || 'your company',
        contact.name
      );

      setEmailData(prev => ({
        ...prev,
        subject: content.subject,
        body: content.body
      }));

      toast({
        title: "Content Generated",
        description: "Email content has been generated based on the selected contact.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Could not generate email content",
        variant: "destructive",
      });
    }
  };

  const selectedContactsData = contacts.filter(c => selectedContacts.includes(c.id));

  return (
    <div className="space-y-6">
      {/* API Status */}
      <Alert className={apiStatus?.connected ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {apiStatus?.connected ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription className={apiStatus?.connected ? "text-green-800" : "text-red-800"}>
              <strong>Email API Status:</strong> {apiStatus?.message || 'Checking connection...'}
            </AlertDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={testApiConnection}
            disabled={isTestingConnection}
          >
            {isTestingConnection ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
          </Button>
        </div>
      </Alert>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <Button
          variant={activeTab === 'compose' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('compose')}
          className="flex-1"
        >
          <Mail className="h-4 w-4 mr-2" />
          Compose
        </Button>
        <Button
          variant={activeTab === 'followup' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('followup')}
          className="flex-1"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Follow-up
        </Button>
        <Button
          variant={activeTab === 'conversation' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('conversation')}
          className="flex-1"
        >
          <User className="h-4 w-4 mr-2" />
          Conversation
        </Button>
      </div>

      {/* Sender Email Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Email Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="sender-email">Your Email Address</Label>
            <Input
              id="sender-email"
              type="email"
              placeholder="your-email@gmail.com"
              value={emailData.senderEmail}
              onChange={(e) => setEmailData(prev => ({ ...prev, senderEmail: e.target.value }))}
            />
            <p className="text-xs text-gray-500">
              This should be the Gmail account you've authenticated with the API
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Compose Tab */}
      {activeTab === 'compose' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Compose Email</span>
              </CardTitle>
              <CardDescription>
                Send emails using your AWS email automation API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject Line</Label>
                <Input
                  id="subject"
                  placeholder="Enter email subject..."
                  value={emailData.subject}
                  onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="body">Email Content</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateEmailContent}
                    disabled={selectedContacts.length === 0}
                  >
                    Generate Content
                  </Button>
                </div>
                <Textarea
                  id="body"
                  placeholder="Write your email content here..."
                  className="min-h-[300px]"
                  value={emailData.body}
                  onChange={(e) => setEmailData(prev => ({ ...prev, body: e.target.value }))}
                />
              </div>

              <Separator />

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Campaign Summary</h4>
                <div className="space-y-1 text-sm text-blue-800">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{selectedContacts.length} recipients selected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>Send immediately</span>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                onClick={handleSendEmail}
                disabled={isSending || selectedContacts.length === 0 || !apiStatus?.connected}
              >
                {isSending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                {isSending ? 'Sending...' : `Send to ${selectedContacts.length} Contact${selectedContacts.length !== 1 ? 's' : ''}`}
              </Button>
            </CardContent>
          </Card>

          {/* Contact Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Select Recipients</span>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={onSelectAll}>
                    Select All
                  </Button>
                  <Button variant="outline" size="sm" onClick={onClearSelection}>
                    Clear
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>
                Choose contacts to send emails to
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedContacts.includes(contact.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => onContactSelect(contact.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-gray-600">{contact.email}</p>
                        {contact.company && (
                          <p className="text-xs text-gray-500">{contact.company}</p>
                        )}
                      </div>
                      {selectedContacts.includes(contact.id) && (
                        <CheckCircle className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Follow-up Tab */}
      {activeTab === 'followup' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Send Follow-up</span>
            </CardTitle>
            <CardDescription>
              Send a follow-up email to a previous recipient
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="followup-recipient">Recipient Email</Label>
              <Input
                id="followup-recipient"
                type="email"
                placeholder="recipient@example.com"
                value={followUpData.recipientEmail}
                onChange={(e) => setFollowUpData(prev => ({ ...prev, recipientEmail: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="followup-body">Follow-up Message</Label>
              <Textarea
                id="followup-body"
                placeholder="Write your follow-up message here..."
                className="min-h-[200px]"
                value={followUpData.body}
                onChange={(e) => setFollowUpData(prev => ({ ...prev, body: e.target.value }))}
              />
            </div>

            <Button 
              className="w-full"
              onClick={handleSendFollowUp}
              disabled={isSending || !apiStatus?.connected}
            >
              {isSending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              {isSending ? 'Sending Follow-up...' : 'Send Follow-up'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Conversation Tab */}
      {activeTab === 'conversation' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Email Conversation</span>
            </CardTitle>
            <CardDescription>
              View email conversation history
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter recipient email to load conversation"
                value={followUpData.recipientEmail}
                onChange={(e) => setFollowUpData(prev => ({ ...prev, recipientEmail: e.target.value }))}
                className="flex-1"
              />
              <Button 
                onClick={handleLoadConversation}
                disabled={isLoadingConversation || !apiStatus?.connected}
              >
                {isLoadingConversation ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Load'
                )}
              </Button>
            </div>

            {conversationData.length > 0 && (
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {conversationData.map((message, index) => (
                  <div key={message.id || index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">{message.subject}</p>
                      <Badge variant="outline">{message.date}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">From: {message.from}</p>
                    <div className="text-sm bg-gray-50 p-3 rounded">
                      {message.body}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AWSEmailComposer; 