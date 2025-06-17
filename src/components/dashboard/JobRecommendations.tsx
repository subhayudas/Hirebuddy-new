import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase } from "lucide-react";
import { useJobs } from "@/hooks/useJobs";
import { Link } from "react-router-dom";

export const JobRecommendations = () => {
  // Fetch a limited number of recent jobs as recommendations
  const { data: jobsData, isLoading, error } = useJobs({
    limit: 3,
    sortBy: 'created_at',
    sortOrder: 'desc'
  });

  const jobs = jobsData?.jobs || [];

  if (isLoading) {
    return (
      <Card className="border-pink-100">
        <CardHeader className="bg-gradient-to-r from-pink-50 to-pink-100 border-b">
          <CardTitle className="flex items-center justify-between">
            AI Job Recommendations
            <Skeleton className="h-6 w-20" />
          </CardTitle>
          <CardDescription>
            Jobs perfectly matched to your skills and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="border border-pink-100 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <Skeleton className="w-12 h-12 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-3 w-full" />
                    <div className="flex gap-1">
                      <Skeleton className="h-5 w-12" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Skeleton className="h-4 w-16 mb-1" />
                  <Skeleton className="h-2 w-12" />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error || jobs.length === 0) {
    return (
      <Card className="border-pink-100">
        <CardHeader className="bg-gradient-to-r from-pink-50 to-pink-100 border-b">
          <CardTitle className="flex items-center justify-between">
            AI Job Recommendations
            <Badge variant="secondary" className="bg-pink-100 text-primary">
              No matches
            </Badge>
          </CardTitle>
          <CardDescription>
            Jobs perfectly matched to your skills and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="py-8">
          <div className="text-center">
            <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              {error ? "Unable to load job recommendations" : "No job recommendations available"}
            </p>
            <Link to="/jobs">
              <Button variant="outline" className="border-pink-200 hover:bg-pink-50 text-primary">
                Browse All Jobs
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate mock match scores for display (in a real app, this would be calculated based on user profile)
  const getMatchScore = (index: number) => {
    const baseScores = [96, 92, 89];
    return baseScores[index] || 85;
  };

  return (
    <Card className="border-pink-100">
      <CardHeader className="bg-gradient-to-r from-pink-50 to-pink-100 border-b">
        <CardTitle className="flex items-center justify-between">
          AI Job Recommendations
          <Badge variant="secondary" className="bg-pink-100 text-primary">
            {jobs.length} New Match{jobs.length !== 1 ? 'es' : ''}
          </Badge>
        </CardTitle>
        <CardDescription>
          Jobs perfectly matched to your skills and preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {jobs.map((job, index) => {
          const matchScore = getMatchScore(index);
          
          return (
            <div key={job.id} className="border border-pink-100 rounded-lg p-4 hover:shadow-md hover:bg-pink-50/30 transition-all">
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
                    <p className="text-sm text-gray-500">{job.location} • {job.posted}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {job.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs border-pink-200 bg-pink-50 text-primary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-primary">
                      {matchScore}% match
                    </span>
                    <div className="w-12 h-2 bg-pink-100 rounded-full">
                      <div 
                        className="h-2 bg-primary rounded-full" 
                        style={{ width: `${matchScore}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{job.posted}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button 
                  size="sm" 
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={() => {
                    if (job.applyLink) {
                      window.open(job.applyLink, '_blank');
                    }
                  }}
                >
                  Auto Apply
                </Button>
                <Link to={`/jobs`} className="flex-1">
                  <Button size="sm" variant="outline" className="w-full border-pink-200 hover:bg-pink-50 text-primary">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
        
        <div className="pt-2 border-t border-pink-100">
          <Link to="/jobs" className="block">
            <Button variant="ghost" className="w-full text-primary hover:bg-pink-50">
              View All Job Recommendations
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
