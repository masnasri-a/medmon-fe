'use client';

import { useQuery } from '@tanstack/react-query';
import { analyticsAPI } from '@/lib/api';

export interface AnalyticsFilters {
  start_date?: string;
  end_date?: string;
  keyword?: string;
  limit?: number;
}

export const useAnalytics = () => {
  const useSentimentData = (filters?: AnalyticsFilters) => {
    return useQuery({
      queryKey: ['sentiment', filters],
      queryFn: () => analyticsAPI.getSentiment(filters),
      select: (data) => data.data,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  const useTrendData = (filters?: AnalyticsFilters) => {
    return useQuery({
      queryKey: ['trend', filters],
      queryFn: () => analyticsAPI.getTrend(filters),
      select: (data) => data.data,
      staleTime: 5 * 60 * 1000,
    });
  };

  const useMediaData = (filters?: AnalyticsFilters) => {
    return useQuery({
      queryKey: ['media', filters],
      queryFn: () => analyticsAPI.getMedia(filters),
      select: (data) => data.data,
      staleTime: 5 * 60 * 1000,
    });
  };

  const useTrendingData = (filters?: AnalyticsFilters) => {
    return useQuery({
      queryKey: ['trending', filters],
      queryFn: () => analyticsAPI.getTrending(filters),
      select: (data) => data.data,
      staleTime: 5 * 60 * 1000,
    });
  };

  return {
    useSentimentData,
    useTrendData,
    useMediaData,
    useTrendingData,
  };
};
