import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  websiteText?: string;
  linkedin?: string;
  linkedinText?: string;
  github?: string;
  githubText?: string;
}

interface PersonalInfoSectionProps {
  personalInfo: PersonalInfo;
  onUpdate: (data: PersonalInfo) => void;
}

export const PersonalInfoSection = ({ personalInfo, onUpdate }: PersonalInfoSectionProps) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onUpdate({ ...personalInfo, [field]: value });
  };

  return (
    <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={personalInfo.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={personalInfo.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="john@example.com"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={personalInfo.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="(555) 123-4567"
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={personalInfo.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="San Francisco, CA"
            />
          </div>
          
          {/* Website Section */}
          <div className="md:col-span-2">
            <Label htmlFor="website">Website URL</Label>
            <Input
              id="website"
              type="url"
              value={personalInfo.website || ""}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder="https://yourwebsite.com"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="websiteText">Website Display Text (optional)</Label>
            <Input
              id="websiteText"
              value={personalInfo.websiteText || ""}
              onChange={(e) => handleChange('websiteText', e.target.value)}
              placeholder="Portfolio | My Website | etc."
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave blank to show the full URL. Enter custom text to display instead of the URL.
            </p>
          </div>
          
          {/* LinkedIn Section */}
          <div className="md:col-span-2">
            <Label htmlFor="linkedin">LinkedIn Profile</Label>
            <Input
              id="linkedin"
              value={personalInfo.linkedin || ""}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              placeholder="https://linkedin.com/in/yourprofile or just 'yourprofile'"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="linkedinText">LinkedIn Display Text (optional)</Label>
            <Input
              id="linkedinText"
              value={personalInfo.linkedinText || ""}
              onChange={(e) => handleChange('linkedinText', e.target.value)}
              placeholder="LinkedIn Profile | Connect with me | etc."
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave blank to show "LinkedIn Profile". Enter custom text to display instead.
            </p>
          </div>
          
          {/* GitHub Section */}
          <div className="md:col-span-2">
            <Label htmlFor="github">GitHub Profile</Label>
            <Input
              id="github"
              value={personalInfo.github || ""}
              onChange={(e) => handleChange('github', e.target.value)}
              placeholder="https://github.com/yourusername or just 'yourusername'"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="githubText">GitHub Display Text (optional)</Label>
            <Input
              id="githubText"
              value={personalInfo.githubText || ""}
              onChange={(e) => handleChange('githubText', e.target.value)}
              placeholder="GitHub Profile | View my code | etc."
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave blank to show "GitHub Profile". Enter custom text to display instead.
            </p>
          </div>
        </div>
    </div>
  );
};
