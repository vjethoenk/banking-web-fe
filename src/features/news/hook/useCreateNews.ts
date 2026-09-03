import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createNewsApi } from '../api/news.api';
import type { CreateNewsRequest } from '../types/news.types';

export const useCreateNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateNewsRequest) => createNewsApi(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['news'] });
      toast.success('Tạo tin tức thành công');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Tạo tin tức thất bại');
    },
  });
};
