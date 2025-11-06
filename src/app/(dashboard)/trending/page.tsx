'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CardInsight } from '@/components/ui/CardInsight';
import { TrendChart } from '@/components/charts/TrendChart';
import { Button } from '@/components/ui/button';
import { TrendingUp, Hash, Clock, ArrowUp, ArrowDown, FireExtinguisher } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

interface TrendingTopic {
  topic: string;
  mentions: number;
  change: number;
  sentiment: string;
  timeframe: string;
  category: string;
}

export default function TrendingPage() {
  const { useTrendData, useTrendingData } = useAnalytics();
  const { data: trendData, isLoading: trendLoading, error: trendError } = useTrendData();
  const { data: trendingTopicsData, isLoading: trendingLoading, error: trendingError } = useTrendingData();

  const trendingData = [
    { date: '1', articles: 45, engagement: 62 },
    { date: '2', articles: 52, engagement: 71 },
    { date: '3', articles: 48, engagement: 65 },
    { date: '4', articles: 67, engagement: 89 },
    { date: '5', articles: 78, engagement: 105 },
    { date: '6', articles: 85, engagement: 118 },
    { date: '7', articles: 92, engagement: 132 },
  ];

  const trendingTopics = [
    { 
      topic: 'Pelantikan Pramono-Rano', 
      mentions: 2847, 
      change: 156, 
      sentiment: 'Positive',
      timeframe: '2h ago',
      category: 'Politics'
    },
    { 
      topic: 'Pilkada DKI Jakarta 2024', 
      mentions: 2134, 
      change: 89, 
      sentiment: 'Neutral',
      timeframe: '4h ago',
      category: 'Elections'
    },
    { 
      topic: 'Debat Kandidat Gubernur', 
      mentions: 1876, 
      change: 67, 
      sentiment: 'Neutral',
      timeframe: '6h ago',
      category: 'Politics'
    },
    { 
      topic: 'Program Makan Gratis', 
      mentions: 1543, 
      change: 124, 
      sentiment: 'Positive',
      timeframe: '8h ago',
      category: 'Policy'
    },
    { 
      topic: 'Transportasi Jakarta', 
      mentions: 1287, 
      change: 45, 
      sentiment: 'Mixed',
      timeframe: '12h ago',
      category: 'Infrastructure'
    },
    { 
      topic: 'Komisi Pemilihan Umum', 
      mentions: 1156, 
      change: -12, 
      sentiment: 'Neutral',
      timeframe: '1d ago',
      category: 'Government'
    },
  ];

  const emergingTopics = [
    { topic: 'Smart City Jakarta', mentions: 234, growth: 289 },
    { topic: 'Green Transportation', mentions: 189, growth: 245 },
    { topic: 'Digital Governance', mentions: 156, growth: 178 },
    { topic: 'Urban Planning', mentions: 123, growth: 156 },
  ];

  const topHashtags = [
    '#PelantikanGubernur', '#PilkadaJakarta', '#DebatPilkada', '#MakanGratis',
    '#TransportasiJakarta', '#JakartaSmart', '#GubernurBaru', '#DKIJakarta',
    '#PemimpinBaru', '#VisiMisi', '#ProgramKerja', '#JakartaMaju'
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Trending Topics</h1>
          <p className="text-muted-foreground">Real-time analysis of trending topics and discussions</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Clock className="w-4 h-4 mr-2" />
            Last 24h
          </Button>
          <Button variant="outline" size="sm">
            Refresh
          </Button>
        </div>
      </div>

      {/* Trending Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <CardInsight
          title="Hot Topics"
          value="24"
          description="Currently trending"
          trend={{ value: 18, label: 'new topics' }}
          icon={FireExtinguisher}
        />
        <CardInsight
          title="Peak Mentions"
          value="2,847"
          description="Highest mentions today"
          trend={{ value: 156, label: 'mentions/hour' }}
          icon={TrendingUp}
        />
        <CardInsight
          title="Viral Hashtags"
          value="12"
          description="Trending hashtags"
          trend={{ value: 8, label: 'new hashtags' }}
          icon={Hash}
        />
        <CardInsight
          title="Emerging Topics"
          value="4"
          description="New trending topics"
          trend={{ value: 100, label: 'growth rate' }}
          icon={ArrowUp}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrendChart 
          data={trendData || trendingData}
          title="Trending Activity"
          description="Mentions and engagement for trending topics"
        />
        
        {/* Emerging Topics */}
        <Card>
          <CardHeader>
            <CardTitle>Emerging Topics</CardTitle>
            <CardDescription>Topics with highest growth rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emergingTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-medium">{topic.topic}</div>
                    <div className="text-sm text-muted-foreground">{topic.mentions} mentions</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ArrowUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-green-600">+{topic.growth}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trending Topics Table */}
      <Card>
        <CardHeader>
          <CardTitle>Real-time Trending Topics</CardTitle>
          <CardDescription>Most discussed topics with sentiment analysis and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Topic</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Category</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Mentions</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Change</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Sentiment</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Last Update</th>
                </tr>
              </thead>
              <tbody>
                {(trendingTopicsData as TrendingTopic[] || trendingTopics).map((item: TrendingTopic, index: number) => (
                  <tr key={index} className="border-b border-border/50">
                    <td className="py-3 px-4 text-sm font-medium">{item.topic}</td>
                    <td className="py-3 px-4 text-sm">
                      <Badge variant="outline">{item.category}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">{item.mentions.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm">
                      <div className="flex items-center space-x-1">
                        {item.change > 0 ? (
                          <ArrowUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <ArrowDown className="w-4 h-4 text-red-500" />
                        )}
                        <span className={item.change > 0 ? 'text-green-600' : 'text-red-600'}>
                          {item.change > 0 ? '+' : ''}{item.change}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <Badge 
                        variant={item.sentiment === 'Positive' ? 'default' : 'secondary'}
                        className={
                          item.sentiment === 'Positive' ? 'bg-green-100 text-green-800' :
                          item.sentiment === 'Mixed' ? 'bg-yellow-100 text-yellow-800' : ''
                        }
                      >
                        {item.sentiment}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{item.timeframe}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Trending Hashtags */}
      <Card>
        <CardHeader>
          <CardTitle>Trending Hashtags</CardTitle>
          <CardDescription>Most popular hashtags in the last 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {topHashtags.map((hashtag, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {hashtag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
