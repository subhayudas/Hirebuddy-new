import { supabase } from '@/lib/supabase';

export interface UserProfile {
  id?: string;
  user_id?: string;
  full_name?: string;
  title?: string;
  company?: string;
  location?: string;
  phone?: string;
  bio?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  skills?: string[];
  experience_years?: number;
  available_for_work?: boolean;
  profile_image_url?: string;
  resume_url?: string;
  resume_filename?: string;
  resume_uploaded_at?: string;
  created_at?: string;
  updated_at?: string;
}

export class ProfileService {
  // Get user profile
  static async getProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No profile found, return null
          return null;
        }
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  }

  // Create or update user profile
  static async upsertProfile(userId: string, profileData: Partial<UserProfile>): Promise<UserProfile> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: userId,
          ...profileData,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error upserting profile:', error);
      throw error;
    }
  }

  // Update specific profile fields
  static async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  // Helper method to extract file path from Supabase storage URL
  private static extractFilePathFromUrl(url: string, bucketName: string): string | null {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/');
      const bucketIndex = pathParts.findIndex(part => part === bucketName);
      
      if (bucketIndex !== -1 && bucketIndex < pathParts.length - 1) {
        return pathParts.slice(bucketIndex + 1).join('/');
      }
      
      // Fallback: try to extract from the end of the URL
      const fileName = pathParts[pathParts.length - 1];
      if (fileName) {
        // Determine the folder based on bucket name
        const folder = bucketName === 'profiles' ? 'profile-images' : 'resumes';
        return `${folder}/${fileName}`;
      }
      
      return null;
    } catch (error) {
      console.error('Error extracting file path from URL:', error);
      return null;
    }
  }

  // Upload profile image
  static async uploadProfileImage(userId: string, file: File): Promise<string> {
    try {
      // Get current profile to check for existing image
      const currentProfile = await this.getProfile(userId);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `profile-images/${fileName}`;

      // Upload new image to profiles bucket
      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath);

      // Delete previous image if it exists
      if (currentProfile?.profile_image_url) {
        try {
          const oldFilePath = this.extractFilePathFromUrl(currentProfile.profile_image_url, 'profiles');
          if (oldFilePath) {
            await supabase.storage
              .from('profiles')
              .remove([oldFilePath]);
          }
        } catch (deleteError) {
          console.warn('Failed to delete previous profile image:', deleteError);
          // Don't throw error, as the new upload was successful
        }
      }

      // Update profile with new image URL
      await this.updateProfile(userId, { profile_image_url: data.publicUrl });

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading profile image:', error);
      throw error;
    }
  }

  // Delete profile image
  static async deleteProfileImage(userId: string, imageUrl: string): Promise<void> {
    try {
      // Extract file path from URL
      const filePath = this.extractFilePathFromUrl(imageUrl, 'profiles');
      
      if (filePath) {
        const { error } = await supabase.storage
          .from('profiles')
          .remove([filePath]);

        if (error) throw error;
      }

      // Update profile to remove image URL
      await this.updateProfile(userId, { profile_image_url: null });
    } catch (error) {
      console.error('Error deleting profile image:', error);
      throw error;
    }
  }

  // Upload resume
  static async uploadResume(userId: string, file: File): Promise<{ url: string; filename: string }> {
    try {
      // Get current profile to check for existing resume
      const currentProfile = await this.getProfile(userId);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-resume-${Date.now()}.${fileExt}`;
      const filePath = `resumes/${fileName}`;

      // Upload new resume to resumes bucket
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('resumes')
        .getPublicUrl(filePath);

      // Delete previous resume if it exists
      if (currentProfile?.resume_url) {
        try {
          const oldFilePath = this.extractFilePathFromUrl(currentProfile.resume_url, 'resumes');
          if (oldFilePath) {
            await supabase.storage
              .from('resumes')
              .remove([oldFilePath]);
          }
        } catch (deleteError) {
          console.warn('Failed to delete previous resume:', deleteError);
          // Don't throw error, as the new upload was successful
        }
      }

      // Update profile with new resume URL and filename
      await this.updateProfile(userId, { 
        resume_url: data.publicUrl,
        resume_filename: file.name,
        resume_uploaded_at: new Date().toISOString()
      });

      return { url: data.publicUrl, filename: file.name };
    } catch (error) {
      console.error('Error uploading resume:', error);
      throw error;
    }
  }

  // Delete resume
  static async deleteResume(userId: string, resumeUrl: string): Promise<void> {
    try {
      // Extract file path from URL
      const filePath = this.extractFilePathFromUrl(resumeUrl, 'resumes');
      
      if (filePath) {
        const { error } = await supabase.storage
          .from('resumes')
          .remove([filePath]);

        if (error) throw error;
      }

      // Update profile to remove resume data
      await this.updateProfile(userId, { 
        resume_url: null,
        resume_filename: null,
        resume_uploaded_at: null
      });
    } catch (error) {
      console.error('Error deleting resume:', error);
      throw error;
    }
  }

  // Download resume
  static async downloadResume(resumeUrl: string, filename: string): Promise<void> {
    try {
      const response = await fetch(resumeUrl);
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading resume:', error);
      throw error;
    }
  }

  // Utility method to clean up orphaned files (optional, for maintenance)
  static async cleanupOrphanedFiles(userId: string): Promise<void> {
    try {
      const profile = await this.getProfile(userId);
      if (!profile) return;

      // List all files for this user in both buckets
      const [profileFiles, resumeFiles] = await Promise.all([
        supabase.storage.from('profiles').list(`profile-images`, {
          search: userId
        }),
        supabase.storage.from('resumes').list(`resumes`, {
          search: userId
        })
      ]);

      // Clean up profile images
      if (profileFiles.data) {
        const currentImageFile = profile.profile_image_url ? 
          this.extractFilePathFromUrl(profile.profile_image_url, 'profiles')?.split('/').pop() : null;
        
        const filesToDelete = profileFiles.data
          .filter(file => file.name.startsWith(userId) && file.name !== currentImageFile)
          .map(file => `profile-images/${file.name}`);

        if (filesToDelete.length > 0) {
          await supabase.storage.from('profiles').remove(filesToDelete);
        }
      }

      // Clean up resume files
      if (resumeFiles.data) {
        const currentResumeFile = profile.resume_url ? 
          this.extractFilePathFromUrl(profile.resume_url, 'resumes')?.split('/').pop() : null;
        
        const filesToDelete = resumeFiles.data
          .filter(file => file.name.startsWith(userId) && file.name !== currentResumeFile)
          .map(file => `resumes/${file.name}`);

        if (filesToDelete.length > 0) {
          await supabase.storage.from('resumes').remove(filesToDelete);
        }
      }
    } catch (error) {
      console.error('Error cleaning up orphaned files:', error);
      // Don't throw error as this is a maintenance operation
    }
  }
} 