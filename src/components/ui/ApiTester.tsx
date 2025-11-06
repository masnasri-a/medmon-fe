'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Loader2, Play } from 'lucide-react';
import { authAPI, analyticsAPI, searchAPI, usersAPI, healthAPI } from '@/lib/api';

interface TestResult {
  endpoint: string;
  status: 'pending' | 'success' | 'error';
  response?: any;
  error?: string;
}

export const ApiTester: React.FC = () => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const endpoints = [
    { name: 'Health Check', test: () => healthAPI.check() },
    { name: 'Sentiment Analytics', test: () => analyticsAPI.getSentiment() },
    { name: 'Trend Analytics', test: () => analyticsAPI.getTrend() },
    { name: 'Media Analytics', test: () => analyticsAPI.getMedia() },
    { name: 'Search', test: () => searchAPI.search({ query: 'test' }) },
    { name: 'Users', test: () => usersAPI.getAll() },
  ];

  const runAllTests = async () => {
    setIsRunning(true);
    setResults([]);

    for (const endpoint of endpoints) {
      setResults(prev => [...prev, { 
        endpoint: endpoint.name, 
        status: 'pending' 
      }]);

      try {
        const response = await endpoint.test();
        setResults(prev => prev.map(r => 
          r.endpoint === endpoint.name 
            ? { ...r, status: 'success', response: response.data }
            : r
        ));
      } catch (error: any) {
        setResults(prev => prev.map(r => 
          r.endpoint === endpoint.name 
            ? { 
                ...r, 
                status: 'error', 
                error: error.response?.data?.error || error.message 
              }
            : r
        ));
      }
    }

    setIsRunning(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Loader2 className="w-4 h-4 animate-spin text-yellow-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Testing...</Badge>;
      case 'success':
        return <Badge variant="default">Success</Badge>;
      case 'error':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">Not Tested</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>API Endpoint Tester</span>
          <Button 
            onClick={runAllTests} 
            disabled={isRunning}
            size="sm"
            variant="outline"
          >
            {isRunning ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Play className="w-4 h-4 mr-2" />
            )}
            {isRunning ? 'Testing...' : 'Run Tests'}
          </Button>
        </CardTitle>
        <CardDescription>
          Test all API endpoints to verify connectivity and responses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {results.length === 0 && !isRunning && (
            <p className="text-muted-foreground text-center py-8">
              Click "Run Tests" to test all API endpoints
            </p>
          )}
          
          {results.map((result, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                {getStatusIcon(result.status)}
                <span className="font-medium">{result.endpoint}</span>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusBadge(result.status)}
                {result.error && (
                  <span className="text-xs text-red-500 max-w-xs truncate">
                    {result.error}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
