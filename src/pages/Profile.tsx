import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { 
  Edit, Save, User, Briefcase, MapPin, Mail, Phone, Globe, 
  Upload, Plus, X, Loader2, AlertCircle, CheckCircle2,
  FileText, Download, Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ProfileService, UserProfile } from "@/services/profileService";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [newSkill, setNewSkill] = useState("");

  // Load profile data on component mount
  useEffect(() => {
    if (user?.id) {
      loadProfile();
    } else {
      // If no user, create a mock profile for demo purposes
      setProfile({
        full_name: "Demo User",
        title: "Software Developer",
        company: "Tech Company",
        location: "San Francisco, CA",
        phone: "+1 (555) 123-4567",
        bio: "Passionate software developer with experience in modern web technologies.",
        website: "https://example.com",
        github: "github.com/demouser",
        linkedin: "linkedin.com/in/demouser",
        skills: ["React", "TypeScript", "Node.js", "Python"],
        experience_years: 5,
        available_for_work: true,
        profile_image_url: null,
        resume_url: null,
        resume_filename: null,
        resume_uploaded_at: null
      });
      setIsLoading(false);
    }
  }, [user?.id]);

  const loadProfile = async () => {
    if (!user?.id) return;
    
    try {
      setIsLoading(true);
      
      // Try to load from database, but fallback to mock data if it fails
      try {
        const profileData = await ProfileService.getProfile(user.id);
        
        if (profileData) {
          setProfile(profileData);
        } else {
          // Create initial profile if none exists
          const initialProfile = {
            full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || "User",
            skills: []
          };
          const newProfile = await ProfileService.upsertProfile(user.id, initialProfile);
          setProfile(newProfile);
        }
      } catch (dbError) {
        console.warn('Database not connected, using mock data:', dbError);
        // Fallback to mock data when database is not available
        setProfile({
          full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || "User",
          title: "Software Developer",
          company: "",
          location: "",
          phone: "",
          bio: "",
          website: "",
          github: "",
          linkedin: "",
          skills: ["JavaScript", "React"],
          experience_years: 0,
          available_for_work: false,
          profile_image_url: null,
          resume_url: null,
          resume_filename: null,
          resume_uploaded_at: null
        });
        
        toast({
          title: "Demo Mode",
          description: "Database not connected. Using demo data. Changes won't be saved.",
          variant: "default"
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
  };

  const handleSave = async () => {
    if (!profile) return;

    try {
      setIsSaving(true);
      
      if (user?.id) {
        // Try to save to database
        try {
          const updatedProfile = await ProfileService.updateProfile(user.id, profile);
          setProfile(updatedProfile);
          setIsEditing(false);
          toast({
            title: "Success",
            description: "Profile updated successfully",
          });
        } catch (dbError) {
          console.warn('Database not connected, saving locally only:', dbError);
          // Just update local state if database is not available
          setIsEditing(false);
          toast({
            title: "Demo Mode",
            description: "Changes saved locally only. Database not connected.",
            variant: "default"
          });
        }
      } else {
        // No user logged in, just update local state
        setIsEditing(false);
        toast({
          title: "Demo Mode",
          description: "Changes saved locally only. Please log in to save permanently.",
          variant: "default"
        });
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error",
        description: "Failed to save profile",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddSkill = () => {
    if (!newSkill.trim() || !profile) return;
    
    const currentSkills = profile.skills || [];
    if (!currentSkills.includes(newSkill.trim())) {
      handleInputChange('skills', [...currentSkills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    if (!profile) return;
    const currentSkills = profile.skills || [];
    handleInputChange('skills', currentSkills.filter(skill => skill !== skillToRemove));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'profile_picture' | 'resume') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (fileType === 'profile_picture') {
      handleImageUpload(file);
    } else {
      handleResumeUpload(file);
    }
  };

  const handleImageUpload = async (file: File) => {
    // Validate file type
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedImageTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a JPEG, PNG, WebP, or GIF image.",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (5MB limit for images)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please upload an image smaller than 5MB.",
        variant: "destructive"
      });
      return;
    }

    try {
      setUploading(true);
      
      if (user?.id) {
        // Try to upload to database storage
        try {
          const imageUrl = await ProfileService.uploadProfileImage(user.id, file);
          setProfile(prev => prev ? { ...prev, profile_image_url: imageUrl } : null);
          toast({
            title: "Success",
            description: "Profile image updated successfully",
          });
        } catch (dbError) {
          console.warn('Database not connected, using local preview:', dbError);
          // Create a local preview URL for demo purposes
          const localImageUrl = URL.createObjectURL(file);
          setProfile(prev => prev ? { ...prev, profile_image_url: localImageUrl } : null);
          toast({
            title: "Demo Mode",
            description: "Image preview only. Database not connected.",
            variant: "default"
          });
        }
      } else {
        // No user logged in, just show local preview
        const localImageUrl = URL.createObjectURL(file);
        setProfile(prev => prev ? { ...prev, profile_image_url: localImageUrl } : null);
        toast({
          title: "Demo Mode",
          description: "Image preview only. Please log in to save permanently.",
          variant: "default"
        });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleResumeUpload = async (file: File) => {
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF or Word document.",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (10MB limit for resumes)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive"
      });
      return;
    }

    try {
      setUploading(true);
      
      if (user?.id) {
        // Try to upload to database storage
        try {
          const { url, filename } = await ProfileService.uploadResume(user.id, file);
          setProfile(prev => prev ? { 
            ...prev, 
            resume_url: url,
            resume_filename: filename,
            resume_uploaded_at: new Date().toISOString()
          } : null);
          toast({
            title: "Success",
            description: "Resume uploaded successfully",
          });
        } catch (dbError) {
          console.warn('Database not connected, using local preview:', dbError);
          // Create a local preview for demo purposes
          const localResumeUrl = URL.createObjectURL(file);
          setProfile(prev => prev ? { 
            ...prev, 
            resume_url: localResumeUrl,
            resume_filename: file.name,
            resume_uploaded_at: new Date().toISOString()
          } : null);
          toast({
            title: "Demo Mode",
            description: "Resume preview only. Database not connected.",
            variant: "default"
          });
        }
      } else {
        // No user logged in, just show local preview
        const localResumeUrl = URL.createObjectURL(file);
        setProfile(prev => prev ? { 
          ...prev, 
          resume_url: localResumeUrl,
          resume_filename: file.name,
          resume_uploaded_at: new Date().toISOString()
        } : null);
        toast({
          title: "Demo Mode",
          description: "Resume preview only. Please log in to save permanently.",
          variant: "default"
        });
      }
    } catch (error) {
      console.error('Error uploading resume:', error);
      toast({
        title: "Error",
        description: "Failed to upload resume",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleResumeDownload = async () => {
    if (!profile?.resume_url || !profile?.resume_filename) return;

    try {
      if (user?.id && !profile.resume_url.startsWith('blob:')) {
        // Download from database storage
        await ProfileService.downloadResume(profile.resume_url, profile.resume_filename);
      } else {
        // For demo mode or blob URLs, just open in new tab
        window.open(profile.resume_url, '_blank');
      }
    } catch (error) {
      console.error('Error downloading resume:', error);
      toast({
        title: "Error",
        description: "Failed to download resume",
        variant: "destructive"
      });
    }
  };

  const handleResumeDelete = async () => {
    if (!profile?.resume_url || !user?.id) return;

    try {
      setUploading(true);
      
      if (!profile.resume_url.startsWith('blob:')) {
        // Delete from database storage
        await ProfileService.deleteResume(user.id, profile.resume_url);
      }
      
      // Update local state
      setProfile(prev => prev ? { 
        ...prev, 
        resume_url: null,
        resume_filename: null,
        resume_uploaded_at: null
      } : null);
      
      toast({
        title: "Success",
        description: "Resume deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast({
        title: "Error",
        description: "Failed to delete resume",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      // Add sign out logic here if needed
      toast({
        title: "Signed Out",
        description: "You have been signed out successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Profile Not Found</h2>
          <p className="text-gray-600">Unable to load your profile data.</p>
          <Button onClick={loadProfile} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </div>

        {/* Profile Picture Card */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Upload and manage your profile picture</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={profile?.profile_image_url || undefined} />
                <AvatarFallback>
                  {user?.email?.charAt(0).toUpperCase() || profile?.full_name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Label htmlFor="profile-picture" className="cursor-pointer">
                  <div className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    <Upload size={16} />
                    <span>Upload Picture</span>
                  </div>
                </Label>
                <Input
                  id="profile-picture"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'profile_picture')}
                  className="hidden"
                  disabled={uploading}
                />
                <p className="text-sm text-gray-500">JPG, PNG up to 5MB</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resume Card */}
        <Card>
          <CardHeader>
            <CardTitle>Resume</CardTitle>
            <CardDescription>Upload and manage your resume</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              {profile?.resume_url && (
                <div className="flex items-center space-x-2 p-3 bg-gray-100 rounded-md">
                  <div className="flex-1">
                    <p className="text-sm font-medium">Current Resume</p>
                    <p className="text-xs text-gray-500">
                      {profile.resume_uploaded_at && `Uploaded on ${new Date(profile.resume_uploaded_at).toLocaleDateString()}`}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResumeDownload}
                  >
                    <Download size={16} className="mr-1" />
                    View
                  </Button>
                </div>
              )}
              
              <div>
                <Label htmlFor="resume" className="cursor-pointer">
                  <div className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                    <Upload size={16} />
                    <span>{profile?.resume_url ? 'Replace Resume' : 'Upload Resume'}</span>
                  </div>
                </Label>
                <Input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileUpload(e, 'resume')}
                  className="hidden"
                  disabled={uploading}
                />
                <p className="text-sm text-gray-500 mt-2">PDF, DOC, DOCX up to 10MB</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Profile Information Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Profile Information</CardTitle>
              <Button 
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                disabled={isSaving}
                className="min-w-[100px]"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : isEditing ? (
                  <Save className="h-4 w-4 mr-2" />
                ) : (
                  <Edit className="h-4 w-4 mr-2" />
                )}
                {isSaving ? "Saving..." : isEditing ? "Save" : "Edit"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="full_name">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="full_name"
                    value={profile.full_name || ""}
                    onChange={(e) => handleInputChange('full_name', e.target.value)}
                    placeholder="Enter your full name"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">
                    {profile.full_name || "Not set"}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="title">Job Title</Label>
                {isEditing ? (
                  <Input
                    id="title"
                    value={profile.title || ""}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g. Software Developer"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">
                    {profile.title || "Not set"}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                {isEditing ? (
                  <Input
                    id="location"
                    value={profile.location || ""}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="e.g. San Francisco, CA"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">
                    {profile.location || "Not set"}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={profile.phone || ""}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                    type="tel"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">
                    {profile.phone || "Not set"}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              {isEditing ? (
                <Textarea
                  id="bio"
                  value={profile.bio || ""}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows={3}
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900">
                  {profile.bio || "Not set"}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Account Information Card */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <Label className="text-sm font-medium text-gray-500">Email</Label>
                <p className="text-sm">{user?.email || "Not available"}</p>
              </div>
              {user?.created_at && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Member Since</Label>
                  <p className="text-sm">{new Date(user.created_at).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Loading Overlay */}
        {uploading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="p-6">
              <div className="text-center space-y-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p>Uploading file...</p>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 