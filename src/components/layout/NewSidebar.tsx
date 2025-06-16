import React, { createContext, useContext, useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Search,
  FileText,
  User,
  Briefcase,
  Mail,
  TrendingUp,
  Calendar,
  Bell,
  Settings,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  LogOut
} from "lucide-react";

interface SidebarContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isMobile: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

interface SidebarProviderProps {
  children: React.ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        setIsOpen,
        isCollapsed,
        setIsCollapsed,
        isMobile,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const mainNavItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Find Jobs", href: "/jobs", icon: Search },
  { title: "Applications", href: "/applications", icon: Briefcase },
  { title: "Resume Builder", href: "/resume-builder", icon: FileText },
];

const toolsNavItems: NavItem[] = [
  { title: "Email Outreach", href: "/email-outreach", icon: Mail },
  { title: "Analytics", href: "/analytics", icon: TrendingUp },
  { title: "Calendar", href: "/calendar", icon: Calendar },
  { title: "Notifications", href: "/notifications", icon: Bell, badge: "3" },
];

const accountNavItems: NavItem[] = [
  { title: "Profile", href: "/profile", icon: User },
  { title: "Settings", href: "/settings", icon: Settings },
];

interface SidebarLinkProps {
  item: NavItem;
  isCollapsed: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ item, isCollapsed }) => {
  const location = useLocation();
  const isActive = location.pathname === item.href;

  return (
    <NavLink
      to={item.href}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
        isActive
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground hover:bg-accent"
      )}
    >
      <item.icon className="h-5 w-5 flex-shrink-0" />
      <AnimatePresence>
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="font-medium whitespace-nowrap overflow-hidden"
          >
            {item.title}
          </motion.span>
        )}
      </AnimatePresence>
      {item.badge && !isCollapsed && (
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="ml-auto bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full"
        >
          {item.badge}
        </motion.span>
      )}
      {isCollapsed && item.badge && (
        <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {item.badge}
        </div>
      )}
    </NavLink>
  );
};

interface SidebarSectionProps {
  title: string;
  items: NavItem[];
  isCollapsed: boolean;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, items, isCollapsed }) => {
  return (
    <div className="space-y-2">
      <AnimatePresence>
        {!isCollapsed && (
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider"
          >
            {title}
          </motion.h3>
        )}
      </AnimatePresence>
      <div className="space-y-1">
        {items.map((item) => (
          <SidebarLink key={item.href} item={item} isCollapsed={isCollapsed} />
        ))}
      </div>
    </div>
  );
};

const DesktopSidebar: React.FC = () => {
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const { user, signOut } = useAuth();

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User";
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <motion.div
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="hidden md:flex flex-col bg-card border-r border-border h-screen sticky top-0"
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3"
              >
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  H
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Hirebuddy</h2>
                  <p className="text-xs text-muted-foreground">Your Career Assistant</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        <SidebarSection title="Main" items={mainNavItems} isCollapsed={isCollapsed} />
        <SidebarSection title="Tools" items={toolsNavItems} isCollapsed={isCollapsed} />
        <SidebarSection title="Account" items={accountNavItems} isCollapsed={isCollapsed} />
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium truncate">{userName}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </motion.div>
            )}
          </AnimatePresence>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => signOut?.()}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const MobileSidebar: React.FC = () => {
  const { isOpen, setIsOpen } = useSidebar();
  const { user, signOut } = useAuth();

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User";
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
            H
          </div>
          <h2 className="font-semibold text-lg">Hirebuddy</h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 h-full w-80 bg-card border-r border-border z-50 md:hidden flex flex-col"
            >
              {/* Mobile Sidebar Header */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
                      H
                    </div>
                    <div>
                      <h2 className="font-semibold text-lg">Hirebuddy</h2>
                      <p className="text-xs text-muted-foreground">Your Career Assistant</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Mobile Navigation */}
              <div className="flex-1 p-4 space-y-6 overflow-y-auto">
                <SidebarSection title="Main" items={mainNavItems} isCollapsed={false} />
                <SidebarSection title="Tools" items={toolsNavItems} isCollapsed={false} />
                <SidebarSection title="Account" items={accountNavItems} isCollapsed={false} />
              </div>

              {/* Mobile Footer */}
              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{userName}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => signOut?.()}
                  className="w-full"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export const NewSidebar: React.FC = () => {
  return (
    <SidebarProvider>
      <DesktopSidebar />
      <MobileSidebar />
    </SidebarProvider>
  );
};

export default NewSidebar; 