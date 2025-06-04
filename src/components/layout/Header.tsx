
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X, Briefcase } from "lucide-react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Hirebuddy</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/dashboard" className="text-gray-600 hover:text-purple-600 transition-colors">
              Dashboard
            </Link>
            <Link to="/jobs" className="text-gray-600 hover:text-purple-600 transition-colors">
              Find Jobs
            </Link>
            <Link to="/resume-editor" className="text-gray-600 hover:text-purple-600 transition-colors">
              Resume Builder
            </Link>
            <Button variant="outline" className="ml-4 border-purple-600 text-purple-600 hover:bg-purple-50">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Get Started
            </Button>
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link to="/dashboard" className="text-gray-600 hover:text-purple-600 transition-colors">
                Dashboard
              </Link>
              <Link to="/jobs" className="text-gray-600 hover:text-purple-600 transition-colors">
                Find Jobs
              </Link>
              <Link to="/resume-editor" className="text-gray-600 hover:text-purple-600 transition-colors">
                Resume Builder
              </Link>
              <Link to="/applications" className="text-gray-600 hover:text-purple-600 transition-colors">
                Applications
              </Link>
              <div className="pt-4 flex flex-col space-y-3">
                <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-50">
                  Sign In
                </Button>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
