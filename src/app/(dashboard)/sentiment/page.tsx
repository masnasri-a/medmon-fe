'use client';

import React from 'react';
import { SentimentPie } from '@/components/charts/SentimentPie';
import { TrendChart } from '@/components/charts/TrendChart';
import { CardInsight } from '@/components/ui/CardInsight';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThumbsUp, ThumbsDown, Minus, TrendingUp } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

const sentimentData = [
  { name: 'Positive', value: 65, color: 'hsl(var(--chart-4))' },
  { name: 'Neutral', value: 25, color: 'hsl(var(--chart-3))' },
  { name: 'Negative', value: 10, color: 'hsl(var(--destructive))' },
];

const sentimentTrendData = [
  { date: '1', articles: 45, engagement: 52 },
  { date: '2', articles: 48, engagement: 58 },
  { date: '3', articles: 52, engagement: 61 },
  { date: '4', articles: 47, engagement: 55 },
  { date: '5', articles: 55, engagement: 68 },
  { date: '6', articles: 58, engagement: 72 },
  { date: '7', articles: 62, engagement: 75 },
];

export default function SentimentPage() {
  const { useSentimentData, useTrendData } = useAnalytics();
  const { data: sentimentApiData } = useSentimentData();
  const { data: trendApiData } = useTrendData();

  const chartSentimentData = Array.isArray(sentimentApiData?.data) ? sentimentApiData.data : Array.isArray(sentimentApiData) ? sentimentApiData : sentimentData;
  const chartTrendData = Array.isArray(trendApiData?.data) ? trendApiData.data : Array.isArray(trendApiData) ? trendApiData : sentimentTrendData;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Sentiment Analytics</h1>
        <p className="text-muted-foreground">Monitor and analyze sentiment trends across your media coverage</p>
      </div>

      {/* Sentiment Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <CardInsight
          title="Overall Sentiment Score"
          value="7.8/10"
          description="Average sentiment across all articles"
          trend={{ value: 12, label: 'from last month' }}
          icon={TrendingUp}
        />
        <CardInsight
          title="Positive Articles"
          value="1,247"
          description="65% of total coverage"
          trend={{ value: 8, label: 'increase' }}
          icon={ThumbsUp}
        />
        <CardInsight
          title="Neutral Articles"
          value="481"
          description="25% of total coverage"
          trend={{ value: -3, label: 'decrease' }}
          icon={Minus}
        />
        <CardInsight
          title="Negative Articles"
          value="192"
          description="10% of total coverage"
          trend={{ value: -15, label: 'decrease' }}
          icon={ThumbsDown}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SentimentPie 
          data={chartSentimentData}
          title="Sentiment Distribution"
          description="Current breakdown of article sentiment"
        />
        <TrendChart 
          data={chartTrendData}
          title="Sentiment Trends"
          description="Sentiment score evolution over time"
        />
      </div>

      {/* Detailed Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Sentiment Analysis by Topic</CardTitle>
          <CardDescription>Detailed sentiment breakdown across different topics and themes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { topic: 'Politics', positive: 45, neutral: 30, negative: 25 },
              { topic: 'Economy', positive: 70, neutral: 20, negative: 10 },
              { topic: 'Technology', positive: 80, neutral: 15, negative: 5 },
              { topic: 'Sports', positive: 75, neutral: 20, negative: 5 },
              { topic: 'Entertainment', positive: 85, neutral: 10, negative: 5 },
            ].map((item) => (
              <div key={item.topic} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="font-medium">{item.topic}</div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">{item.positive}%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <span className="text-sm">{item.neutral}%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm">{item.negative}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
