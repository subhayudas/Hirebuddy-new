import React, { useState } from 'react';
import { GoogleContact } from '@/services/googleAuthService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Send, Mail, Users, X, Loader2 } from 'lucide-react';

interface SimpleEmailComposerProps {
  selectedContacts: GoogleContact[];
  onSendEmail: (subject: string, body: string, isHtml: boolean) => Promise<void>;
  onClose: () => void;
  isOpen: boolean;
  sending?: boolean;
}

const SimpleEmailComposer: React.FC<SimpleEmailComposerProps> = ({
  selectedContacts,
  onSendEmail,
  onClose,
  isOpen,
  sending = false
}) => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isHtml, setIsHtml] = useState(false);

  const handleSend = async () => {
    if (!subject.trim() || !body.trim()) {
      alert('Please fill in both subject and message');
      return;
    }

    await onSendEmail(subject, body, isHtml);
  };

  const getContactInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleClose = () => {
    if (!sending) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-[#d35c65]" />
            Compose Email
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Recipients */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-4 w-4" />
                Recipients ({selectedContacts.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {selectedContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center gap-2 bg-[#d35c65]/10 border border-[#d35c65]/20 rounded-lg px-3 py-2"
                  >
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="bg-[#d35c65]/20 text-[#d35c65] text-xs font-semibold">
                        {getContactInitials(contact.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {contact.name}
                      </span>
                      <span className="text-xs text-gray-600 truncate">
                        {contact.email}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Email Form */}
          <div className="space-y-4">
            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-medium">
                Subject *
              </Label>
              <Input
                id="subject"
                placeholder="Enter email subject..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={sending}
              />
            </div>

            {/* HTML Toggle */}
            <div className="flex items-center space-x-2">
              <Switch
                id="html-mode"
                checked={isHtml}
                onCheckedChange={setIsHtml}
                disabled={sending}
              />
              <Label htmlFor="html-mode" className="text-sm">
                HTML Format
              </Label>
            </div>

            {/* Message Body */}
            <div className="space-y-2">
              <Label htmlFor="body" className="text-sm font-medium">
                Message *
              </Label>
              <Textarea
                id="body"
                placeholder={
                  isHtml 
                    ? "Enter your HTML email content..."
                    : "Enter your email message..."
                }
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={12}
                disabled={sending}
                className="min-h-[200px]"
              />
              {isHtml && (
                <p className="text-xs text-gray-500">
                  You can use HTML tags like &lt;b&gt;, &lt;i&gt;, &lt;a&gt;, &lt;br&gt;, etc.
                </p>
              )}
            </div>

            {/* Email Preview */}
            {body && (
              <Card className="bg-gray-50">
                <CardHeader>
                  <CardTitle className="text-sm">Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Subject:</strong> {subject || '(No subject)'}
                    </div>
                    <div>
                      <strong>Message:</strong>
                      <div className="mt-2 p-3 bg-white border rounded-md">
                        {isHtml ? (
                          <div dangerouslySetInnerHTML={{ __html: body }} />
                        ) : (
                          <div className="whitespace-pre-wrap">{body}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-gray-600">
              Ready to send to {selectedContacts.length} contact{selectedContacts.length !== 1 ? 's' : ''}
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleClose}
                disabled={sending}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSend}
                disabled={!subject.trim() || !body.trim() || sending}
                className="bg-[#d35c65] hover:bg-[#b24e55] text-white"
              >
                {sending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Email
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SimpleEmailComposer; 