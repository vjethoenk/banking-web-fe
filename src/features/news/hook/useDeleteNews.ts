import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteNewsApi } from '../api/news.api';

export const useDeleteNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteNewsApi(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['news'] });
      toast.success('Xóa tin tức thành công');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Xóa tin tức thất bại');
    },
  });
};
