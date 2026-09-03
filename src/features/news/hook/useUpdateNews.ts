import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateNewsApi } from '../api/news.api';
import type { UpdateNewsRequest } from '../types/news.types';

export const useUpdateNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateNewsRequest }) => updateNewsApi(id, data),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['news'] }),
        queryClient.invalidateQueries({ queryKey: ['news', 'detail', variables.id] }),
      ]);
      toast.success('Cập nhật tin tức thành công');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Cập nhật tin tức thất bại');
    },
  });
};
