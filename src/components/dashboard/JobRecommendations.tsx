
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const jobRecommendations = [
  {
    title: "Senior Frontend Developer",
    company: "TechFlow Inc",
    location: "San Francisco, CA",
    salary: "$120k - $160k",
    matchScore: 96,
    posted: "2 hours ago",
    skills: ["React", "TypeScript", "Next.js"],
    logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=60&h=60&fit=crop&crop=center"
  },
  {
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "Remote",
    salary: "$100k - $140k",
    matchScore: 92,
    posted: "1 day ago",
    skills: ["Node.js", "React", "AWS"],
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=60&h=60&fit=crop&crop=center"
  },
  {
    title: "React Developer",
    company: "DigitalCorp",
    location: "New York, NY",
    salary: "$90k - $130k",
    matchScore: 89,
    posted: "3 days ago",
    skills: ["React", "Redux", "GraphQL"],
    logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=60&h=60&fit=crop&crop=center"
  }
];

export const JobRecommendations = () => {
  return (
    <Card className="border-pink-100">
      <CardHeader className="bg-gradient-to-r from-pink-50 to-pink-100 border-b">
        <CardTitle className="flex items-center justify-between">
          AI Job Recommendations
          <Badge variant="secondary" className="bg-pink-100 text-primary">
            3 New Matches
          </Badge>
        </CardTitle>
        <CardDescription>
          Jobs perfectly matched to your skills and preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {jobRecommendations.map((job, index) => (
          <div key={index} className="border border-pink-100 rounded-lg p-4 hover:shadow-md hover:bg-pink-50/30 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <img
                  src={job.logo}
                  alt={job.company}
                  className="w-12 h-12 rounded-lg object-cover border border-pink-100"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{job.title}</h3>
                  <p className="text-gray-600">{job.company}</p>
                  <p className="text-sm text-gray-500">{job.location} • {job.salary}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {job.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="outline" className="text-xs border-pink-200 bg-pink-50 text-primary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-primary">
                    {job.matchScore}% match
                  </span>
                  <div className="w-12 h-2 bg-pink-100 rounded-full">
                    <div 
                      className="h-2 bg-primary rounded-full" 
                      style={{ width: `${job.matchScore}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{job.posted}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                Auto Apply
              </Button>
              <Button size="sm" variant="outline" className="border-pink-200 hover:bg-pink-50 text-primary">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
