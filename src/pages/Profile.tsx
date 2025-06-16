import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Camera, Plus, X, Loader2, AlertCircle, CheckCircle2,
  FileText, Download, Upload, Trash2
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

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsSaving(true);
      
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
      setIsSaving(false);
    }
  };

  const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

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

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please upload a file smaller than 5MB.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSaving(true);
      
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
      setIsSaving(false);
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
      setIsSaving(true);
      
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
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <SidebarInset>
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    );
  }

  if (!profile) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <SidebarInset>
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Profile Not Found</h2>
                <p className="text-gray-600">Unable to load your profile data.</p>
                <Button onClick={loadProfile} className="mt-4">
                  Try Again
                </Button>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-white dark:bg-gray-800 border-b">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-medium">Profile</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          
          <div className="flex flex-1 flex-col gap-6 p-6">
            <div className="max-w-4xl mx-auto w-full space-y-6">
              {/* Profile Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Profile Information
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      {profile.available_for_work && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Available for Work
                        </Badge>
                      )}
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
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Image */}
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative group">
                        <Avatar className="h-32 w-32 border-4 border-gray-200 dark:border-gray-700">
                          <AvatarImage src={profile.profile_image_url || undefined} />
                          <AvatarFallback className="text-2xl font-bold">
                            {profile.full_name?.substring(0, 2)?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        {isEditing && (
                          <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <Camera className="h-6 w-6 text-white" />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                      <div className="text-center">
                        <h2 className="text-xl font-bold">{profile.full_name || "User"}</h2>
                        <p className="text-gray-600 dark:text-gray-400">{profile.title || "No title set"}</p>
                      </div>
                    </div>

                    {/* Basic Information */}
                    <div className="lg:col-span-2 space-y-4">
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
                            <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
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
                            <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                              {profile.title || "Not set"}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="company">Company</Label>
                          {isEditing ? (
                            <Input
                              id="company"
                              value={profile.company || ""}
                              onChange={(e) => handleInputChange('company', e.target.value)}
                              placeholder="Enter your company"
                            />
                          ) : (
                            <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                              {profile.company || "Not set"}
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
                            <p className="mt-1 text-sm text-gray-900 dark:text-gray-100 flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
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
                            <p className="mt-1 text-sm text-gray-900 dark:text-gray-100 flex items-center gap-1">
                              <Phone className="h-4 w-4" />
                              {profile.phone || "Not set"}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="experience_years">Years of Experience</Label>
                          {isEditing ? (
                            <Input
                              id="experience_years"
                              type="number"
                              min="0"
                              value={profile.experience_years || 0}
                              onChange={(e) => handleInputChange('experience_years', parseInt(e.target.value) || 0)}
                            />
                          ) : (
                            <p className="mt-1 text-sm text-gray-900 dark:text-gray-100 flex items-center gap-1">
                              <Briefcase className="h-4 w-4" />
                              {profile.experience_years || 0} years
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
                            className="min-h-[100px] resize-none"
                          />
                        ) : (
                          <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                            {profile.bio || "No bio added yet"}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="available_for_work"
                          checked={profile.available_for_work || false}
                          onCheckedChange={(checked) => handleInputChange('available_for_work', checked)}
                          disabled={!isEditing}
                        />
                        <Label htmlFor="available_for_work">Available for work opportunities</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact & Social Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact & Social Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="website">Website</Label>
                      {isEditing ? (
                        <Input
                          id="website"
                          value={profile.website || ""}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          placeholder="https://yourwebsite.com"
                          type="url"
                        />
                      ) : (
                        <p className="mt-1 text-sm">
                          {profile.website ? (
                            <a 
                              href={profile.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline flex items-center gap-1"
                            >
                              <Globe className="h-4 w-4" />
                              {profile.website}
                            </a>
                          ) : (
                            "Not set"
                          )}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="github">GitHub</Label>
                      {isEditing ? (
                        <Input
                          id="github"
                          value={profile.github || ""}
                          onChange={(e) => handleInputChange('github', e.target.value)}
                          placeholder="github.com/username"
                        />
                      ) : (
                        <p className="mt-1 text-sm">
                          {profile.github ? (
                            <a 
                              href={`https://${profile.github}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {profile.github}
                            </a>
                          ) : (
                            "Not set"
                          )}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      {isEditing ? (
                        <Input
                          id="linkedin"
                          value={profile.linkedin || ""}
                          onChange={(e) => handleInputChange('linkedin', e.target.value)}
                          placeholder="linkedin.com/in/username"
                        />
                      ) : (
                        <p className="mt-1 text-sm">
                          {profile.linkedin ? (
                            <a 
                              href={`https://${profile.linkedin}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {profile.linkedin}
                            </a>
                          ) : (
                            "Not set"
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {(profile.skills || []).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {skill}
                          {isEditing && (
                            <button
                              onClick={() => handleRemoveSkill(skill)}
                              className="ml-1 hover:text-red-500"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          )}
                        </Badge>
                      ))}
                      {(!profile.skills || profile.skills.length === 0) && (
                        <p className="text-sm text-gray-500">No skills added yet</p>
                      )}
                    </div>

                    {isEditing && (
                      <div className="flex gap-2">
                        <Input
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          placeholder="Add a skill..."
                          onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                        />
                        <Button onClick={handleAddSkill} size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Resume Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Resume
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {profile.resume_url ? (
                      <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                              <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">
                                {profile.resume_filename || "Resume.pdf"}
                              </p>
                              {profile.resume_uploaded_at && (
                                <p className="text-xs text-gray-500">
                                  Uploaded {new Date(profile.resume_uploaded_at).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleResumeDownload}
                              className="flex items-center gap-1"
                            >
                              <Download className="h-4 w-4" />
                              Download
                            </Button>
                            {isEditing && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={handleResumeDelete}
                                disabled={isSaving}
                                className="flex items-center gap-1 text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                                Delete
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                          No resume uploaded
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Upload your resume to showcase your experience and skills
                        </p>
                        {isEditing && (
                          <label className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
                            <Upload className="h-4 w-4" />
                            Upload Resume
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={handleResumeUpload}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                    )}

                    {isEditing && profile.resume_url && (
                      <div className="flex justify-center">
                        <label className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
                          <Upload className="h-4 w-4" />
                          Replace Resume
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleResumeUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}

                    <div className="text-xs text-gray-500 text-center">
                      Supported formats: PDF, DOC, DOCX (Max 5MB)
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Profile; 