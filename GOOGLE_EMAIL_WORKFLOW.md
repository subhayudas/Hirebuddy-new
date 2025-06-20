# Google Email Outreach Workflow

## Overview

The Email Outreach page has been completely redesigned to use Google OAuth authentication and Gmail API for sending emails. This provides a secure, direct integration with users' Gmail accounts.

## Workflow

### 1. Authentication Required
- Users first see an authentication screen
- Must grant permission to access Gmail and Google Contacts
- Uses secure OAuth 2.0 flow
- Tokens are stored securely in Supabase

### 2. Contact Loading
- After authentication, Google Contacts are automatically loaded
- Contacts are fetched from Google People API
- Includes name, email, phone, company, and title information
- Real-time contact count displayed

### 3. Contact Selection
- Users can browse and search through their contacts
- Filter by contacts with company info or email addresses
- Select individual contacts or use "Select All"
- Visual indicators show selected contacts

### 4. Email Composition
- Click "Send Email" to open the composer
- Simple interface with subject and message fields
- Support for both plain text and HTML emails
- Live preview of email content
- Shows all selected recipients

### 5. Email Sending
- Emails are sent directly through Gmail API
- Individual sending to each recipient
- Real-time progress feedback
- Success/failure notifications for each email

## Technical Implementation

### Components Created/Modified

1. **`googleAuthService.ts`** - Core service for Google OAuth and Gmail API
   - Handles OAuth flow
   - Manages access tokens and refresh tokens
   - Contacts fetching from Google People API
   - Email sending via Gmail API
   - Token storage in Supabase

2. **`GoogleCallback.tsx`** - OAuth callback handler
   - Processes authorization code from Google
   - Exchanges code for access tokens
   - Stores user data in Supabase
   - Redirects back to Email Outreach

3. **`ContactList.tsx`** - Contact display and selection
   - Search and filter functionality
   - Bulk selection capabilities
   - Contact cards with company info
   - Integration with email composer

4. **`SimpleEmailComposer.tsx`** - Email composition interface
   - Subject and body input
   - HTML/plain text toggle
   - Recipient preview
   - Send functionality

5. **`EmailOutreach.tsx`** - Main page (completely rewritten)
   - Authentication flow management
   - Contact loading and display
   - State management for the entire workflow

### Database Schema

Uses the existing `users` table in Supabase:

```sql
create table public.users (
  id serial not null,
  google_id character varying(255) not null,
  email character varying(255) not null,
  name character varying(255) not null,
  profile_picture text null,
  access_token text not null,
  refresh_token text null,
  provider character varying(50) null default 'google'::character varying,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint users_pkey primary key (id),
  constraint users_google_id_key unique (google_id)
);
```

### Environment Variables

Required environment variables in `.env.local`:

```env
# Google OAuth Configuration for Frontend
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GOOGLE_CLIENT_SECRET=your_google_client_secret

# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Security Features

1. **OAuth 2.0 Flow** - Secure authentication with Google
2. **Token Encryption** - Access tokens stored securely in Supabase
3. **Minimal Permissions** - Only requests necessary scopes:
   - `userinfo.email` - User's email address
   - `userinfo.profile` - User's basic profile info
   - `gmail.send` - Permission to send emails
   - `contacts.readonly` - Read-only access to contacts

4. **Token Refresh** - Automatic token refresh when needed
5. **Revocation** - Users can revoke access at any time

## Usage Instructions

### For Users

1. **Navigate to Email Outreach** - Go to `/email-outreach`
2. **Authenticate** - Click "Connect with Google" and grant permissions
3. **Select Contacts** - Browse, search, and select contacts to email
4. **Compose Email** - Write your subject and message
5. **Send** - Click send to deliver emails through your Gmail account

### For Developers

1. **Google Cloud Console Setup**:
   - Create a new project or use existing
   - Enable Gmail API and People API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs

2. **Environment Configuration**:
   - Update `.env.local` with Google OAuth credentials
   - Ensure Supabase connection is configured

3. **Database Setup**:
   - The `users` table should already exist
   - No additional migrations needed

## Features

- ✅ Secure Google OAuth authentication
- ✅ Real-time contact loading from Google
- ✅ Advanced contact search and filtering
- ✅ Bulk contact selection
- ✅ HTML and plain text email support
- ✅ Email preview before sending
- ✅ Individual email delivery
- ✅ Success/failure tracking
- ✅ Token refresh handling
- ✅ Access revocation
- ✅ Responsive design
- ✅ Loading states and error handling

## Future Enhancements

- Email templates
- Scheduled sending
- Email tracking and analytics
- Bulk upload of contacts
- Campaign management
- A/B testing capabilities
- Email deliverability monitoring 