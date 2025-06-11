import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  BriefcaseBusiness, 
  ChevronRight, 
  FileText, 
  Lightbulb, 
  Sparkles, 
  TrendingUp, 
  User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

interface DashboardHeaderProps {
  userName: string;
  isNewSession?: boolean;
}

function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}

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
      <div className="mb-8 bg-gradient-to-r from-pink-50 to-pink-100 p-6 rounded-xl border border-pink-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Good {timeOfDay}, {userName}!</h1>
            <p className="text-muted-foreground mt-1">Here's what's happening with your job search today.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" size="sm" className="bg-white/80 border-pink-200 hover:bg-pink-100 hover:text-primary">
              <Link to="/resume-builder">
                <FileText className="mr-2 h-4 w-4" />
                Update Resume
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="bg-white/80 border-pink-200 hover:bg-pink-100 hover:text-primary">
              <Link to="/jobs">
                <BriefcaseBusiness className="mr-2 h-4 w-4" />
                Find Jobs
              </Link>
            </Button>
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
              <Link to="/profile">
                <User className="mr-2 h-4 w-4" />
                Complete Profile
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-4 flex items-center gap-2 text-sm bg-white/60 p-3 rounded-lg border border-pink-200">
          <Lightbulb className="h-4 w-4 text-primary" />
          <span className="font-medium">Pro Tip:</span>
          <span className="text-muted-foreground">Update your skills section to match job descriptions for better results.</span>
          <Sparkles className="h-4 w-4 text-primary ml-auto" />
        </div>
      </div>

      {/* Dashboard Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Button variant="outline" size="sm" asChild>
          <Link to="/analytics">
            <TrendingUp className="mr-2 h-4 w-4" />
            View Analytics
          </Link>
        </Button>
      </div>
    </div>
  );
}