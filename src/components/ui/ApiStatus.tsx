'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, XCircle, Wifi, WifiOff } from 'lucide-react';

interface ApiStatusProps {
  isConnected: boolean;
  hasData: boolean;
  usingFallback: boolean;
}

export const ApiStatus: React.FC<ApiStatusProps> = ({ 
  isConnected, 
  hasData, 
  usingFallback 
}) => {
  const getStatusConfig = () => {
    if (!isConnected) {
      return {
        icon: XCircle,
        text: 'API Disconnected',
        variant: 'destructive' as const,
        description: 'Using offline demo data'
      };
    }
    
    if (isConnected && !hasData) {
      return {
        icon: AlertCircle,
        text: 'No Data Available',
        variant: 'secondary' as const,
        description: 'API connected, showing demo data'
      };
    }
    
    if (usingFallback) {
      return {
        icon: AlertCircle,
        text: 'Limited Data',
        variant: 'secondary' as const,
        description: 'Some data unavailable, using fallback'
      };
    }
    
    return {
      icon: CheckCircle,
      text: 'Live Data',
      variant: 'default' as const,
      description: 'Real-time data from API'
    };
  };

  const { icon: Icon, text, variant, description } = getStatusConfig();

  return (
    <div className="flex items-center space-x-2">
      <Badge variant={variant} className="flex items-center space-x-1">
        <Icon className="w-3 h-3" />
        <span className="text-xs">{text}</span>
      </Badge>
      <span className="text-xs text-muted-foreground hidden sm:inline">
        {description}
      </span>
    </div>
  );
};
