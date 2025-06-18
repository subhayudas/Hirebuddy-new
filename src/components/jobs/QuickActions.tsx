import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { 
  Filter,
  Bookmark,
  Send,
  TrendingUp,
  Target,
  Sparkles,
  Menu,
  Search,
  MapPin,
  Briefcase
} from "lucide-react";

interface QuickActionsProps {
  savedJobsCount: number;
  appliedJobsCount: number;
  activeFilterCount: number;
  onShowFilters: () => void;
  onShowSaved: () => void;
  onShowApplied: () => void;
  onShowRecommendations: () => void;
}

export const QuickActions = ({
  savedJobsCount,
  appliedJobsCount,
  activeFilterCount,
  onShowFilters,
  onShowSaved,
  onShowApplied,
  onShowRecommendations
}: QuickActionsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const quickActionItems = [
    {
      icon: Filter,
      label: "Filters",
      count: activeFilterCount,
      color: "bg-blue-500",
      onClick: () => {
        onShowFilters();
        setIsOpen(false);
      }
    },
    {
      icon: Bookmark,
      label: "Saved Jobs",
      count: savedJobsCount,
      color: "bg-purple-500",
      onClick: () => {
        onShowSaved();
        setIsOpen(false);
      }
    },
    {
      icon: Send,
      label: "Applied",
      count: appliedJobsCount,
      color: "bg-green-500",
      onClick: () => {
        onShowApplied();
        setIsOpen(false);
      }
    },
    {
      icon: Sparkles,
      label: "AI Recommendations",
      count: 0,
      color: "bg-orange-500",
      onClick: () => {
        onShowRecommendations();
        setIsOpen(false);
      }
    }
  ];

  return (
    <>
      {/* Mobile Quick Actions Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </motion.div>
          </SheetTrigger>
          
          <SheetContent side="bottom" className="h-auto">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Quick Actions
              </SheetTitle>
            </SheetHeader>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              {quickActionItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Button
                    variant="outline"
                    className="w-full h-20 flex flex-col items-center justify-center gap-2 border-2 hover:border-blue-300 hover:bg-blue-50"
                    onClick={item.onClick}
                  >
                    <div className={`w-8 h-8 ${item.color} rounded-full flex items-center justify-center relative`}>
                      <item.icon className="w-4 h-4 text-white" />
                      {item.count > 0 && (
                        <Badge
                          variant="destructive"
                          className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs"
                        >
                          {item.count}
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
            
            {/* Quick Search */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Search className="w-4 h-4" />
                Quick Search
              </h4>
              <div className="flex flex-wrap gap-2">
                {["Remote", "React", "Senior", "Frontend", "Full-time"].map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-blue-50 hover:border-blue-300"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Quick Stats Bar */}
      <div className="hidden md:flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center gap-6">
          {quickActionItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 hover:bg-blue-50"
              onClick={item.onClick}
            >
              <div className={`w-6 h-6 ${item.color} rounded-full flex items-center justify-center relative`}>
                <item.icon className="w-3 h-3 text-white" />
                {item.count > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center text-xs"
                  >
                    {item.count}
                  </Badge>
                )}
              </div>
              <span className="text-sm">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}; 