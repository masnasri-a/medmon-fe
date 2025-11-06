'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CardInsight } from '@/components/ui/CardInsight';
import { 
  Bell, 
  Plus, 
  Settings, 
  AlertTriangle, 
  TrendingUp, 
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

const alerts = [
  {
    id: 1,
    title: 'High Negative Sentiment Detected',
    description: 'Negative sentiment for "Transportasi Jakarta" has increased by 45% in the last 2 hours',
    type: 'sentiment',
    severity: 'high',
    timestamp: '2 hours ago',
    status: 'active',
    threshold: '40% negative sentiment',
    currentValue: '58% negative'
  },
  {
    id: 2,
    title: 'Trending Topic Alert',
    description: '"Smart City Jakarta" is trending with 289% increase in mentions',
    type: 'trending',
    severity: 'medium',
    timestamp: '4 hours ago',
    status: 'active',
    threshold: '200% increase',
    currentValue: '289% increase'
  },
  {
    id: 3,
    title: 'Mention Spike',
    description: 'Unusual spike in mentions for "Pramono Anung" detected',
    type: 'mention',
    severity: 'low',
    timestamp: '6 hours ago',
    status: 'resolved',
    threshold: '500 mentions/hour',
    currentValue: '847 mentions/hour'
  },
  {
    id: 4,
    title: 'Source Volume Alert',
    description: 'Kompas.com article volume is 3x higher than usual',
    type: 'volume',
    severity: 'medium',
    timestamp: '8 hours ago',
    status: 'active',
    threshold: '50 articles/day',
    currentValue: '156 articles/day'
  },
];

const alertRules = [
  {
    id: 1,
    name: 'High Negative Sentiment',
    trigger: 'Sentiment > 40% negative',
    entities: ['Transportasi Jakarta', 'Macet', 'Polusi'],
    status: 'active'
  },
  {
    id: 2,
    name: 'Viral Content Detection',
    trigger: 'Mentions > 1000/hour',
    entities: ['Pramono Anung', 'Rano Karno', 'DKI Jakarta'],
    status: 'active'
  },
  {
    id: 3,
    name: 'Crisis Detection',
    trigger: 'Negative sentiment > 70%',
    entities: ['Emergency', 'Banjir', 'Kecelakaan'],
    status: 'active'
  },
];

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState('alerts');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sentiment': return <MessageSquare className="w-4 h-4" />;
      case 'trending': return <TrendingUp className="w-4 h-4" />;
      case 'mention': return <Bell className="w-4 h-4" />;
      case 'volume': return <AlertTriangle className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Alerts</h1>
          <p className="text-muted-foreground">Monitor and manage real-time alerts and notifications</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Alert
          </Button>
        </div>
      </div>

      {/* Alert Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <CardInsight
          title="Active Alerts"
          value="12"
          description="Requires attention"
          trend={{ value: 8, label: 'new alerts' }}
          icon={Bell}
        />
        <CardInsight
          title="High Priority"
          value="3"
          description="Critical alerts"
          icon={AlertTriangle}
        />
        <CardInsight
          title="Resolved Today"
          value="8"
          description="Successfully handled"
          icon={CheckCircle}
        />
        <CardInsight
          title="Response Time"
          value="12m"
          description="Average response"
          icon={Clock}
        />
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4">
        <Button
          variant={activeTab === 'alerts' ? 'default' : 'outline'}
          onClick={() => setActiveTab('alerts')}
          size="sm"
        >
          Active Alerts
        </Button>
        <Button
          variant={activeTab === 'rules' ? 'default' : 'outline'}
          onClick={() => setActiveTab('rules')}
          size="sm"
        >
          Alert Rules
        </Button>
        <Button
          variant={activeTab === 'history' ? 'default' : 'outline'}
          onClick={() => setActiveTab('history')}
          size="sm"
        >
          History
        </Button>
      </div>

      {/* Active Alerts */}
      {activeTab === 'alerts' && (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <Card key={alert.id} className={`border-l-4 ${
              alert.severity === 'high' ? 'border-l-red-500' :
              alert.severity === 'medium' ? 'border-l-yellow-500' : 'border-l-blue-500'
            }`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${getSeverityColor(alert.severity)}`}>
                      {getTypeIcon(alert.type)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{alert.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {alert.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={alert.status === 'active' ? 'destructive' : 'secondary'}>
                      {alert.status}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {alert.severity}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-muted-foreground">Threshold:</span>
                    <div>{alert.threshold}</div>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Current Value:</span>
                    <div className="font-medium">{alert.currentValue}</div>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Triggered:</span>
                    <div>{alert.timestamp}</div>
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-2 mt-4">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  {alert.status === 'active' && (
                    <Button variant="outline" size="sm">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Resolve
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <XCircle className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Alert Rules */}
      {activeTab === 'rules' && (
        <Card>
          <CardHeader>
            <CardTitle>Alert Rules Configuration</CardTitle>
            <CardDescription>Manage your alert triggers and conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alertRules.map((rule) => (
                <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{rule.name}</div>
                    <div className="text-sm text-muted-foreground mt-1">{rule.trigger}</div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {rule.entities.map((entity, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {entity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={rule.status === 'active' ? 'default' : 'secondary'}>
                      {rule.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm">
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add New Rule
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Alert History */}
      {activeTab === 'history' && (
        <Card>
          <CardHeader>
            <CardTitle>Alert History</CardTitle>
            <CardDescription>Past alerts and their resolution status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={`history-${alert.id}`} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-1 rounded ${getSeverityColor(alert.severity)}`}>
                      {getTypeIcon(alert.type)}
                    </div>
                    <div>
                      <div className="font-medium">{alert.title}</div>
                      <div className="text-sm text-muted-foreground">{alert.timestamp}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={alert.status === 'resolved' ? 'secondary' : 'destructive'}>
                      {alert.status}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {alert.severity}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
