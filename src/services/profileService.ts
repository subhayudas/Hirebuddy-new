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

  // Upload profile image
  static async uploadProfileImage(userId: string, file: File): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `profile-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath);

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
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const filePath = `profile-images/${fileName}`;

      const { error } = await supabase.storage
        .from('profiles')
        .remove([filePath]);

      if (error) throw error;

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
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-resume-${Date.now()}.${fileExt}`;
      const filePath = `resumes/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath);

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
      const urlParts = resumeUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const filePath = `resumes/${fileName}`;

      const { error } = await supabase.storage
        .from('profiles')
        .remove([filePath]);

      if (error) throw error;

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
} 