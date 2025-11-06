'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ApiTester } from '@/components/ui/ApiTester';
import { useAuth } from '@/context/AuthContext';
import { 
  User, 
  Bell, 
  Shield, 
  Database, 
  Palette,
  Globe,
  Save,
  Eye,
  EyeOff,
  Settings as SettingsIcon
} from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  
  const [settings, setSettings] = useState({
    profile: {
      fullName: user?.full_name || '',
      email: user?.email || 'user@example.com',
      role: user?.role || 'client',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    notifications: {
      emailAlerts: true,
      pushNotifications: true,
      dailySummary: true,
      weeklyReport: false,
      instantAlerts: true,
      mentionAlerts: true
    },
    privacy: {
      dataRetention: '12 months',
      anonymizeData: false,
      shareAnalytics: true,
      cookieConsent: true
    },
    display: {
      theme: 'light',
      language: 'en',
      timezone: 'Asia/Jakarta',
      dateFormat: 'DD/MM/YYYY'
    }
  });

  const settingsTabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'display', label: 'Display', icon: Palette },
    ...(user?.role === 'superadmin' ? [{ id: 'api', label: 'API Testing', icon: Database }] : []),
  ];

  // Only show limited settings for client role
  const visibleTabs = user?.role === 'superadmin' 
    ? settingsTabs 
    : settingsTabs.filter(tab => ['profile', 'notifications', 'display'].includes(tab.id));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and application settings
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="w-full lg:w-64">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Settings</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {visibleTabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left text-sm font-medium rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your account information and security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <Input
                      type="text"
                      value={settings.profile.fullName}
                      onChange={(e) => setSettings({
                        ...settings,
                        profile: { ...settings.profile, fullName: e.target.value }
                      })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      value={settings.profile.email}
                      onChange={(e) => setSettings({
                        ...settings,
                        profile: { ...settings.profile, email: e.target.value }
                      })}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Role</label>
                  <div className="mt-1">
                    <Badge variant="secondary" className="capitalize">
                      {settings.profile.role}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Change Password</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium">Current Password</label>
                      <div className="relative mt-1">
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={settings.profile.currentPassword}
                          onChange={(e) => setSettings({
                            ...settings,
                            profile: { ...settings.profile, currentPassword: e.target.value }
                          })}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">New Password</label>
                      <Input
                        type="password"
                        value={settings.profile.newPassword}
                        onChange={(e) => setSettings({
                          ...settings,
                          profile: { ...settings.profile, newPassword: e.target.value }
                        })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Confirm Password</label>
                      <Input
                        type="password"
                        value={settings.profile.confirmPassword}
                        onChange={(e) => setSettings({
                          ...settings,
                          profile: { ...settings.profile, confirmPassword: e.target.value }
                        })}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Configure how you want to receive alerts and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { key: 'emailAlerts', label: 'Email Alerts', description: 'Receive alerts via email' },
                  { key: 'pushNotifications', label: 'Push Notifications', description: 'Browser push notifications' },
                  { key: 'dailySummary', label: 'Daily Summary', description: 'Daily digest of activities' },
                  { key: 'weeklyReport', label: 'Weekly Report', description: 'Weekly analytics report' },
                  { key: 'instantAlerts', label: 'Instant Alerts', description: 'Real-time critical alerts' },
                  { key: 'mentionAlerts', label: 'Mention Alerts', description: 'When your keywords are mentioned' },
                ].map((notification) => (
                  <div key={notification.key} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{notification.label}</div>
                      <div className="text-sm text-muted-foreground">{notification.description}</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications[notification.key as keyof typeof settings.notifications]}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: {
                            ...settings.notifications,
                            [notification.key]: e.target.checked
                          }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}

                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Privacy Settings */}
          {activeTab === 'privacy' && user?.role === 'superadmin' && (
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Security</CardTitle>
                <CardDescription>Control your data privacy and security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium">Data Retention Period</label>
                  <select 
                    className="mt-1 w-full border border-border rounded-md px-3 py-2"
                    value={settings.privacy.dataRetention}
                    onChange={(e) => setSettings({
                      ...settings,
                      privacy: { ...settings.privacy, dataRetention: e.target.value }
                    })}
                  >
                    <option value="3 months">3 months</option>
                    <option value="6 months">6 months</option>
                    <option value="12 months">12 months</option>
                    <option value="24 months">24 months</option>
                  </select>
                </div>

                {[
                  { key: 'anonymizeData', label: 'Anonymize Personal Data', description: 'Remove identifying information from analytics' },
                  { key: 'shareAnalytics', label: 'Share Analytics', description: 'Allow sharing anonymized analytics data' },
                  { key: 'cookieConsent', label: 'Cookie Consent', description: 'Require consent for non-essential cookies' },
                ].map((privacy) => (
                  <div key={privacy.key} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{privacy.label}</div>
                      <div className="text-sm text-muted-foreground">{privacy.description}</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.privacy[privacy.key as keyof typeof settings.privacy] as boolean}
                        onChange={(e) => setSettings({
                          ...settings,
                          privacy: {
                            ...settings.privacy,
                            [privacy.key]: e.target.checked
                          }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}

                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Display Settings */}
          {activeTab === 'display' && (
            <Card>
              <CardHeader>
                <CardTitle>Display Settings</CardTitle>
                <CardDescription>Customize the appearance and localization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Theme</label>
                    <select 
                      className="mt-1 w-full border border-border rounded-md px-3 py-2"
                      value={settings.display.theme}
                      onChange={(e) => setSettings({
                        ...settings,
                        display: { ...settings.display, theme: e.target.value }
                      })}
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Language</label>
                    <select 
                      className="mt-1 w-full border border-border rounded-md px-3 py-2"
                      value={settings.display.language}
                      onChange={(e) => setSettings({
                        ...settings,
                        display: { ...settings.display, language: e.target.value }
                      })}
                    >
                      <option value="en">English</option>
                      <option value="id">Bahasa Indonesia</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Timezone</label>
                    <select 
                      className="mt-1 w-full border border-border rounded-md px-3 py-2"
                      value={settings.display.timezone}
                      onChange={(e) => setSettings({
                        ...settings,
                        display: { ...settings.display, timezone: e.target.value }
                      })}
                    >
                      <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                      <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                      <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Date Format</label>
                    <select 
                      className="mt-1 w-full border border-border rounded-md px-3 py-2"
                      value={settings.display.dateFormat}
                      onChange={(e) => setSettings({
                        ...settings,
                        display: { ...settings.display, dateFormat: e.target.value }
                      })}
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>

                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          )}

          {/* API Testing */}
          {activeTab === 'api' && user?.role === 'superadmin' && (
            <div className="space-y-6">
              <ApiTester />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
