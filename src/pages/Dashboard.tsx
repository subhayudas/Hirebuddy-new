import { NewSidebar } from "@/components/layout/NewSidebar";
import { MainDashboard } from "@/components/dashboard/MainDashboard";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Bell, Search, Settings, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [userName, setUserName] = useState(user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User");
  const [isLoading, setIsLoading] = useState(true);
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase();

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Update username when user auth state changes
  useEffect(() => {
    if (user) {
      // Use display name from user metadata, or fallback to email username
      setUserName(user.user_metadata?.full_name || user.email?.split('@')[0] || user.email || "User");
    }
  }, [user]);

  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <NewSidebar />
      <div className="flex-1 flex flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between px-6 border-b bg-white sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center space-x-2 bg-gray-100 px-3 py-1.5 rounded-md w-64">
              <Search className="h-4 w-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none outline-none text-sm w-full"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">3</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-5 w-5" />
            </Button>
            <Separator orientation="vertical" className="h-6" />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full flex items-center gap-2 p-1 pl-2">
                  <span className="text-sm font-medium hidden md:inline">{userName}</span>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut?.()}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        <div className="flex flex-1 flex-col max-w-7xl mx-auto px-4 md:px-6 py-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-[80vh]">
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-gray-500">Loading your dashboard...</p>
              </div>
            </div>
          ) : (
            <>
              <DashboardHeader userName={userName} />
              <MainDashboard />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;