import React from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { User, Mail, Phone, MapPin, Globe, Github, Linkedin } from 'lucide-react';

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
}

interface EnhancedPersonalInfoSectionProps {
  data: PersonalInfo;
  onUpdate: (data: PersonalInfo) => void;
}

export const EnhancedPersonalInfoSection: React.FC<EnhancedPersonalInfoSectionProps> = ({
  data,
  onUpdate
}) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onUpdate({
      ...data,
      [field]: value
    });
  };

  const inputFields = [
    {
      key: 'name' as keyof PersonalInfo,
      label: 'Full Name',
      placeholder: 'John Doe',
      icon: User,
      required: true,
      type: 'text'
    },
    {
      key: 'email' as keyof PersonalInfo,
      label: 'Email Address',
      placeholder: 'john.doe@example.com',
      icon: Mail,
      required: true,
      type: 'email'
    },
    {
      key: 'phone' as keyof PersonalInfo,
      label: 'Phone Number',
      placeholder: '+1 (555) 123-4567',
      icon: Phone,
      required: true,
      type: 'tel'
    },
    {
      key: 'location' as keyof PersonalInfo,
      label: 'Location',
      placeholder: 'New York, NY',
      icon: MapPin,
      required: false,
      type: 'text'
    },
    {
      key: 'website' as keyof PersonalInfo,
      label: 'Website',
      placeholder: 'https://johndoe.com',
      icon: Globe,
      required: false,
      type: 'url'
    },
    {
      key: 'linkedin' as keyof PersonalInfo,
      label: 'LinkedIn',
      placeholder: 'https://linkedin.com/in/johndoe',
      icon: Linkedin,
      required: false,
      type: 'url'
    },
    {
      key: 'github' as keyof PersonalInfo,
      label: 'GitHub',
      placeholder: 'https://github.com/johndoe',
      icon: Github,
      required: false,
      type: 'url'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="font-medium text-blue-900 mb-2">💡 Personal Information Tips</p>
        <ul className="space-y-1 text-blue-800">
          <li>• Use a professional email address</li>
          <li>• Include your full name as you want it to appear professionally</li>
          <li>• Add relevant social profiles (LinkedIn, GitHub for tech roles)</li>
          <li>• Keep your location general (city, state) for privacy</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {inputFields.map((field, index) => (
          <motion.div
            key={field.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={field.key === 'name' || field.key === 'email' ? 'md:col-span-2' : ''}
          >
            <Card className="border border-gray-200 hover:border-blue-300 transition-colors">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <Label 
                    htmlFor={field.key}
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    <field.icon className="w-4 h-4 text-blue-600" />
                    {field.label}
                    {field.required && <span className="text-red-500">*</span>}
                  </Label>
                  <Input
                    id={field.key}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={data[field.key]}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required={field.required}
                  />
                  {field.key === 'email' && data.email && !data.email.includes('@') && (
                    <p className="text-xs text-red-600">Please enter a valid email address</p>
                  )}
                  {(field.type === 'url') && data[field.key] && !data[field.key].startsWith('http') && (
                    <p className="text-xs text-amber-600">URL should start with http:// or https://</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Preview Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              Preview
            </h3>
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-gray-900">
                {data.name || 'Your Name'}
              </h4>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                {data.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {data.email}
                  </span>
                )}
                {data.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {data.phone}
                  </span>
                )}
                {data.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {data.location}
                  </span>
                )}
              </div>
              {(data.website || data.linkedin || data.github) && (
                <div className="flex flex-wrap gap-3 text-sm">
                  {data.website && (
                    <span className="flex items-center gap-1 text-blue-600">
                      <Globe className="w-3 h-3" />
                      Website
                    </span>
                  )}
                  {data.linkedin && (
                    <span className="flex items-center gap-1 text-blue-600">
                      <Linkedin className="w-3 h-3" />
                      LinkedIn
                    </span>
                  )}
                  {data.github && (
                    <span className="flex items-center gap-1 text-blue-600">
                      <Github className="w-3 h-3" />
                      GitHub
                    </span>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}; 