-- Simplified Storage Buckets Setup for Supabase
-- This script creates the buckets only. Policies should be created via the Supabase dashboard.

-- Create profiles bucket for profile images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'profiles',
  'profiles',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Create resumes bucket for resume files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'resumes',
  'resumes',
  true,
  10485760, -- 10MB limit
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
) ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Note: Storage policies must be created via the Supabase dashboard
-- Go to Storage > Policies in your Supabase dashboard and create the following policies:

/*
PROFILES BUCKET POLICIES:

1. Upload Policy:
   - Name: "Users can upload own profile images"
   - Operation: INSERT
   - Target roles: authenticated
   - Policy definition: auth.uid()::text = (storage.foldername(name))[1] AND (storage.foldername(name))[2] = 'profile-images'

2. View Policy:
   - Name: "Users can view own profile images"
   - Operation: SELECT
   - Target roles: authenticated
   - Policy definition: auth.uid()::text = (storage.foldername(name))[1] AND (storage.foldername(name))[2] = 'profile-images'

3. Update Policy:
   - Name: "Users can update own profile images"
   - Operation: UPDATE
   - Target roles: authenticated
   - Policy definition: auth.uid()::text = (storage.foldername(name))[1] AND (storage.foldername(name))[2] = 'profile-images'

4. Delete Policy:
   - Name: "Users can delete own profile images"
   - Operation: DELETE
   - Target roles: authenticated
   - Policy definition: auth.uid()::text = (storage.foldername(name))[1] AND (storage.foldername(name))[2] = 'profile-images'

RESUMES BUCKET POLICIES:

1. Upload Policy:
   - Name: "Users can upload own resumes"
   - Operation: INSERT
   - Target roles: authenticated
   - Policy definition: auth.uid()::text = (storage.foldername(name))[1] AND (storage.foldername(name))[2] = 'resumes'

2. View Policy:
   - Name: "Users can view own resumes"
   - Operation: SELECT
   - Target roles: authenticated
   - Policy definition: auth.uid()::text = (storage.foldername(name))[1] AND (storage.foldername(name))[2] = 'resumes'

3. Update Policy:
   - Name: "Users can update own resumes"
   - Operation: UPDATE
   - Target roles: authenticated
   - Policy definition: auth.uid()::text = (storage.foldername(name))[1] AND (storage.foldername(name))[2] = 'resumes'

4. Delete Policy:
   - Name: "Users can delete own resumes"
   - Operation: DELETE
   - Target roles: authenticated
   - Policy definition: auth.uid()::text = (storage.foldername(name))[1] AND (storage.foldername(name))[2] = 'resumes'
*/ 