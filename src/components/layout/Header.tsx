import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Briefcase,
  Sparkles,
  Zap,
  Users,
  BarChart3,
  Calendar,
  FileText,
  Search,
  MessageSquare,
  User,
  Settings,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import { AuthButton } from "@/components/auth/AuthButton";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeaderProps {
  openSignIn?: () => void;
}

const navigationItems = [
  {
    title: "Features",
    href: "#features",
    description: "Discover our powerful AI-driven tools",
    items: [
      {
        title: "AI Resume Builder",
        href: "/resume-editor",
        description: "Create ATS-optimized resumes with AI assistance",
        icon: FileText,
        badge: "Popular",
      },
      {
        title: "Smart Job Matching",
        href: "/jobs",
        description: "Find perfect job matches with AI",
        icon: Search,
        badge: "New",
      },
      {
        title: "Interview Preparation",
        href: "/interview-prep",
        description: "Practice with AI-powered mock interviews",
        icon: MessageSquare,
      },
      {
        title: "Application Tracking",
        href: "/applications",
        description: "Monitor your job application progress",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    description: "Access your personalized career dashboard",
  },
  {
    title: "Analytics",
    href: "/analytics",
    description: "Track your job search performance",
  },
];

const mobileNavItems = [
  { title: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { title: "Find Jobs", href: "/jobs", icon: Search },
  { title: "Resume Builder", href: "/resume-editor", icon: FileText },
  { title: "Applications", href: "/applications", icon: Users },
  { title: "Interview Prep", href: "/interview-prep", icon: MessageSquare },
  { title: "Calendar", href: "/calendar", icon: Calendar },
  { title: "Analytics", href: "/analytics", icon: BarChart3 },
];

export const Header = ({ openSignIn }: HeaderProps = {}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "glass-nav shadow-lg backdrop-blur-md" : "bg-transparent",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-coral-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Hirebuddy</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden lg:flex items-center space-x-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <NavigationMenu>
              <NavigationMenuList className="space-x-2">
                {navigationItems.map((item, index) => (
                  <NavigationMenuItem key={item.title}>
                    {item.items ? (
                      <>
                        <NavigationMenuTrigger className="bg-transparent hover:bg-pink-50 data-[state=open]:bg-pink-50 transition-all duration-300 rounded-lg px-3 py-2 text-gray-700 hover:text-pink-600">
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="bg-white border border-gray-200 rounded-xl p-4 w-[500px] shadow-lg">
                            <div className="grid grid-cols-2 gap-4">
                              {item.items.map((subItem) => (
                                <NavigationMenuLink key={subItem.title} asChild>
                                  <Link
                                    to={subItem.href}
                                    className="group block p-3 rounded-lg hover:bg-pink-50 transition-all duration-300"
                                  >
                                    <div className="flex items-start space-x-3">
                                      <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center group-hover:bg-pink-200 transition-colors duration-300">
                                        <subItem.icon className="w-4 h-4 text-pink-600" />
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                          <h4 className="font-medium text-gray-900 group-hover:text-pink-600 transition-colors text-sm">
                                            {subItem.title}
                                          </h4>
                                          {subItem.badge && (
                                            <Badge
                                              variant="secondary"
                                              className="text-xs bg-pink-100 text-pink-700 border-0"
                                            >
                                              {subItem.badge}
                                            </Badge>
                                          )}
                                        </div>
                                        <p className="text-xs text-gray-600">
                                          {subItem.description}
                                        </p>
                                      </div>
                                    </div>
                                  </Link>
                                </NavigationMenuLink>
                              ))}
                            </div>
                            <Separator className="my-4" />
                            <div className="text-center pt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="rounded-lg border-pink-200 text-pink-600 hover:bg-pink-50"
                              >
                                View All Features
                              </Button>
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <Link
                          to={item.href}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-pink-600 rounded-lg hover:bg-pink-50 transition-all duration-300"
                        >
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </motion.nav>

          {/* Right Section */}
          <motion.div
            className="hidden lg:flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-lg hover:bg-pink-50 transition-all duration-300"
            >
              <AnimatePresence mode="wait">
                {isDarkMode ? (
                  <motion.div
                    key="sun"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: -180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="h-4 w-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>

            {/* Auth Button */}
            <AuthButton openSignIn={openSignIn} />

            {/* Get Started Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="bg-pink-500 hover:bg-pink-600 text-white rounded-lg px-6 shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                Get Started Free
              </Button>
            </motion.div>
          </motion.div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-lg"
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-lg">
                  <AnimatePresence mode="wait">
                    {isMobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="h-5 w-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[300px] bg-white border-l border-gray-200"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-coral-500 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-lg text-gray-900">
                      Hirebuddy
                    </span>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 space-y-2">
                    {mobileNavItems.map((item, index) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Link
                          to={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-pink-50 transition-all duration-300 group"
                        >
                          <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center group-hover:bg-pink-200 transition-all duration-300">
                            <item.icon className="w-5 h-5 text-pink-600 transition-colors duration-300" />
                          </div>
                          <span className="font-medium text-gray-700 group-hover:text-pink-600 transition-colors">
                            {item.title}
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Mobile Footer */}
                  <div className="space-y-4 pt-6 border-t border-gray-200/50">
                    <AuthButton openSignIn={openSignIn} />
                    <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-lg">
                      Get Started Free
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
