import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Lightbulb, Settings } from "lucide-react";

interface DashboardHeaderProps {
  userName: string;
}

export const DashboardHeader = ({ userName }: DashboardHeaderProps) => {
  // Get time of day for personalized greeting
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
  };

  return (
    <div className="mb-8 mt-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Good {getTimeOfDay()}, {userName}!
          </h1>
          <p className="text-gray-600 mt-1">
            Your personalized job search dashboard with AI-powered insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9" asChild>
            <Link to="/settings">
              <Settings className="h-4 w-4 mr-1.5" />
              Settings
            </Link>
          </Button>
          <Button className="h-9">
            <Lightbulb className="h-4 w-4 mr-1.5" />
            Job Assistant
          </Button>
        </div>
      </div>

      <div className="mt-6 p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-center gap-3">
        <div className="bg-blue-100 rounded-full p-2">
          <Lightbulb className="h-5 w-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">AI Tip:</span> Updating your resume with keywords from job descriptions can increase your match rate by 40%.
          </p>
        </div>
        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 gap-1">
          <span>Learn more</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};