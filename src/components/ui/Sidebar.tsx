'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  BarChart3,
  Hash,
  Tv,
  TrendingUp,
  Search,
  FileText,
  Bell,
  Settings,
  Users,
  UserCheck,
} from 'lucide-react';

interface MenuItem {
  title: string;
  href: string;
  icon: React.ComponentType<any>;
  roles: ('superadmin' | 'client')[];
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['superadmin', 'client'],
  },
  {
    title: 'Sentiment Analytics',
    href: '/sentiment',
    icon: BarChart3,
    roles: ['superadmin', 'client'],
  },
  {
    title: 'Entities & Topics',
    href: '/entities',
    icon: Hash,
    roles: ['superadmin', 'client'],
  },
  {
    title: 'Media Insights',
    href: '/media',
    icon: Tv,
    roles: ['superadmin', 'client'],
  },
  {
    title: 'Trending Topics',
    href: '/trending',
    icon: TrendingUp,
    roles: ['superadmin', 'client'],
  },
  {
    title: 'Search Explorer',
    href: '/explorer',
    icon: Search,
    roles: ['superadmin', 'client'],
  },
  {
    title: 'Summary',
    href: '/summary',
    icon: FileText,
    roles: ['superadmin', 'client'],
  },
  {
    title: 'Alerts',
    href: '/alerts',
    icon: Bell,
    roles: ['superadmin', 'client'],
  },
  {
    title: 'User Management',
    href: '/users',
    icon: Users,
    roles: ['superadmin'],
  },
  {
    title: 'Clients',
    href: '/clients',
    icon: UserCheck,
    roles: ['superadmin'],
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['superadmin', 'client'],
  },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  const filteredMenuItems = menuItems.filter((item) =>
    user?.role ? item.roles.includes(user.role) : false
  );

  return (
    <div className="w-64 bg-white border-r border-border h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">MediaMon</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* User info */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">
              {user?.full_name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {user?.full_name}
            </p>
            <p className="text-xs text-muted-foreground capitalize">
              {user?.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
