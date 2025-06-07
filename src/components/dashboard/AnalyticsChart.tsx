import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

interface AnalyticsChartProps {
  title: string;
  icon: React.ReactNode;
  link?: {
    text: string;
    to: string;
  };
  children: React.ReactNode;
}

export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ 
  title, 
  icon, 
  link, 
  children 
}) => {
  return (
    <Card className="overflow-hidden border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        {link && (
          <Link 
            to={link.to} 
            className="text-sm text-blue-600 flex items-center gap-1 hover:underline"
          >
            <span>{link.text}</span>
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        )}
      </CardHeader>
      <CardContent className="p-0">
        {children}
      </CardContent>
    </Card>
  );
};

// Bar Chart Visualization
interface BarChartProps {
  data: Array<{
    label: string;
    value: number;
    color?: string;
  }>;
  maxValue?: number;
  height?: number;
}

export const BarChart: React.FC<BarChartProps> = ({ 
  data, 
  maxValue = 100, 
  height = 180 
}) => {
  return (
    <div 
      className="bg-slate-50 p-4 flex items-end justify-between gap-2"
      style={{ height }}
    >
      {data.map((item, index) => {
        const heightPercent = (item.value / maxValue) * 100;
        return (
          <div key={index} className="flex flex-col items-center gap-1 flex-1">
            <div 
              className={`w-full rounded-t ${item.color || 'bg-blue-500'}`} 
              style={{ height: `${heightPercent}%` }}
            ></div>
            <span className="text-xs text-gray-500 mt-1">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
};

// Line Chart Visualization
interface LineChartProps {
  data: Array<{
    value: number;
  }>;
  height?: number;
  color?: string;
}

export const LineChart: React.FC<LineChartProps> = ({ 
  data, 
  height = 180,
  color = "#16a34a"
}) => {
  // Generate SVG path from data points
  const generatePath = () => {
    if (data.length === 0) return "";
    
    const maxValue = Math.max(...data.map(d => d.value));
    const points = data.map((d, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((d.value / maxValue) * 100);
      return `${x},${y}`;
    });
    
    return `M${points.join(' L')}`;
  };

  return (
    <div 
      className="bg-slate-50 p-4 flex items-center justify-center"
      style={{ height }}
    >
      <div className="w-full h-[80%] relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gray-200"></div>
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300"></div>
        
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d={generatePath()}
            fill="none"
            stroke={color}
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
};

// Pie Chart Visualization
interface PieChartProps {
  data: Array<{
    value: number;
    color: string;
    label: string;
  }>;
  height?: number;
}

export const PieChart: React.FC<PieChartProps> = ({ 
  data, 
  height = 180 
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Calculate segments
  let cumulativePercent = 0;
  const segments = data.map((item, index) => {
    const percent = (item.value / total) * 100;
    const startPercent = cumulativePercent;
    cumulativePercent += percent;
    
    return {
      ...item,
      percent,
      startPercent,
      endPercent: cumulativePercent,
      startAngle: (startPercent / 100) * 360,
      endAngle: (cumulativePercent / 100) * 360,
    };
  });

  return (
    <div 
      className="bg-slate-50 p-4 flex flex-col items-center justify-center"
      style={{ height }}
    >
      <div className="relative h-32 w-32 mb-2">
        <svg viewBox="0 0 100 100">
          {segments.map((segment, index) => {
            // Convert percentages to radians
            const startAngle = (segment.startPercent / 100) * Math.PI * 2 - Math.PI / 2;
            const endAngle = (segment.endPercent / 100) * Math.PI * 2 - Math.PI / 2;
            
            // Calculate path
            const x1 = 50 + 50 * Math.cos(startAngle);
            const y1 = 50 + 50 * Math.sin(startAngle);
            const x2 = 50 + 50 * Math.cos(endAngle);
            const y2 = 50 + 50 * Math.sin(endAngle);
            
            // Determine if the arc should be drawn the long way around
            const largeArcFlag = segment.percent > 50 ? 1 : 0;
            
            const pathData = [
              `M 50 50`,
              `L ${x1} ${y1}`,
              `A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              `Z`
            ].join(' ');
            
            return (
              <path
                key={index}
                d={pathData}
                fill={segment.color}
              />
            );
          })}
          <circle cx="50" cy="50" r="25" fill="white" />
        </svg>
      </div>
      
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center text-xs">
            <div 
              className="h-2 w-2 rounded-full mr-1"
              style={{ backgroundColor: segment.color }}
            ></div>
            <span>{segment.label} ({Math.round(segment.percent)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};