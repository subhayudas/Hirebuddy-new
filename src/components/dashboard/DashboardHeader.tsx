import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Lightbulb, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
    <div className="flex flex-col space-y-6 pb-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Good {timeOfDay}, {userName}!
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your job search today.
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="h-8">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            <Link to="/job-assistant" className="flex items-center">
              Job Assistant
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full flex items-center">
            <Lightbulb className="mr-1 h-3 w-3" />
            <span>AI Tip: Update your resume weekly for better matches</span>
          </div>
        </div>
      </div>
    </div>
  );
}