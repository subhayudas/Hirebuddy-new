import React from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, Globe } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link: string;
  github: string;
  startDate: string;
  endDate: string;
}

interface EnhancedProjectsSectionProps {
  data: Project[];
  onUpdate: (data: Project[]) => void;
}

export const EnhancedProjectsSection: React.FC<EnhancedProjectsSectionProps> = ({
  data,
  onUpdate
}) => {
  const generateId = () => `proj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const addProject = () => {
    const newProject: Project = {
      id: generateId(),
      name: '',
      description: '',
      technologies: [],
      link: '',
      github: '',
      startDate: '',
      endDate: ''
    };
    onUpdate([...data, newProject]);
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    const updatedData = data.map(proj => 
      proj.id === id ? { ...proj, [field]: value } : proj
    );
    onUpdate(updatedData);
  };

  const removeProject = (id: string) => {
    onUpdate(data.filter(proj => proj.id !== id));
  };

  return (
    <div className="space-y-6">
      

      <div className="space-y-4">
        {data.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border border-gray-200 hover:border-pink-300 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-pink-600" />
                    <h3 className="font-medium">Project {index + 1}</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeProject(project.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Project Name *</Label>
                      <Input
                        placeholder="E-commerce Website"
                        value={project.name}
                        onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Live Link</Label>
                      <Input
                        placeholder="https://myproject.com"
                        value={project.link}
                        onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      placeholder="Describe your project, its purpose, and key features..."
                      value={project.description}
                      onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>GitHub Repository</Label>
                      <Input
                        placeholder="https://github.com/username/project"
                        value={project.github}
                        onChange={(e) => updateProject(project.id, 'github', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Technologies (comma-separated)</Label>
                      <Input
                        placeholder="React, Node.js, MongoDB"
                        value={project.technologies.join(', ')}
                        onChange={(e) => updateProject(project.id, 'technologies', e.target.value.split(',').map(t => t.trim()).filter(t => t))}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Button
        onClick={addProject}
        variant="outline"
        className="w-full h-12 border-dashed border-2 border-pink-300 text-pink-600 hover:border-pink-400"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Project
      </Button>
    </div>
  );
}; 