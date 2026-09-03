import { useQuery } from '@tanstack/react-query';
import { getNewsApi } from '../api/news.api';
import type { NewsQueryParams } from '../types/news.types';

export const useNews = (params: NewsQueryParams = {}) => {
  return useQuery({
    queryKey: ['news', params],
    queryFn: () => getNewsApi(params),
    staleTime: 1000 * 30,
  });
};
