import { useQuery } from '@tanstack/react-query';

import { getNewsByIdApi } from '../api/news.api';

export const useNewsDetail = (id?: string) => {
  return useQuery({
    queryKey: ['news', 'detail', id],
    queryFn: () => getNewsByIdApi(id as string),
    enabled: Boolean(id),
    staleTime: 1000 * 30,
  });
};
