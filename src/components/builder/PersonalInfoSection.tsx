"use client";

import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useResumeStore } from "@/utils/store";
import { User } from "lucide-react";

const PersonalInfoSection = () => {
  const { personalInfo, setPersonalInfo } = useResumeStore();

  const handleChange = (field: string, value: string) => {
    setPersonalInfo({
      ...personalInfo,
      [field]: value,
    });
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <User className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-semibold">Personal Information</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={personalInfo.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="john.doe@example.com"
            value={personalInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={personalInfo.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="San Francisco, CA"
            value={personalInfo.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            placeholder="username"
            value={personalInfo.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Just the username (e.g., &quot;johndoe&quot;)
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="github">GitHub</Label>
          <Input
            id="github"
            placeholder="username"
            value={personalInfo.github || ''}
            onChange={(e) => handleChange('github', e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Just the username (e.g., &quot;johndoe&quot;)
          </p>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="website">Website / Portfolio</Label>
          <Input
            id="website"
            type="url"
            placeholder="https://yourwebsite.com"
            value={personalInfo.website || ''}
            onChange={(e) => handleChange('website', e.target.value)}
          />
        </div>
      </div>
    </Card>
  );
};

export default PersonalInfoSection;

