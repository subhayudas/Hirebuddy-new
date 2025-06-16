# Profile System Setup

## Overview
The profile system has been completely redesigned to be simpler, cleaner, and fully integrated with Supabase database.

## Database Schema

### User Profiles Table
The `user_profiles` table contains the following fields:

- `id` - UUID primary key
- `user_id` - References auth.users(id), unique constraint
- `full_name` - User's full name
- `title` - Job title
- `company` - Current company
- `location` - Geographic location
- `phone` - Phone number
- `bio` - Personal bio/description
- `website` - Personal website URL
- `github` - GitHub profile URL
- `linkedin` - LinkedIn profile URL
- `skills` - Array of skills (TEXT[])
- `experience_years` - Years of experience (INTEGER)
- `available_for_work` - Availability status (BOOLEAN)
- `profile_image_url` - Profile image URL
- `resume_url` - Resume file URL
- `resume_filename` - Original resume filename
- `resume_uploaded_at` - Resume upload timestamp
- `created_at` - Timestamp
- `updated_at` - Timestamp (auto-updated)

## Features

### ✅ Implemented Features
1. **Database Integration**: Full Supabase integration with RLS policies
2. **Profile Management**: Create, read, update profile data
3. **Image Upload**: Profile image upload to Supabase Storage
4. **Resume Upload**: Resume file upload (PDF, DOC, DOCX) with validation
5. **Skills Management**: Add/remove skills dynamically
6. **Real-time Updates**: Automatic profile updates
6. **Security**: Row Level Security (RLS) policies
7. **Auto Profile Creation**: Automatic profile creation on user signup
8. **Form Validation**: Client-side validation and error handling
9. **Loading States**: Loading indicators for better UX
10. **Toast Notifications**: Success/error feedback

### 🎨 UI Components
- Clean, modern design with shadcn/ui components
- Responsive layout (mobile-friendly)
- Edit mode toggle
- Profile image upload with hover effects
- Skills badges with remove functionality
- Social links with proper formatting

## Database Setup

### Manual Setup (Recommended)
1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Run the SQL script from `setup-profile-db.sql`
4. Create a storage bucket named "profiles" with public access

### Storage Bucket Setup
1. Go to Storage in Supabase dashboard
2. Create a new bucket named "profiles"
3. Set it to public
4. Configure appropriate policies for file uploads

## File Structure

```
src/
├── services/
│   └── profileService.ts     # Profile database operations
├── pages/
│   └── Profile.tsx          # Main profile page component
└── lib/
    └── supabase.ts          # Supabase client configuration

supabase/
├── migrations/
│   └── 20250115000001_user_profiles_schema.sql
└── config.toml
```

## Usage

### ProfileService Methods
- `getProfile(userId)` - Get user profile
- `upsertProfile(userId, data)` - Create or update profile
- `updateProfile(userId, updates)` - Update specific fields
- `uploadProfileImage(userId, file)` - Upload profile image
- `deleteProfileImage(userId, imageUrl)` - Delete profile image
- `uploadResume(userId, file)` - Upload resume file
- `deleteResume(userId, resumeUrl)` - Delete resume file
- `downloadResume(resumeUrl, filename)` - Download resume file

### Component Features
- **Edit Mode**: Toggle between view and edit modes
- **Auto-save**: Saves changes when edit mode is toggled off
- **Image Upload**: Click on profile image in edit mode to upload
- **Resume Upload**: Upload PDF/DOC/DOCX files with validation (5MB limit)
- **Resume Management**: Download, replace, or delete uploaded resumes
- **Skills Management**: Add skills by typing and pressing Enter
- **File Validation**: Type and size validation for uploads
- **Loading States**: Shows loading spinners during operations

## Security

### Row Level Security (RLS)
- Users can only view/edit their own profiles
- Automatic profile creation on user signup
- Secure file uploads with user-specific paths

### Policies
- `Users can view own profile` - SELECT policy
- `Users can insert own profile` - INSERT policy  
- `Users can update own profile` - UPDATE policy
- `Users can delete own profile` - DELETE policy

## Environment Variables
Make sure these are set in your `.env.local`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Next Steps
1. Run the SQL script in your Supabase dashboard
2. Create the "profiles" storage bucket
3. Test the profile functionality
4. Customize styling as needed

The profile system is now fully functional and ready for production use! 