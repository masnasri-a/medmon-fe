'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CardInsight } from '@/components/ui/CardInsight';
import { TrendChart } from '@/components/charts/TrendChart';
import { Hash, TrendingUp, Users, MessageSquare } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

interface Entity {
  name: string;
  category: string;
  mentions: number;
  sentiment: string;
  trend: string;
}

const entityData = [
  { date: '1', articles: 25, engagement: 32 },
  { date: '2', articles: 28, engagement: 38 },
  { date: '3', articles: 32, engagement: 41 },
  { date: '4', articles: 29, engagement: 35 },
  { date: '5', articles: 35, engagement: 45 },
  { date: '6', articles: 38, engagement: 48 },
  { date: '7', articles: 42, engagement: 52 },
];

const topEntities = [
  { name: 'Pramono Anung', category: 'Person', mentions: 1247, sentiment: 'Positive', trend: '+15%' },
  { name: 'Rano Karno', category: 'Person', mentions: 1089, sentiment: 'Positive', trend: '+12%' },
  { name: 'Jakarta', category: 'Location', mentions: 856, sentiment: 'Neutral', trend: '+8%' },
  { name: 'Pilkada', category: 'Event', mentions: 743, sentiment: 'Neutral', trend: '+25%' },
  { name: 'KPU', category: 'Organization', mentions: 621, sentiment: 'Neutral', trend: '+5%' },
  { name: 'Pemilu', category: 'Event', mentions: 534, sentiment: 'Positive', trend: '+18%' },
  { name: 'DKI Jakarta', category: 'Location', mentions: 489, sentiment: 'Neutral', trend: '+7%' },
  { name: 'Ridwan Kamil', category: 'Person', mentions: 445, sentiment: 'Positive', trend: '+22%' },
];

const topicCategories = [
  { name: 'Politics', count: 3247, percentage: 45, color: 'bg-blue-500' },
  { name: 'Government', count: 2156, percentage: 30, color: 'bg-green-500' },
  { name: 'Elections', count: 1438, percentage: 20, color: 'bg-orange-500' },
  { name: 'Public Policy', count: 359, percentage: 5, color: 'bg-purple-500' },
];

export default function EntitiesPage() {
  const { useTrendData, useTrendingData } = useAnalytics();
  const { data: trendApiData } = useTrendData();
  const { data: trendingApiData } = useTrendingData();

  const chartTrendData = Array.isArray(trendApiData?.data) ? trendApiData.data : Array.isArray(trendApiData) ? trendApiData : entityData;
  const topEntitiesData = (Array.isArray(trendingApiData?.data) ? trendingApiData.data : Array.isArray(trendingApiData) ? trendingApiData : topEntities) as Entity[];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Entities & Topics</h1>
        <p className="text-muted-foreground">Track and analyze key entities, people, and topics in media coverage</p>
      </div>

      {/* Entity Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <CardInsight
          title="Total Entities"
          value="1,247"
          description="Unique entities identified"
          trend={{ value: 18, label: 'new entities' }}
          icon={Hash}
        />
        <CardInsight
          title="People Mentioned"
          value="346"
          description="Individual persons"
          trend={{ value: 12, label: 'increase' }}
          icon={Users}
        />
        <CardInsight
          title="Organizations"
          value="89"
          description="Companies & institutions"
          trend={{ value: 8, label: 'increase' }}
          icon={TrendingUp}
        />
        <CardInsight
          title="Topic Categories"
          value="24"
          description="Main topic clusters"
          trend={{ value: 4, label: 'new topics' }}
          icon={MessageSquare}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrendChart 
          data={chartTrendData}
          title="Entity Mention Trends"
          description="Entity mentions and engagement over time"
        />
        
        {/* Topic Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Topic Categories</CardTitle>
            <CardDescription>Distribution of content across main topic areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topicCategories.map((category) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{category.count} articles</span>
                    <Badge variant="secondary">{category.percentage}%</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Entities Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Entities</CardTitle>
          <CardDescription>Most mentioned entities and their sentiment analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Entity</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Category</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Mentions</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Sentiment</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Trend</th>
                </tr>
              </thead>
              <tbody>
                {topEntitiesData.map((entity, index) => (
                  <tr key={index} className="border-b border-border/50">
                    <td className="py-3 px-4 text-sm font-medium">{entity.name}</td>
                    <td className="py-3 px-4 text-sm">
                      <Badge variant="outline">{entity.category}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">{entity.mentions.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm">
                      <Badge 
                        variant={entity.sentiment === 'Positive' ? 'default' : 'secondary'}
                        className={entity.sentiment === 'Positive' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {entity.sentiment}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span className="text-green-600">{entity.trend}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Entity Word Cloud Simulation */}
      <Card>
        <CardHeader>
          <CardTitle>Entity Popularity Cloud</CardTitle>
          <CardDescription>Visual representation of entity mention frequency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 p-4">
            {topEntitiesData.map((entity, index) => {
              const size = Math.max(12, 24 - index * 2);
              const opacity = Math.max(0.4, 1 - index * 0.1);
              return (
                <span
                  key={entity.name}
                  className="inline-block px-2 py-1 bg-primary/10 text-primary rounded-md font-medium cursor-pointer hover:bg-primary/20 transition-colors"
                  style={{ 
                    fontSize: `${size}px`,
                    opacity: opacity
                  }}
                >
                  {entity.name}
                </span>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
