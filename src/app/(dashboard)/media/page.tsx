'use client';

import React from 'react';
import { MediaBar } from '@/components/charts/MediaBar';
import { TrendChart } from '@/components/charts/TrendChart';
import { CardInsight } from '@/components/ui/CardInsight';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tv, Globe, Newspaper, Radio } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

const mediaData = [
  { name: 'Kompas', articles: 120, engagement: 85 },
  { name: 'Detik', articles: 95, engagement: 72 },
  { name: 'Tribun', articles: 88, engagement: 65 },
  { name: 'CNN', articles: 76, engagement: 58 },
  { name: 'Tempo', articles: 68, engagement: 52 },
  { name: 'Antara', articles: 45, engagement: 38 },
];

const mediaReachData = [
  { date: '1', articles: 280, engagement: 350 },
  { date: '2', articles: 320, engagement: 410 },
  { date: '3', articles: 295, engagement: 380 },
  { date: '4', articles: 340, engagement: 450 },
  { date: '5', articles: 365, engagement: 480 },
  { date: '6', articles: 385, engagement: 520 },
  { date: '7', articles: 410, engagement: 580 },
];

export default function MediaPage() {
  const { useMediaData, useTrendData } = useAnalytics();
  const { data: mediaApiData } = useMediaData();
  const { data: trendApiData } = useTrendData();

  const chartMediaData = Array.isArray(mediaApiData?.data) ? mediaApiData.data : Array.isArray(mediaApiData) ? mediaApiData : mediaData;
  const chartTrendData = Array.isArray(trendApiData?.data) ? trendApiData.data : Array.isArray(trendApiData) ? trendApiData : mediaReachData;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Media Insights</h1>
        <p className="text-muted-foreground">Analyze media performance and reach across different outlets</p>
      </div>

      {/* Media Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <CardInsight
          title="Total Media Outlets"
          value="24"
          description="Active media sources"
          trend={{ value: 12, label: 'new sources' }}
          icon={Globe}
        />
        <CardInsight
          title="Online News"
          value="18"
          description="Digital publications"
          trend={{ value: 8, label: 'increase' }}
          icon={Newspaper}
        />
        <CardInsight
          title="TV Channels"
          value="4"
          description="Television coverage"
          trend={{ value: 0, label: 'stable' }}
          icon={Tv}
        />
        <CardInsight
          title="Radio Stations"
          value="2"
          description="Radio mentions"
          trend={{ value: 50, label: 'increase' }}
          icon={Radio}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MediaBar 
          data={chartMediaData}
          title="Top Media Sources"
          description="Articles and engagement by media outlet"
        />
        <TrendChart 
          data={chartTrendData}
          title="Media Reach Trends"
          description="Total reach and engagement over time"
        />
      </div>

      {/* Media Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Media Performance Analysis</CardTitle>
          <CardDescription>Detailed performance metrics for each media outlet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Media Outlet</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Articles</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Reach</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Engagement</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Sentiment</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Trend</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Kompas.com', type: 'Online', articles: 120, reach: '2.5M', engagement: '85%', sentiment: 'Positive', trend: '+12%' },
                  { name: 'Detik.com', type: 'Online', articles: 95, reach: '1.8M', engagement: '72%', sentiment: 'Neutral', trend: '+8%' },
                  { name: 'Tribunnews.com', type: 'Online', articles: 88, reach: '1.5M', engagement: '65%', sentiment: 'Positive', trend: '+5%' },
                  { name: 'CNN Indonesia', type: 'TV/Online', articles: 76, reach: '1.2M', engagement: '58%', sentiment: 'Neutral', trend: '+15%' },
                  { name: 'Tempo.co', type: 'Online', articles: 68, reach: '900K', engagement: '52%', sentiment: 'Positive', trend: '+3%' },
                  { name: 'Antara News', type: 'Wire', articles: 45, reach: '650K', engagement: '38%', sentiment: 'Neutral', trend: '-2%' },
                ].map((media, index) => (
                  <tr key={index} className="border-b border-border/50">
                    <td className="py-3 px-4 text-sm font-medium">{media.name}</td>
                    <td className="py-3 px-4 text-sm">
                      <Badge variant="outline">{media.type}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">{media.articles}</td>
                    <td className="py-3 px-4 text-sm">{media.reach}</td>
                    <td className="py-3 px-4 text-sm">{media.engagement}</td>
                    <td className="py-3 px-4 text-sm">
                      <Badge 
                        variant={media.sentiment === 'Positive' ? 'default' : 'secondary'}
                        className={media.sentiment === 'Positive' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {media.sentiment}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span className={`${media.trend.startsWith('+') ? 'text-green-600' : media.trend.startsWith('-') ? 'text-red-600' : 'text-gray-600'}`}>
                        {media.trend}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Media Coverage Map */}
      <Card>
        <CardHeader>
          <CardTitle>Media Coverage Distribution</CardTitle>
          <CardDescription>Geographic distribution of media coverage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { region: 'Jakarta', outlets: 12, coverage: '45%' },
              { region: 'Surabaya', outlets: 4, coverage: '18%' },
              { region: 'Bandung', outlets: 3, coverage: '12%' },
              { region: 'Medan', outlets: 2, coverage: '8%' },
              { region: 'Yogyakarta', outlets: 2, coverage: '10%' },
              { region: 'Other Cities', outlets: 3, coverage: '7%' },
            ].map((region) => (
              <div key={region.region} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{region.region}</h4>
                  <Badge variant="secondary">{region.outlets} outlets</Badge>
                </div>
                <div className="text-2xl font-bold text-primary">{region.coverage}</div>
                <p className="text-sm text-muted-foreground">of total coverage</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
