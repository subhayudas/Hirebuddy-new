import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  BriefcaseBusiness, 
  ChevronRight, 
  FileText, 
  Lightbulb, 
  Sparkles, 
  TrendingUp, 
  Users 
} from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

interface DashboardHeaderProps {
  userName: string;
  isNewSession?: boolean;
}

const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
};

export function DashboardHeader({ userName, isNewSession = false }: DashboardHeaderProps) {
  const timeOfDay = getTimeOfDay();
  const { toast } = useToast();
  const [showWelcome, setShowWelcome] = useState(false);
  
  useEffect(() => {
    // Check if this is a new session (user just logged in)
    const isNewLogin = sessionStorage.getItem('newLogin');
    
    if (isNewLogin === 'true') {
      setShowWelcome(true);
      // Show welcome toast
      toast({
        title: 'Welcome to Hirebuddy!',
        description: 'Your account has been accessed successfully.',
      });
      // Remove the flag so toast doesn't show again on page refresh
      sessionStorage.removeItem('newLogin');
    }
  }, [toast]);

  return (
    <div className="pb-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
          <p className="text-sm font-medium text-green-600">Your career dashboard</p>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">
          Good {timeOfDay}, {userName}
        </h1>
        <p className="text-gray-600">
          Here's your job search progress and opportunities for today
        </p>
      </div>
      
      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-100 hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <BriefcaseBusiness className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">Find Jobs</h3>
              <p className="text-sm text-gray-600">Browse latest openings</p>
            </div>
            <ChevronRight className="h-5 w-5 text-blue-600 ml-auto" />
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-100 hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium">Resume</h3>
              <p className="text-sm text-gray-600">Update & optimize</p>
            </div>
            <ChevronRight className="h-5 w-5 text-purple-600 ml-auto" />
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-100 hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-medium">Analytics</h3>
              <p className="text-sm text-gray-600">Track your progress</p>
            </div>
            <ChevronRight className="h-5 w-5 text-amber-600 ml-auto" />
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-100 hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium">Interviews</h3>
              <p className="text-sm text-gray-600">Prepare & practice</p>
            </div>
            <ChevronRight className="h-5 w-5 text-green-600 ml-auto" />
          </CardContent>
        </Card>
      </div>
      
      {/* Insight Card */}
      <Card className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-blue-100 mb-8">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-indigo-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-indigo-900">Weekly Insight</h3>
            <p className="text-sm text-gray-700">Updating your resume with industry keywords can increase interview chances by 70%</p>
          </div>
          <Button variant="outline" size="sm" className="border-indigo-200 text-indigo-700 hover:bg-indigo-100 whitespace-nowrap">
            Learn More
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}