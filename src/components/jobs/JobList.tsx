
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JobFilters } from "@/pages/Jobs";
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Bookmark, 
  Heart, 
  ExternalLink, 
  Building,
  Star,
  TrendingUp,
  Zap
} from "lucide-react";
import { useState } from "react";

interface JobListProps {
  searchQuery: string;
  filters: JobFilters;
}

// Mock job data
const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $180k",
    posted: "2 days ago",
    description: "We're looking for a skilled Frontend Developer to join our dynamic team...",
    tags: ["React", "TypeScript", "Next.js"],
    logo: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=60&h=60&fit=crop&crop=center",
    featured: true,
    remote: true,
    urgent: false
  },
  {
    id: 2,
    title: "Product Manager",
    company: "InnovateLab",
    location: "Remote",
    type: "Full-time",
    salary: "$100k - $150k",
    posted: "1 day ago",
    description: "Lead product strategy and development for our AI-powered solutions...",
    tags: ["Product Strategy", "Agile", "Analytics"],
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop&crop=center",
    featured: false,
    remote: true,
    urgent: true
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "Design Studio",
    location: "New York, NY",
    type: "Contract",
    salary: "$80k - $120k",
    posted: "3 days ago",
    description: "Create beautiful and intuitive user experiences for our mobile apps...",
    tags: ["Figma", "Prototyping", "User Research"],
    logo: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=60&h=60&fit=crop&crop=center",
    featured: true,
    remote: false,
    urgent: false
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "AI Innovations",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$130k - $200k",
    posted: "5 days ago",
    description: "Analyze complex datasets and build machine learning models...",
    tags: ["Python", "Machine Learning", "SQL"],
    logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=60&h=60&fit=crop&crop=center",
    featured: false,
    remote: true,
    urgent: false
  }
];

export const JobList = ({ searchQuery, filters }: JobListProps) => {
  const [savedJobs, setSavedJobs] = useState<Set<number>>(new Set());
  const [likedJobs, setLikedJobs] = useState<Set<number>>(new Set());

  const toggleSave = (jobId: number) => {
    const newSaved = new Set(savedJobs);
    if (newSaved.has(jobId)) {
      newSaved.delete(jobId);
    } else {
      newSaved.add(jobId);
    }
    setSavedJobs(newSaved);
  };

  const toggleLike = (jobId: number) => {
    const newLiked = new Set(likedJobs);
    if (newLiked.has(jobId)) {
      newLiked.delete(jobId);
    } else {
      newLiked.add(jobId);
    }
    setLikedJobs(newLiked);
  };

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {mockJobs.length} Jobs Found
          </h2>
          <p className="text-gray-600 mt-1">
            {searchQuery && `Results for "${searchQuery}"`}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Sort by:</span>
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option>Most Relevant</option>
            <option>Date Posted</option>
            <option>Salary High to Low</option>
            <option>Company A-Z</option>
          </select>
        </div>
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        {mockJobs.map((job) => (
          <Card 
            key={job.id} 
            className={`group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm ${
              job.featured ? 'ring-2 ring-blue-200 ring-opacity-50' : ''
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4 flex-1">
                  {/* Company Logo */}
                  <div className="relative">
                    <img 
                      src={job.logo} 
                      alt={job.company}
                      className="w-16 h-16 rounded-xl object-cover border-2 border-gray-100"
                    />
                    {job.featured && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <Star className="w-3 h-3 text-white fill-current" />
                      </div>
                    )}
                  </div>

                  {/* Job Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Building className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600 font-medium">{job.company}</span>
                          {job.urgent && (
                            <Badge variant="destructive" className="text-xs">
                              <Zap className="w-3 h-3 mr-1" />
                              Urgent
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                        {job.remote && (
                          <Badge variant="secondary" className="ml-2 text-xs">Remote</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {job.salary}
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {job.posted}
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {job.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {job.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleSave(job.id)}
                    className={`${savedJobs.has(job.id) ? 'text-blue-600 bg-blue-50' : 'text-gray-400'} hover:bg-blue-50 hover:text-blue-600`}
                  >
                    <Bookmark className={`w-5 h-5 ${savedJobs.has(job.id) ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleLike(job.id)}
                    className={`${likedJobs.has(job.id) ? 'text-red-600 bg-red-50' : 'text-gray-400'} hover:bg-red-50 hover:text-red-600`}
                  >
                    <Heart className={`w-5 h-5 ${likedJobs.has(job.id) ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                <div className="text-sm text-gray-500">
                  Posted {job.posted}
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    View Details
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2"
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg" className="mt-8">
          Load More Jobs
        </Button>
      </div>
    </div>
  );
};
