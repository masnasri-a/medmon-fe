'use client';

import React, { useState, useEffect } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { CardInsight } from '@/components/ui/CardInsight';
import { ErrorFallback } from '@/components/ui/ErrorFallback';
import { ApiStatus } from '@/components/ui/ApiStatus';
import { TrendChart } from '@/components/charts/TrendChart';
import { SentimentPie } from '@/components/charts/SentimentPie';
import { MediaBar } from '@/components/charts/MediaBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Heart,
  Share2,
  Activity,
  Filter,
  Calendar,
  Eye,
  Loader2,
  AlertCircle
} from 'lucide-react';

// Mock data sesuai dengan gambar yang diberikan
const mockStats = {
  totalViews: '1,992,349,718',
  totalViewsChange: 23,
  storyEngagement: '124K',
  storyEngagementChange: 0,
  postEngagement: '1,209M',
  postEngagementChange: 23,
  avgLikesPerPost: '89,902K',
  avgLikesPerPostChange: 0,
  avgSharesPerPost: '3,221K',
  avgSharesPerPostChange: -23,
  avgPostsSaved: '902',
  avgPostsSavedChange: 23,
  avgDailyFollowers: '75,418K',
  avgDailyFollowersChange: -23,
};

// Mock chart data for fallback
const mockSentimentData = [
  { name: 'Positive', value: 65, count: 1850 },
  { name: 'Neutral', value: 25, count: 750 },
  { name: 'Negative', value: 10, count: 280 },
];

const mockTrendData = [
  { date: '1', positive: 65, negative: 10, neutral: 25 },
  { date: '2', positive: 70, negative: 8, neutral: 22 },
  { date: '3', positive: 68, negative: 12, neutral: 20 },
  { date: '4', positive: 72, negative: 9, neutral: 19 },
  { date: '5', positive: 69, negative: 11, neutral: 20 },
  { date: '6', positive: 74, negative: 8, neutral: 18 },
  { date: '7', positive: 71, negative: 10, neutral: 19 },
];

const mockMediaData = [
  { name: 'Kompas', articles: 120, engagement: 85 },
  { name: 'Detik', articles: 95, engagement: 72 },
  { name: 'Tribun', articles: 88, engagement: 65 },
  { name: 'CNN', articles: 76, engagement: 58 },
  { name: 'Tempo', articles: 68, engagement: 52 },
];

const trendData = [
  { date: '14', articles: 1, engagement: 2 },
  { date: '1', articles: 3, engagement: 4 },
  { date: '2', articles: 8, engagement: 6 },
  { date: '3', articles: 12, engagement: 8 },
  { date: '4', articles: 15, engagement: 12 },
  { date: '5', articles: 13, engagement: 10 },
  { date: '6', articles: 18, engagement: 14 },
  { date: '7', articles: 22, engagement: 18 },
  { date: '8', articles: 24, engagement: 20 },
  { date: '9', articles: 15, engagement: 12 },
  { date: '10', articles: 18, engagement: 16 },
  { date: '11', articles: 25, engagement: 22 },
  { date: '12', articles: 28, engagement: 24 },
  { date: '13', articles: 20, engagement: 18 },
];

const todayActivity = [
  { time: '00:00', value: 20 },
  { time: '02:00', value: 35 },
  { time: '04:00', value: 45 },
  { time: '06:00', value: 60 },
  { time: '08:00', value: 85 },
  { time: '10:00', value: 95 },
  { time: '12:00', value: 100 },
  { time: '14:00', value: 90 },
  { time: '16:00', value: 75 },
  { time: '18:00', value: 65 },
  { time: '20:00', value: 55 },
  { time: '22:00', value: 40 },
];

const activityData = [
  { id: 118, username: 'Azie Melasari', activity: 'Liked your post uploads', date: '2024-09-13 23:16:43', location: 'Surakarta, Indonesia', device: 'Desktop', source: 'Instagram' },
];

export default function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState('Overview');
  const { useSentimentData, useTrendData, useMediaData } = useAnalytics();
  
  // Set up date filters for the last 30 days
  const endDate = new Date().toISOString().split('T')[0];
  const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  const filters = { start_date: startDate, end_date: endDate };
  
  // Fetch data using hooks
  const { data: sentimentData, isLoading: sentimentLoading, error: sentimentError } = useSentimentData(filters);
  const { data: trendData, isLoading: trendLoading, error: trendError } = useTrendData(filters);
  const { data: mediaData, isLoading: mediaLoading, error: mediaError } = useMediaData(filters);
  
  const isLoading = sentimentLoading || trendLoading || mediaLoading;
  const hasError = sentimentError || trendError || mediaError;

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading dashboard data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (hasError) {
    // Use mock data as fallback when API fails
    console.warn('API failed, using mock data:', { sentimentError, trendError, mediaError });
  }

  // Use API data if available, otherwise fallback to mock data
  const chartSentimentData = Array.isArray(sentimentData?.data) ? sentimentData.data : Array.isArray(sentimentData) ? sentimentData : mockSentimentData;
  const chartTrendData = Array.isArray(trendData?.data) ? trendData.data : Array.isArray(trendData) ? trendData : mockTrendData;
  const chartMediaData = mediaData?.data || mockMediaData;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Media monitoring insights and analytics</p>
          {hasError && (
            <div className="mt-2">
              <Badge variant="outline" className="text-amber-600 border-amber-600">
                <AlertCircle className="w-3 h-3 mr-1" />
                Using Demo Data - API Connection Failed
              </Badge>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <ApiStatus 
            isConnected={!hasError}
            hasData={!!(sentimentData || trendData || mediaData)}
            usingFallback={!!hasError}
          />
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Aug 16, 2024 - Sep 16, 2024
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-6 border-b border-border">
        {['Overview', 'Profiles', 'Likes', 'Posts'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              selectedTab === tab
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CardInsight
          title="Total Reach"
          value={mockStats.totalViews}
          description="Year! your sales have surged by $723.12 from last month"
          trend={{ value: mockStats.totalViewsChange, label: 'from last month' }}
          icon={Eye}
        />
        <CardInsight
          title="Story Engagement"
          value={mockStats.storyEngagement}
          trend={{ value: mockStats.storyEngagementChange, label: 'from last period' }}
          icon={BarChart3}
        />
        <CardInsight
          title="Post Engagement"
          value={mockStats.postEngagement}
          trend={{ value: mockStats.postEngagementChange, label: 'from last period' }}
          icon={MessageSquare}
        />
        <CardInsight
          title="Average Likes per Post"
          value={mockStats.avgLikesPerPost}
          trend={{ value: mockStats.avgLikesPerPostChange, label: 'from last period' }}
          icon={Heart}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CardInsight
          title="Average Share per Post"
          value={mockStats.avgSharesPerPost}
          trend={{ value: mockStats.avgSharesPerPostChange, label: 'from last period' }}
          icon={Share2}
        />
        <CardInsight
          title="Average Posts Saved"
          value={mockStats.avgPostsSaved}
          trend={{ value: mockStats.avgPostsSavedChange, label: 'from last period' }}
          icon={TrendingUp}
        />
        <CardInsight
          title="Average Daily Followers"
          value={mockStats.avgDailyFollowers}
          trend={{ value: mockStats.avgDailyFollowersChange, label: 'from last period' }}
          icon={Users}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Audience Growth */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Audience Growth</CardTitle>
              <CardDescription>Observe the growth of your audience throughout the reporting period</CardDescription>
            </div>
            <Button variant="outline" size="sm">Daily</Button>
          </CardHeader>
          <CardContent>
            <TrendChart 
              data={chartTrendData} 
              title=""
              description=""
            />
          </CardContent>
        </Card>

        {/* Sentiment Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Analysis</CardTitle>
            <CardDescription>Distribution of sentiment across media mentions</CardDescription>
          </CardHeader>
          <CardContent>
            <SentimentPie 
              data={chartSentimentData}
              title=""
              description=""
            />
          </CardContent>
        </Card>
      </div>

      {/* Media Performance */}
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Media Sources</CardTitle>
            <CardDescription>Performance metrics by media outlet</CardDescription>
          </CardHeader>
          <CardContent>
            <MediaBar 
              data={chartMediaData}
              title=""
              description=""
            />
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Audience Growth */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Audience Growth</CardTitle>
              <CardDescription>Observe the growth of your audience throughout the reporting period</CardDescription>
            </div>
            <Button variant="outline" size="sm">Daily</Button>
          </CardHeader>
          <CardContent>
            <TrendChart 
              data={chartTrendData} 
              title=""
              description=""
            />
          </CardContent>
        </Card>

        {/* Today Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Today Activity</CardTitle>
              <CardDescription>Analyse details to understand your account activity level today</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              <Activity className="w-4 h-4 mr-2" />
              See Analytic
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Aug 16, 2024</span>
                <span className="text-sm text-muted-foreground">288 K</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Overall story view</span>
                  <span className="text-sm">288 K</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Overall post likes</span>
                  <span className="text-sm">812 K</span>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-4">Average visitors today</h4>
                <div className="text-2xl font-bold mb-2">8,211</div>
                <div className="text-sm text-muted-foreground mb-3">1,373,916 visitor today</div>
                <Progress value={75} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest user interactions and engagement</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">All</Button>
              <Button variant="ghost" size="sm">⌘ F</Button>
              <Button variant="ghost" size="sm">+ Create</Button>
              <Button variant="ghost" size="sm">≡</Button>
              <Button variant="ghost" size="sm">⟷</Button>
              <span className="text-sm text-muted-foreground">0 Selected</span>
              <Button variant="ghost" size="sm">☐</Button>
              <Button variant="ghost" size="sm">📋</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Username</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Activity</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">User Location</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Device</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Source</th>
                </tr>
              </thead>
              <tbody>
                {activityData.map((row) => (
                  <tr key={row.id} className="border-b border-border/50">
                    <td className="py-3 px-4 text-sm">{row.id}</td>
                    <td className="py-3 px-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                          <span className="text-xs">{row.username.charAt(0)}</span>
                        </div>
                        <span>{row.username}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">{row.activity}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{row.date}</td>
                    <td className="py-3 px-4 text-sm">{row.location}</td>
                    <td className="py-3 px-4 text-sm">{row.device}</td>
                    <td className="py-3 px-4 text-sm">
                      <Badge variant="secondary">{row.source}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
