import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  MapPin, 
  DollarSign,
  Users,
  Clock,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  Building
} from 'lucide-react';

interface TrendData {
  category: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ElementType;
  color: string;
  gradient: string;
}

interface LocationTrend {
  location: string;
  jobCount: number;
  salaryAvg: number;
  growth: number;
  hot: boolean;
}

interface SkillTrend {
  skill: string;
  demand: number;
  growth: number;
  salary: number;
  category: 'tech' | 'design' | 'business' | 'data';
}

export const JobMarketTrends = () => {
  const [activeView, setActiveView] = useState<'overview' | 'locations' | 'skills'>('overview');
  const [animationKey, setAnimationKey] = useState(0);

  const marketTrends: TrendData[] = [
    {
      category: 'Total Jobs',
      value: 15420,
      change: 12.5,
      trend: 'up',
      icon: BarChart3,
      color: 'text-primary',
      gradient: 'from-pink-400 to-primary'
    },
    {
      category: 'Remote Jobs',
      value: 8934,
      change: 23.8,
      trend: 'up',
      icon: Globe,
      color: 'text-primary',
      gradient: 'from-pink-400 to-primary'
    },
    {
      category: 'Avg Salary',
      value: 95000,
      change: 8.2,
      trend: 'up',
      icon: DollarSign,
      color: 'text-primary',
      gradient: 'from-pink-400 to-primary'
    },
    {
      category: 'New Companies',
      value: 245,
      change: -3.1,
      trend: 'down',
      icon: Building,
      color: 'text-primary',
      gradient: 'from-pink-400 to-primary'
    }
  ];

  const locationTrends: LocationTrend[] = [
    { location: 'San Francisco, CA', jobCount: 3245, salaryAvg: 145000, growth: 15.2, hot: true },
    { location: 'New York, NY', jobCount: 2876, salaryAvg: 125000, growth: 12.8, hot: true },
    { location: 'Remote', jobCount: 8934, salaryAvg: 95000, growth: 23.8, hot: true },
    { location: 'Seattle, WA', jobCount: 1654, salaryAvg: 135000, growth: 9.4, hot: false },
    { location: 'Austin, TX', jobCount: 1245, salaryAvg: 110000, growth: 18.7, hot: true },
    { location: 'Boston, MA', jobCount: 987, salaryAvg: 120000, growth: 6.3, hot: false }
  ];

  const skillTrends: SkillTrend[] = [
    { skill: 'React', demand: 95, growth: 28.5, salary: 115000, category: 'tech' },
    { skill: 'Python', demand: 88, growth: 22.3, salary: 125000, category: 'tech' },
    { skill: 'TypeScript', demand: 82, growth: 35.2, salary: 120000, category: 'tech' },
    { skill: 'AWS', demand: 79, growth: 19.8, salary: 130000, category: 'tech' },
    { skill: 'UI/UX Design', demand: 71, growth: 31.4, salary: 95000, category: 'design' },
    { skill: 'Data Science', demand: 68, growth: 25.7, salary: 140000, category: 'data' },
    { skill: 'Product Management', demand: 65, growth: 18.9, salary: 135000, category: 'business' },
    { skill: 'Node.js', demand: 62, growth: 24.1, salary: 110000, category: 'tech' }
  ];

  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [activeView]);

  const formatValue = (value: number, type: 'currency' | 'number' | 'percentage') => {
    switch (type) {
      case 'currency':
        return `$${(value / 1000).toFixed(0)}k`;
      case 'number':
        return value.toLocaleString();
      case 'percentage':
        return `${value.toFixed(1)}%`;
      default:
        return value.toString();
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      tech: 'bg-pink-100 text-primary border-pink-200',
      design: 'bg-pink-100 text-primary border-pink-200',
      business: 'bg-pink-100 text-primary border-pink-200',
      data: 'bg-pink-100 text-primary border-pink-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <Card className="w-full bg-gradient-to-br from-white via-pink-50/30 to-pink-50/20 border-0 shadow-xl backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <TrendingUp className="w-6 h-6 text-primary" />
            Job Market Trends
          </CardTitle>
          <div className="flex gap-2">
            {['overview', 'locations', 'skills'].map((view) => (
              <Button
                key={view}
                variant={activeView === view ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveView(view as 'overview' | 'locations' | 'skills')}
                className={`capitalize transition-all duration-300 ${
                  activeView === view 
                    ? 'bg-gradient-to-r from-pink-600 to-primary text-white shadow-lg' 
                    : 'bg-white/80 hover:bg-gray-50'
                }`}
              >
                {view}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <AnimatePresence mode="wait">
          {activeView === 'overview' && (
            <motion.div
              key={`overview-${animationKey}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {marketTrends.map((trend, index) => (
                  <motion.div
                    key={trend.category}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative group"
                  >
                    <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-pink-100 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${trend.gradient}`}>
                          <trend.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className={`flex items-center gap-1 text-sm ${
                          trend.trend === 'up' ? 'text-primary' : 'text-red-600'
                        }`}>
                          {trend.trend === 'up' ? (
                            <ArrowUpRight className="w-4 h-4" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4" />
                          )}
                          {Math.abs(trend.change)}%
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-2xl font-bold text-gray-900">
                          {trend.category.includes('Salary') 
                            ? formatValue(trend.value, 'currency')
                            : formatValue(trend.value, 'number')
                          }
                        </div>
                        <div className="text-sm text-gray-600">{trend.category}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Insights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="p-6 rounded-xl bg-gradient-to-r from-pink-50 to-pink-50 border border-pink-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Market Insights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Remote work opportunities increased by 23.8%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span>Tech roles dominate with 65% of all postings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span>AI/ML skills see highest salary premiums</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                    <span>Austin shows fastest job market growth</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeView === 'locations' && (
            <motion.div
              key={`locations-${animationKey}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {locationTrends.map((location, index) => (
                <motion.div
                  key={location.location}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-pink-100 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">{location.location}</span>
                          {location.hot && (
                            <Badge className="text-xs bg-pink-100 text-primary border border-pink-200">
                              <Zap className="w-3 h-3 mr-1" />
                              Hot
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          {location.jobCount.toLocaleString()} jobs available
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="text-sm text-gray-600">Avg Salary</div>
                          <div className="font-semibold text-primary">
                            ${(location.salaryAvg / 1000).toFixed(0)}k
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Growth</div>
                          <div className={`font-semibold flex items-center gap-1 ${
                            location.growth > 0 ? 'text-primary' : 'text-red-600'
                          }`}>
                            {location.growth > 0 ? (
                              <TrendingUp className="w-4 h-4" />
                            ) : (
                              <TrendingDown className="w-4 h-4" />
                            )}
                            {location.growth.toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeView === 'skills' && (
            <motion.div
              key={`skills-${animationKey}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {skillTrends.map((skill, index) => (
                <motion.div
                  key={skill.skill}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-pink-100 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-primary flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {skill.skill.charAt(0)}
                          </span>
                        </div>
                        <div className="absolute -bottom-1 -right-1">
                          <Badge className={`text-xs ${getCategoryColor(skill.category)}`}>
                            {skill.category}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{skill.skill}</div>
                        <div className="text-sm text-gray-600">
                          {skill.demand}% market demand
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Growth</div>
                        <div className="font-semibold text-primary flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          {skill.growth.toFixed(1)}%
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Avg Salary</div>
                        <div className="font-semibold text-primary">
                          ${(skill.salary / 1000).toFixed(0)}k
                        </div>
                      </div>
                      <div className="w-16">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-pink-500 to-primary h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.demand}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};