-- Email Outreach Schema Migration
-- This migration creates all necessary tables for the email outreach functionality

-- Create enum types for better data integrity
CREATE TYPE public.contact_status AS ENUM ('active', 'inactive', 'bounced', 'unsubscribed');
CREATE TYPE public.campaign_status AS ENUM ('draft', 'scheduled', 'active', 'paused', 'completed');
CREATE TYPE public.email_status AS ENUM ('pending', 'sent', 'delivered', 'opened', 'clicked', 'replied', 'bounced', 'failed');

-- Create contacts table to store all email recipients
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  position TEXT,
  phone TEXT,
  website TEXT,
  linkedin_url TEXT,
  notes TEXT,
  status contact_status DEFAULT 'active',
  tags TEXT[], -- Array of tags for categorization
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, email)
);

-- Create campaigns table
CREATE TABLE public.campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  status campaign_status DEFAULT 'draft',
  send_rate_limit INTEGER DEFAULT 100, -- emails per hour
  scheduled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create campaign_contacts junction table to link campaigns with selected contacts
CREATE TABLE public.campaign_contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users,
  status TEXT DEFAULT 'pending',
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(campaign_id, contact_id)
);

-- Create email_events table for detailed tracking
CREATE TABLE public.email_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_contact_id UUID REFERENCES public.campaign_contacts(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN ('sent', 'delivered', 'opened', 'clicked', 'bounced', 'unsubscribed', 'replied', 'converted')),
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_agent TEXT,
  ip_address INET,
  link_url TEXT,
  bounce_reason TEXT,
  conversion_value DECIMAL(10,2),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create email templates table
CREATE TABLE public.email_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create compliance_settings table
CREATE TABLE public.compliance_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  gdpr_enabled BOOLEAN NOT NULL DEFAULT false,
  can_spam_enabled BOOLEAN NOT NULL DEFAULT false,
  auto_unsubscribe_enabled BOOLEAN NOT NULL DEFAULT false,
  bounce_management_enabled BOOLEAN NOT NULL DEFAULT false,
  domain_authentication JSONB NOT NULL DEFAULT '{"spf_record": "", "dkim_record": "", "dmarc_record": "", "verified": false}',
  reputation_monitoring BOOLEAN NOT NULL DEFAULT false,
  spam_testing BOOLEAN NOT NULL DEFAULT false,
  unsubscribe_link_template TEXT NOT NULL DEFAULT 'To unsubscribe, click here: {{unsubscribe_url}}',
  privacy_policy_url TEXT,
  company_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create spam_test_results table
CREATE TABLE public.spam_test_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  score NUMERIC(3,1) NOT NULL CHECK (score >= 0 AND score <= 10),
  issues JSONB NOT NULL DEFAULT '[]',
  tested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create campaign_analytics table for daily aggregates
CREATE TABLE public.campaign_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  emails_sent INTEGER NOT NULL DEFAULT 0,
  emails_opened INTEGER NOT NULL DEFAULT 0,
  emails_clicked INTEGER NOT NULL DEFAULT 0,
  emails_replied INTEGER NOT NULL DEFAULT 0,
  emails_bounced INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(campaign_id, date)
);

-- Enable Row Level Security
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spam_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_analytics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for contacts
CREATE POLICY "Users can view their own contacts" ON public.contacts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own contacts" ON public.contacts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own contacts" ON public.contacts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own contacts" ON public.contacts
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for campaigns
CREATE POLICY "Users can view their own campaigns" ON public.campaigns
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own campaigns" ON public.campaigns
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own campaigns" ON public.campaigns
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own campaigns" ON public.campaigns
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for campaign_contacts
CREATE POLICY "Users can view their campaign contacts" ON public.campaign_contacts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their campaign contacts" ON public.campaign_contacts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their campaign contacts" ON public.campaign_contacts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their campaign contacts" ON public.campaign_contacts
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for email_events
CREATE POLICY "Users can view email events for their campaigns" ON public.email_events
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM public.campaign_contacts cc
    JOIN public.campaigns c ON c.id = cc.campaign_id
    WHERE cc.id = email_events.campaign_contact_id 
    AND c.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert email events for their campaigns" ON public.email_events
  FOR INSERT WITH CHECK (EXISTS (
    SELECT 1 FROM public.campaign_contacts cc
    JOIN public.campaigns c ON c.id = cc.campaign_id
    WHERE cc.id = email_events.campaign_contact_id 
    AND c.user_id = auth.uid()
  ));

-- Create RLS policies for email_templates
CREATE POLICY "Users can view their own templates" ON public.email_templates
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own templates" ON public.email_templates
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own templates" ON public.email_templates
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own templates" ON public.email_templates
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for compliance_settings
CREATE POLICY "Users can view their own compliance settings" ON public.compliance_settings
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create their own compliance settings" ON public.compliance_settings
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own compliance settings" ON public.compliance_settings
  FOR UPDATE USING (user_id = auth.uid());

-- Create RLS policies for spam_test_results
CREATE POLICY "Users can view spam test results for their campaigns" ON public.spam_test_results
  FOR SELECT USING (campaign_id IN (SELECT id FROM campaigns WHERE user_id = auth.uid()));

CREATE POLICY "Users can create spam test results for their campaigns" ON public.spam_test_results
  FOR INSERT WITH CHECK (campaign_id IN (SELECT id FROM campaigns WHERE user_id = auth.uid()));

-- Create RLS policies for campaign_analytics
CREATE POLICY "Users can view analytics for their campaigns" ON public.campaign_analytics
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM public.campaigns 
    WHERE campaigns.id = campaign_analytics.campaign_id 
    AND campaigns.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert analytics for their campaigns" ON public.campaign_analytics
  FOR INSERT WITH CHECK (EXISTS (
    SELECT 1 FROM public.campaigns 
    WHERE campaigns.id = campaign_analytics.campaign_id 
    AND campaigns.user_id = auth.uid()
  ));

CREATE POLICY "Users can update analytics for their campaigns" ON public.campaign_analytics
  FOR UPDATE USING (EXISTS (
    SELECT 1 FROM public.campaigns 
    WHERE campaigns.id = campaign_analytics.campaign_id 
    AND campaigns.user_id = auth.uid()
  ));

-- Create indexes for better performance
CREATE INDEX idx_contacts_user_id ON public.contacts(user_id);
CREATE INDEX idx_contacts_email ON public.contacts(email);
CREATE INDEX idx_contacts_status ON public.contacts(status);
CREATE INDEX idx_campaigns_user_id ON public.campaigns(user_id);
CREATE INDEX idx_campaigns_status ON public.campaigns(status);
CREATE INDEX idx_campaign_contacts_campaign_id ON public.campaign_contacts(campaign_id);
CREATE INDEX idx_campaign_contacts_contact_id ON public.campaign_contacts(contact_id);
CREATE INDEX idx_campaign_contacts_user_id ON public.campaign_contacts(user_id);
CREATE INDEX idx_email_events_campaign_contact_id ON public.email_events(campaign_contact_id);
CREATE INDEX idx_email_events_event_type ON public.email_events(event_type);
CREATE INDEX idx_email_templates_user_id ON public.email_templates(user_id);
CREATE INDEX idx_compliance_settings_user_id ON public.compliance_settings(user_id);
CREATE INDEX idx_spam_test_results_campaign_id ON public.spam_test_results(campaign_id);
CREATE INDEX idx_campaign_analytics_campaign_id ON public.campaign_analytics(campaign_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_contacts_updated_at 
  BEFORE UPDATE ON public.contacts 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at 
  BEFORE UPDATE ON public.campaigns 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_email_templates_updated_at 
  BEFORE UPDATE ON public.email_templates 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_compliance_settings_updated_at
  BEFORE UPDATE ON public.compliance_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_campaign_analytics_updated_at
  BEFORE UPDATE ON public.campaign_analytics
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column(); 