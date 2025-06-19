-- Applications Schema Migration
-- This migration creates tables for tracking job applications

-- Create enum types for application status
CREATE TYPE public.application_status AS ENUM (
  'applied', 
  'screening', 
  'interview_scheduled', 
  'interviewed', 
  'technical_assessment', 
  'final_round', 
  'offer_received', 
  'accepted', 
  'rejected', 
  'withdrawn'
);

-- Create applications table
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  job_id UUID REFERENCES public.hirebuddy_job_board(job_id) ON DELETE SET NULL,
  company_name TEXT NOT NULL,
  job_title TEXT NOT NULL,
  job_location TEXT,
  salary_range TEXT,
  application_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status application_status DEFAULT 'applied',
  notes TEXT,
  application_url TEXT,
  contact_person TEXT,
  contact_email TEXT,
  follow_up_date DATE,
  interview_date TIMESTAMP WITH TIME ZONE,
  offer_amount DECIMAL(12,2),
  offer_deadline DATE,
  rejection_reason TEXT,
  source TEXT, -- where they found the job (LinkedIn, Indeed, etc.)
  priority INTEGER DEFAULT 3 CHECK (priority >= 1 AND priority <= 5), -- 1 = highest, 5 = lowest
  is_remote BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create application_activities table for tracking interactions
CREATE TABLE IF NOT EXISTS public.application_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL CHECK (activity_type IN (
    'applied', 'email_sent', 'email_received', 'call_made', 'call_received',
    'interview_scheduled', 'interview_completed', 'follow_up_sent',
    'status_updated', 'note_added', 'offer_received', 'offer_accepted',
    'offer_declined', 'application_withdrawn', 'rejection_received'
  )),
  title TEXT NOT NULL,
  description TEXT,
  contact_person TEXT,
  scheduled_date TIMESTAMP WITH TIME ZONE,
  completed_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create application_documents table for storing related documents
CREATE TABLE IF NOT EXISTS public.application_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL CHECK (document_type IN (
    'resume', 'cover_letter', 'portfolio', 'references', 'transcript',
    'certificate', 'offer_letter', 'contract', 'other'
  )),
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_documents ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for applications
CREATE POLICY "Users can view their own applications" ON public.applications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own applications" ON public.applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own applications" ON public.applications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own applications" ON public.applications
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for application_activities
CREATE POLICY "Users can view their own application activities" ON public.application_activities
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own application activities" ON public.application_activities
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own application activities" ON public.application_activities
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own application activities" ON public.application_activities
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for application_documents
CREATE POLICY "Users can view their own application documents" ON public.application_documents
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own application documents" ON public.application_documents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own application documents" ON public.application_documents
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own application documents" ON public.application_documents
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON public.applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_date ON public.applications(application_date);
CREATE INDEX IF NOT EXISTS idx_applications_company ON public.applications(company_name);
CREATE INDEX IF NOT EXISTS idx_applications_priority ON public.applications(priority);

CREATE INDEX IF NOT EXISTS idx_application_activities_application_id ON public.application_activities(application_id);
CREATE INDEX IF NOT EXISTS idx_application_activities_user_id ON public.application_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_application_activities_type ON public.application_activities(activity_type);
CREATE INDEX IF NOT EXISTS idx_application_activities_date ON public.application_activities(created_at);

CREATE INDEX IF NOT EXISTS idx_application_documents_application_id ON public.application_documents(application_id);
CREATE INDEX IF NOT EXISTS idx_application_documents_user_id ON public.application_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_application_documents_type ON public.application_documents(document_type);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_applications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_applications_updated_at ON public.applications;
CREATE TRIGGER update_applications_updated_at
    BEFORE UPDATE ON public.applications
    FOR EACH ROW
    EXECUTE FUNCTION update_applications_updated_at();

-- Create function to automatically create activity when application status changes
CREATE OR REPLACE FUNCTION create_status_change_activity()
RETURNS TRIGGER AS $$
BEGIN
    -- Only create activity if status actually changed
    IF OLD.status IS DISTINCT FROM NEW.status THEN
        INSERT INTO public.application_activities (
            application_id,
            user_id,
            activity_type,
            title,
            description,
            completed_date
        ) VALUES (
            NEW.id,
            NEW.user_id,
            'status_updated',
            'Status changed to ' || NEW.status,
            'Application status changed from ' || COALESCE(OLD.status::text, 'none') || ' to ' || NEW.status::text,
            NOW()
        );
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for status change activities
DROP TRIGGER IF EXISTS create_status_change_activity ON public.applications;
CREATE TRIGGER create_status_change_activity
    AFTER UPDATE ON public.applications
    FOR EACH ROW
    EXECUTE FUNCTION create_status_change_activity();

-- Success message
SELECT 'Applications schema created successfully!' as message; 