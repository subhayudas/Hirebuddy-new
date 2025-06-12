import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface DockProps {
  className?: string;
  children: React.ReactNode;
  direction?: "top" | "middle" | "bottom";
}

interface DockIconProps {
  size?: number;
  magnification?: number;
  distance?: number;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isActive?: boolean;
  isCompleted?: boolean;
  isDisabled?: boolean;
  tooltip?: string;
  badge?: string;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

export function Dock({
  className,
  children,
  direction = "bottom",
  ...props
}: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      {...props}
      className={cn(
        "mx-auto flex h-16 items-end gap-4 rounded-2xl border bg-white/10 backdrop-blur-md px-4 pb-3",
        "shadow-lg border-white/20",
        {
          "items-start": direction === "top",
          "items-center": direction === "middle",
          "items-end": direction === "bottom",
        },
        className,
      )}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...child.props,
            mouseX: mouseX,
          } as any);
        }
        return child;
      })}
    </motion.div>
  );
}

export function DockIcon({
  size = 40,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  children,
  onClick,
  isActive = false,
  isCompleted = false,
  isDisabled = false,
  tooltip,
  badge,
  ...props
}: DockIconProps & { mouseX?: any }) {
  const ref = useRef<HTMLDivElement>(null);

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [40, magnification, 40],
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const iconContent = (
    <motion.div
      ref={ref}
      style={{ width }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full relative",
        "transition-colors duration-200",
        {
          // Active state
          "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg": isActive,
          // Completed state
          "bg-gradient-to-r from-green-400 to-emerald-500 text-white": isCompleted && !isActive,
          // Default state
          "bg-gray-100 hover:bg-gray-200 text-gray-700": !isActive && !isCompleted && !isDisabled,
          // Disabled state
          "bg-gray-50 text-gray-400 cursor-not-allowed": isDisabled,
        },
        className,
      )}
      {...props}
    >
      {children}
      
      {/* Completion indicator */}
      {isCompleted && !isActive && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
      )}
      
      {/* Active indicator */}
      {isActive && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
      )}
      
      {/* Badge */}
      {badge && (
        <div className="absolute -top-2 -right-2">
          <Badge variant="secondary" className="text-xs px-1 py-0 h-5 min-w-5 flex items-center justify-center">
            {badge}
          </Badge>
        </div>
      )}
    </motion.div>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {iconContent}
          </TooltipTrigger>
          <TooltipContent side="top" className="mb-2">
            <p className="font-medium">{tooltip}</p>
            {isDisabled && <p className="text-xs text-gray-500">Section disabled</p>}
            {isCompleted && <p className="text-xs text-green-600">✓ Completed</p>}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return iconContent;
}

// Resume-specific dock component
interface ResumeSectionDockProps {
  sections: Array<{
    id: string;
    label: string;
    icon: React.ComponentType<any>;
    color: string;
  }>;
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
  completedSections: string[];
  enabledSections: Record<string, boolean>;
  className?: string;
}

export function ResumeSectionDock({
  sections,
  activeSection,
  onSectionChange,
  completedSections,
  enabledSections,
  className,
}: ResumeSectionDockProps) {
  return (
    <div className={cn("fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50", className)}>
      <Dock className="bg-white/90 backdrop-blur-xl border-gray-200/50 shadow-xl">
        {sections.map((section) => {
          const IconComponent = section.icon;
          const isEnabled = enabledSections[section.id] ?? true;
          const isCompleted = completedSections.includes(section.id);
          const isActive = activeSection === section.id;
          
          const isDisabled = !isEnabled && section.id !== 'ai'; // Never disable AI section
          
          return (
            <DockIcon
              key={section.id}
              onClick={() => isEnabled && onSectionChange(section.id)}
              isActive={isActive}
              isCompleted={isCompleted}
              isDisabled={isDisabled}
              tooltip={section.label}
              badge={isDisabled ? "!" : undefined}
            >
              <IconComponent className="w-5 h-5" />
            </DockIcon>
          );
        })}
      </Dock>
    </div>
  );
} 