
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Search,
  FileText,
  User,
  Settings,
  Bell,
  BookOpen,
  TrendingUp,
  Calendar,
  MessageSquare,
  Briefcase,
  Target
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Find Jobs", url: "/jobs", icon: Search },
  { title: "Applications", url: "/applications", icon: Briefcase },
  { title: "Resume Builder", url: "/resume-editor", icon: FileText },
  { title: "Interview Prep", url: "/interview-prep", icon: MessageSquare },
  { title: "Skill Assessment", url: "/skills", icon: Target },
];

const toolsItems = [
  { title: "Analytics", url: "/analytics", icon: TrendingUp },
  { title: "Learning Hub", url: "/learning", icon: BookOpen },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Notifications", url: "/notifications", icon: Bell },
];

const accountItems = [
  { title: "Profile", url: "/profile", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const { user } = useAuth();

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "";

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          {state === "expanded" && (
            <div>
              <h2 className="font-semibold text-lg">Hirebuddy</h2>
              <p className="text-xs text-muted-foreground">Your Career Assistant</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        {state === "expanded" && (
          <div className="flex items-center space-x-3 p-2 rounded-lg bg-sidebar-accent">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b932?w=60&h=60&fit=crop&crop=center" />
              <AvatarFallback>{user?.email?.split('@')[0]?.substring(0, 2)?.toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.email?.split('@')[0] || "User"}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email || "Not signed in"}</p>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
