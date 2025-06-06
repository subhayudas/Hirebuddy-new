import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Edit, Save, User, Briefcase, MapPin, Mail, Phone, Globe, FileText, Shield, Bell } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Profile data state
  const [profileData, setProfileData] = useState({
    fullName: user?.email?.split('@')[0] || "User",
    email: user?.email || "",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    title: "Frontend Developer",
    bio: "Passionate frontend developer with experience building responsive and accessible web applications. Specialized in React, TypeScript, and modern CSS frameworks.",
    website: "https://example.dev",
    github: "github.com/example",
    linkedin: "linkedin.com/in/example"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically save the data to your backend
    console.log("Saving profile data:", profileData);
    setIsEditing(false);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage>Profile</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Summary Card */}
                <Card className="lg:col-span-1">
                  <CardHeader className="text-center">
                    <div className="flex justify-end">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                      </Button>
                    </div>
                    <div className="flex flex-col items-center">
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b932?w=120&h=120&fit=crop&crop=center" />
                        <AvatarFallback>{profileData.fullName?.substring(0, 2)?.toUpperCase() || "U"}</AvatarFallback>
                      </Avatar>
                      {isEditing ? (
                        <Input 
                          name="fullName"
                          value={profileData.fullName} 
                          onChange={handleInputChange}
                          className="text-xl font-bold text-center"
                        />
                      ) : (
                        <h2 className="text-xl font-bold">{profileData.fullName}</h2>
                      )}
                      {isEditing ? (
                        <Input 
                          name="title"
                          value={profileData.title} 
                          onChange={handleInputChange}
                          className="text-sm text-muted-foreground text-center mt-1"
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground mt-1">{profileData.title}</p>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        {isEditing ? (
                          <Input 
                            name="location"
                            value={profileData.location} 
                            onChange={handleInputChange}
                            className="text-sm"
                          />
                        ) : (
                          <span className="text-sm">{profileData.location}</span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        {isEditing ? (
                          <Input 
                            name="email"
                            value={profileData.email} 
                            onChange={handleInputChange}
                            className="text-sm"
                            type="email"
                          />
                        ) : (
                          <span className="text-sm">{profileData.email}</span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        {isEditing ? (
                          <Input 
                            name="phone"
                            value={profileData.phone} 
                            onChange={handleInputChange}
                            className="text-sm"
                            type="tel"
                          />
                        ) : (
                          <span className="text-sm">{profileData.phone}</span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                        {isEditing ? (
                          <Input 
                            name="website"
                            value={profileData.website} 
                            onChange={handleInputChange}
                            className="text-sm"
                            type="url"
                          />
                        ) : (
                          <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                            {profileData.website}
                          </a>
                        )}
                      </div>
                      {isEditing && (
                        <div className="pt-4">
                          <Button onClick={handleSave} className="w-full">Save Profile</Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">
                  <Tabs defaultValue="about">
                    <TabsList className="mb-4">
                      <TabsTrigger value="about">About</TabsTrigger>
                      <TabsTrigger value="resume">Resume</TabsTrigger>
                      <TabsTrigger value="preferences">Job Preferences</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="about" className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>About Me</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {isEditing ? (
                            <Textarea 
                              name="bio"
                              value={profileData.bio} 
                              onChange={handleInputChange}
                              className="min-h-[150px]"
                            />
                          ) : (
                            <p>{profileData.bio}</p>
                          )}
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>Social Profiles</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center">
                              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                              </svg>
                              {isEditing ? (
                                <Input 
                                  name="github"
                                  value={profileData.github} 
                                  onChange={handleInputChange}
                                  className="text-sm"
                                />
                              ) : (
                                <a href={`https://${profileData.github}`} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                                  {profileData.github}
                                </a>
                              )}
                            </div>
                            <div className="flex items-center">
                              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                              </svg>
                              {isEditing ? (
                                <Input 
                                  name="linkedin"
                                  value={profileData.linkedin} 
                                  onChange={handleInputChange}
                                  className="text-sm"
                                />
                              ) : (
                                <a href={`https://${profileData.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                                  {profileData.linkedin}
                                </a>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="resume" className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Resume</CardTitle>
                          <CardDescription>Manage your resume and export options</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center">
                              <FileText className="h-8 w-8 mr-4 text-blue-600" />
                              <div>
                                <h3 className="font-medium">Sarah_Johnson_Resume.pdf</h3>
                                <p className="text-sm text-muted-foreground">Last updated: Jan 15, 2024</p>
                              </div>
                            </div>
                            <div className="space-x-2">
                              <Button variant="outline" size="sm">View</Button>
                              <Button variant="outline" size="sm">Update</Button>
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button className="w-full">Go to Resume Builder</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="preferences" className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Job Preferences</CardTitle>
                          <CardDescription>Set your job search preferences</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="job-title">Desired Job Title</Label>
                              <Input id="job-title" defaultValue="Senior Frontend Developer" />
                            </div>
                            <div>
                              <Label htmlFor="job-location">Preferred Location</Label>
                              <Input id="job-location" defaultValue="San Francisco, CA" />
                            </div>
                            <div>
                              <Label htmlFor="job-type">Job Type</Label>
                              <Input id="job-type" defaultValue="Full-time, Remote" />
                            </div>
                            <div>
                              <Label htmlFor="salary">Expected Salary Range</Label>
                              <Input id="salary" defaultValue="$120,000 - $150,000" />
                            </div>
                            <div className="pt-2">
                              <Button>Save Preferences</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="settings" className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Account Settings</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="email-notifications">Email Notifications</Label>
                              <div className="flex items-center justify-between mt-2 p-3 border rounded-lg">
                                <div className="flex items-center">
                                  <Bell className="h-4 w-4 mr-2" />
                                  <span>Job Alerts</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Button variant="outline" size="sm">Daily</Button>
                                  <Button variant="outline" size="sm">Weekly</Button>
                                  <Button variant="outline" size="sm">Off</Button>
                                </div>
                              </div>
                            </div>
                            <div className="mt-4">
                              <Label htmlFor="password">Change Password</Label>
                              <div className="flex items-center justify-between mt-2 p-3 border rounded-lg">
                                <div className="flex items-center">
                                  <Shield className="h-4 w-4 mr-2" />
                                  <span>Password & Security</span>
                                </div>
                                <Button variant="outline" size="sm">Update</Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Profile;