import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowUpRight, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MarketInsight {
  title: string;
  value: string;
  change: {
    value: string;
    isPositive: boolean;
    description: string;
  };
  category?: string;
}

interface MarketInsightsProps {
  insights: MarketInsight[];
  title?: string;
  description?: string;
}

export const MarketInsights: React.FC<MarketInsightsProps> = ({
  insights,
  title = "Market Insights",
  description = "Latest trends from your job market"
}) => {
  return (
    <Card className="overflow-hidden border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-blue-600" />
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Link to="/analytics" className="text-sm text-blue-600 flex items-center gap-1 hover:underline">
          <span>View all</span>
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {insights.map((insight, index) => (
            <div key={index} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-medium text-gray-900">{insight.title}</h3>
                {insight.category && (
                  <Badge variant="outline" className="text-xs">
                    {insight.category}
                  </Badge>
                )}
              </div>
              <div className="flex items-end justify-between">
                <div className="text-xl font-bold text-gray-900">{insight.value}</div>
                <div className={cn(
                  "text-xs flex items-center gap-1",
                  insight.change.isPositive ? "text-green-600" : "text-red-600"
                )}>
                  {insight.change.isPositive ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  <span>{insight.change.value}</span>
                  <span className="text-gray-500">{insight.change.description}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 p-3 border-t">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link to="/analytics">
              View Market Analysis
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};