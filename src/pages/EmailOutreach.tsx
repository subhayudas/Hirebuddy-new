import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import EmailComposer from '@/components/email/EmailComposer';
import CampaignManager from '@/components/email/CampaignManager';
import FollowUpManager from '@/components/email/FollowUpManager';
import AnalyticsDashboard from '@/components/email/AnalyticsDashboard';
import { useAuth } from '@/contexts/AuthContext';
import { useCampaigns } from '@/hooks/useCampaigns';
import { useContacts } from '@/hooks/useContacts';
import { Mail, Calendar, BarChart3, Settings, Send, Users, TrendingUp, LogOut, Plus, Sparkles } from 'lucide-react';

const EmailOutreach = () => {
  const [activeTab, setActiveTab] = useState('compose');
  const { signOut } = useAuth();
  const { campaigns } = useCampaigns();
  const { contacts } = useContacts();

  // Calculate stats from real data
  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
  const totalContacts = contacts.length;
  const activeContacts = contacts.filter(c => c.status === 'active').length;

  const stats = [
    { title: 'Active Contacts', value: activeContacts.toString(), change: '+8%', icon: Users, description: 'Ready to receive emails' },
    { title: 'Total Campaigns', value: totalCampaigns.toString(), change: '+12%', icon: Mail, description: 'Created campaigns' },
    { title: 'Active Campaigns', value: activeCampaigns.toString(), change: '+5%', icon: Send, description: 'Currently running' },
    { title: 'Response Rate', value: '12.8%', change: '+4.3%', icon: TrendingUp, description: 'Average response rate' },
  ];

  return (
    <div className="min-h-screen bg-[#fff7f8]">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(236,72,153,0.08)_1px,transparent_0)] bg-[length:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      {/* Header */}
      <header className="bg-white border-b border-pink-100 shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-mabry font-semibold text-[#403334]">Email Outreach</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={signOut} className="border-pink-200 text-[#403334] hover:bg-pink-50">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
              <Button variant="outline" size="sm" className="border-pink-200 text-[#403334] hover:bg-pink-50">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button 
                className="bg-[#d35c65] hover:bg-[#b24e55] text-white"
                onClick={() => setActiveTab('compose')}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Campaign
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-[#d35c65] rounded-3xl p-8 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
            
            <div className="relative z-10">
              <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium bg-white/20 text-white border-white/30">
                <Sparkles className="h-4 w-4 mr-2" />
                Email Automation
              </Badge>
              
              <h2 className="text-3xl md:text-4xl font-mabry font-semibold mb-4">Start Your Email Campaign</h2>
              <p className="text-white/90 text-lg mb-6 max-w-2xl font-light">
                Select your contacts, craft your message, and launch targeted cold email campaigns 
                with intelligent automation and real-time analytics.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="secondary" 
                  className="bg-white text-[#d35c65] hover:bg-pink-50 font-medium"
                  onClick={() => setActiveTab('compose')}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Create Campaign
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-[#d35c65] font-medium"
                  onClick={() => setActiveTab('campaigns')}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Campaigns
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Start Alert */}
        {totalContacts === 0 && (
          <div className="mb-8">
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-orange-900 mb-2">No contacts found</h3>
                    <p className="text-orange-800 mb-4 font-light">
                      You need to add contacts before you can send email campaigns. 
                      Go to the Admin panel to add your first contacts.
                    </p>
                    <Button 
                      variant="outline" 
                      className="border-orange-300 text-orange-700 hover:bg-orange-100"
                      onClick={() => window.location.href = '/admin'}
                    >
                      Go to Admin Panel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-200 border-pink-100 hover:border-pink-200 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[#4A3D55]">{stat.title}</p>
                      <p className="text-2xl font-bold text-[#403334]">{stat.value}</p>
                      <p className="text-xs text-[#d35c65] font-medium">{stat.change}</p>
                    </div>
                    <div className="bg-pink-100 p-3 rounded-full">
                      <Icon className="h-6 w-6 text-[#d35c65]" />
                    </div>
                  </div>
                  <p className="text-xs text-[#4A3D55] mt-2 font-light">{stat.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm border border-pink-100 rounded-xl p-1 shadow-sm">
            <TabsTrigger 
              value="compose" 
              className="flex items-center space-x-2 data-[state=active]:bg-[#d35c65] data-[state=active]:text-white rounded-lg font-medium"
            >
              <Mail className="h-4 w-4" />
              <span>Compose</span>
            </TabsTrigger>
            <TabsTrigger 
              value="campaigns" 
              className="flex items-center space-x-2 data-[state=active]:bg-[#d35c65] data-[state=active]:text-white rounded-lg font-medium"
            >
              <Send className="h-4 w-4" />
              <span>Campaigns</span>
            </TabsTrigger>
            <TabsTrigger 
              value="dashboard" 
              className="flex items-center space-x-2 data-[state=active]:bg-[#d35c65] data-[state=active]:text-white rounded-lg font-medium"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger 
              value="followups" 
              className="flex items-center space-x-2 data-[state=active]:bg-[#d35c65] data-[state=active]:text-white rounded-lg font-medium"
            >
              <Calendar className="h-4 w-4" />
              <span>Follow-ups</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="compose" className="space-y-6">
            <EmailComposer />
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <CampaignManager />
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-6">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="followups" className="space-y-6">
            <FollowUpManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmailOutreach; 