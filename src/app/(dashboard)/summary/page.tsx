'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardInsight } from '@/components/ui/CardInsight';
import { 
  FileText, 
  Calendar, 
  TrendingUp, 
  Users, 
  Download,
  RefreshCw,
  Bot
} from 'lucide-react';

const dailySummary = {
  date: '2024-11-06',
  totalArticles: 43,
  positivePercentage: 68,
  dominantTopic: 'Pelantikan Pramono–Rano',
  keyInsight: 'Hari ini 43 berita baru. 68% positif, topik dominan: pelantikan Pramono–Rano.',
  topMentions: ['Pramono Anung', 'Rano Karno', 'DKI Jakarta', 'Gubernur'],
  sentiment: {
    positive: 68,
    neutral: 25,
    negative: 7
  }
};

const weeklySummary = {
  period: 'Nov 1-6, 2024',
  totalArticles: 287,
  avgDailyArticles: 41,
  topStory: 'Pelantikan Gubernur DKI Jakarta',
  trendingUp: ['Smart City', 'Transportasi', 'Makan Gratis'],
  trendingDown: ['Macet', 'Polusi', 'Banjir']
};

const monthlySummary = {
  period: 'October 2024',
  totalArticles: 1247,
  majorEvents: [
    'Kampanye Pilkada DKI',
    'Debat Kandidat Gubernur',
    'Pemungutan Suara',
    'Penghitungan Suara'
  ],
  sentiment: {
    positive: 55,
    neutral: 35,
    negative: 10
  }
};

export default function SummaryPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('daily');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Summary</h1>
          <p className="text-muted-foreground">AI-powered insights and automated summaries</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex space-x-2">
        {['daily', 'weekly', 'monthly'].map((period) => (
          <Button
            key={period}
            variant={selectedPeriod === period ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod(period)}
            className="capitalize"
          >
            {period}
          </Button>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <CardInsight
          title="Articles Analyzed"
          value={selectedPeriod === 'daily' ? '43' : selectedPeriod === 'weekly' ? '287' : '1,247'}
          description={selectedPeriod === 'daily' ? 'Today' : selectedPeriod === 'weekly' ? 'This week' : 'This month'}
          icon={FileText}
        />
        <CardInsight
          title="Positive Sentiment"
          value={selectedPeriod === 'daily' ? '68%' : selectedPeriod === 'weekly' ? '62%' : '55%'}
          description="Overall sentiment"
          trend={{ value: 12, label: 'increase' }}
          icon={TrendingUp}
        />
        <CardInsight
          title="Key Entities"
          value={selectedPeriod === 'daily' ? '23' : selectedPeriod === 'weekly' ? '156' : '534'}
          description="Mentioned entities"
          icon={Users}
        />
        <CardInsight
          title="Coverage Period"
          value={selectedPeriod === 'daily' ? '24h' : selectedPeriod === 'weekly' ? '7d' : '30d'}
          description="Analysis timeframe"
          icon={Calendar}
        />
      </div>

      {/* AI-Generated Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-primary" />
            <CardTitle>AI-Generated Summary</CardTitle>
          </div>
          <CardDescription>
            Automated insights generated from {selectedPeriod} media analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-start space-x-2">
                <Bot className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-medium text-foreground mb-2">Key Insight</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedPeriod === 'daily' && dailySummary.keyInsight}
                    {selectedPeriod === 'weekly' && `Minggu ini terdapat ${weeklySummary.totalArticles} artikel dengan rata-rata ${weeklySummary.avgDailyArticles} artikel per hari. Berita utama: ${weeklySummary.topStory}. Topik yang sedang naik: ${weeklySummary.trendingUp.join(', ')}.`}
                    {selectedPeriod === 'monthly' && `Bulan Oktober 2024 tercatat ${monthlySummary.totalArticles} artikel dengan fokus utama pada ${monthlySummary.majorEvents.join(', ')}. Sentimen positif mendominasi dengan ${monthlySummary.sentiment.positive}%.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Summaries */}
      {selectedPeriod === 'daily' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Highlights */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Highlights</CardTitle>
              <CardDescription>{dailySummary.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Top Mentions</h4>
                  <div className="flex flex-wrap gap-2">
                    {dailySummary.topMentions.map((mention, index) => (
                      <Badge key={index} variant="secondary">{mention}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Dominant Topic</h4>
                  <Badge variant="default">{dailySummary.dominantTopic}</Badge>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Sentiment Breakdown</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Positive</span>
                      <span className="text-sm font-medium">{dailySummary.sentiment.positive}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Neutral</span>
                      <span className="text-sm font-medium">{dailySummary.sentiment.neutral}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Negative</span>
                      <span className="text-sm font-medium">{dailySummary.sentiment.negative}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest developments and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { time: '2 hours ago', event: 'Spike in mentions of "Smart City"', type: 'trending' },
                  { time: '4 hours ago', event: 'New article from Kompas.com', type: 'article' },
                  { time: '6 hours ago', event: 'Positive sentiment increase', type: 'sentiment' },
                  { time: '8 hours ago', event: 'Peak engagement period', type: 'engagement' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border-l-2 border-primary/20 pl-4">
                    <div>
                      <div className="text-sm font-medium">{activity.event}</div>
                      <div className="text-xs text-muted-foreground">{activity.time}</div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedPeriod === 'weekly' && (
        <Card>
          <CardHeader>
            <CardTitle>Weekly Overview</CardTitle>
            <CardDescription>{weeklySummary.period}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Trending Up</h4>
                <div className="space-y-2">
                  {weeklySummary.trendingUp.map((topic, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3">Trending Down</h4>
                <div className="space-y-2">
                  {weeklySummary.trendingDown.map((topic, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
                      <span className="text-sm">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedPeriod === 'monthly' && (
        <Card>
          <CardHeader>
            <CardTitle>Monthly Report</CardTitle>
            <CardDescription>{monthlySummary.period}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">Major Events</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {monthlySummary.majorEvents.map((event, index) => (
                    <Badge key={index} variant="outline" className="justify-start">
                      {event}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3">Overall Sentiment</h4>
                <div className="flex space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{monthlySummary.sentiment.positive}%</div>
                    <div className="text-sm text-muted-foreground">Positive</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-600">{monthlySummary.sentiment.neutral}%</div>
                    <div className="text-sm text-muted-foreground">Neutral</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{monthlySummary.sentiment.negative}%</div>
                    <div className="text-sm text-muted-foreground">Negative</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
