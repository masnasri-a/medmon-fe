'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CardInsight } from '@/components/ui/CardInsight';
import { TrendChart } from '@/components/charts/TrendChart';
import { 
  Search, 
  Filter, 
  Calendar, 
  Download, 
  BookOpen, 
  Eye, 
  MessageSquare,
  ExternalLink 
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { searchAPI } from '@/lib/api';

interface SearchResult {
  id: number;
  title: string;
  source: string;
  date: string;
  sentiment: string;
  engagement: number;
  excerpt: string;
  url: string;
  category: string;
}

const searchTrendData = [
  { date: '1', articles: 15, engagement: 22 },
  { date: '2', articles: 18, engagement: 28 },
  { date: '3', articles: 22, engagement: 35 },
  { date: '4', articles: 28, engagement: 42 },
  { date: '5', articles: 25, engagement: 38 },
  { date: '6', articles: 32, engagement: 48 },
  { date: '7', articles: 35, engagement: 52 },
];

export default function ExplorerPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    dateRange: '7d',
    sentiment: 'all',
    source: 'all',
    category: 'all'
  });

  const { data: searchResults, isLoading, error } = useQuery({
    queryKey: ['search', searchQuery, selectedFilters],
    queryFn: () => searchAPI.search({
      query: searchQuery || undefined,
      start_date: selectedFilters.dateRange === '7d' ? '2024-10-30' : selectedFilters.dateRange === '30d' ? '2024-10-07' : undefined,
      end_date: '2024-11-06',
      sentiment: selectedFilters.sentiment !== 'all' ? selectedFilters.sentiment as 'positif' | 'negatif' | 'netral' : undefined,
      sources: selectedFilters.source !== 'all' ? selectedFilters.source : undefined,
      page_size: 20
    }),
    enabled: !!searchQuery || Object.values(selectedFilters).some(v => v !== 'all' && v !== '7d'),
    select: (data) => (data.data || []) as SearchResult[]
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Search Explorer</h1>
        <p className="text-muted-foreground">Advanced search and analysis of media content</p>
      </div>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Search</CardTitle>
          <CardDescription>Search through millions of articles with advanced filters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search articles, topics, entities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-base"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <select 
                  className="border border-border rounded-md px-3 py-1 text-sm"
                  value={selectedFilters.dateRange}
                  onChange={(e) => setSelectedFilters({...selectedFilters, dateRange: e.target.value})}
                >
                  <option value="1d">Last 24 hours</option>
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 3 months</option>
                </select>
              </div>

              <select 
                className="border border-border rounded-md px-3 py-1 text-sm"
                value={selectedFilters.sentiment}
                onChange={(e) => setSelectedFilters({...selectedFilters, sentiment: e.target.value})}
              >
                <option value="all">All Sentiment</option>
                <option value="positive">Positive</option>
                <option value="neutral">Neutral</option>
                <option value="negative">Negative</option>
              </select>

              <select 
                className="border border-border rounded-md px-3 py-1 text-sm"
                value={selectedFilters.source}
                onChange={(e) => setSelectedFilters({...selectedFilters, source: e.target.value})}
              >
                <option value="all">All Sources</option>
                <option value="kompas">Kompas.com</option>
                <option value="detik">Detik.com</option>
                <option value="cnn">CNN Indonesia</option>
                <option value="tempo">Tempo.co</option>
              </select>

              <select 
                className="border border-border rounded-md px-3 py-1 text-sm"
                value={selectedFilters.category}
                onChange={(e) => setSelectedFilters({...selectedFilters, category: e.target.value})}
              >
                <option value="all">All Categories</option>
                <option value="politics">Politics</option>
                <option value="policy">Policy</option>
                <option value="technology">Technology</option>
                <option value="infrastructure">Infrastructure</option>
              </select>

              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>

              <Button size="sm">
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <CardInsight
          title="Search Results"
          value="2,847"
          description="Articles found"
          icon={BookOpen}
        />
        <CardInsight
          title="Total Views"
          value="1.2M"
          description="Combined article views"
          icon={Eye}
        />
        <CardInsight
          title="Avg Engagement"
          value="847"
          description="Per article"
          icon={MessageSquare}
        />
        <CardInsight
          title="Time Range"
          value="7 days"
          description="Search period"
          icon={Calendar}
        />
      </div>

      {/* Search Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrendChart 
          data={searchTrendData}
          title="Search Results Trend"
          description="Article count and engagement over selected period"
        />
        
        {/* Quick Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Search Insights</CardTitle>
            <CardDescription>Key insights from your search results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="font-medium text-green-800">Positive Sentiment Dominance</div>
                <div className="text-sm text-green-600">68% of articles show positive sentiment</div>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="font-medium text-blue-800">Peak Coverage Period</div>
                <div className="text-sm text-blue-600">Highest activity on Nov 5, 2024</div>
              </div>
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="font-medium text-orange-800">Top Source</div>
                <div className="text-sm text-orange-600">Kompas.com leads with 35% coverage</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Results */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>Articles matching your search criteria</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              Save Search
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {(searchResults || []).map((result: SearchResult) => (
              <div key={result.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-1 hover:text-primary cursor-pointer">
                      {result.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                      <span>{result.source}</span>
                      <span>{result.date}</span>
                      <Badge variant="outline">{result.category}</Badge>
                      <Badge 
                        variant={result.sentiment === 'Positive' ? 'default' : 'secondary'}
                        className={result.sentiment === 'Positive' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {result.sentiment}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {result.excerpt}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{result.engagement} interactions</span>
                  <span>Relevance: 95%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <span className="text-sm text-muted-foreground">
              Showing 1-4 of 2,847 results
            </span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <span className="text-sm text-muted-foreground">...</span>
              <Button variant="outline" size="sm">712</Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
