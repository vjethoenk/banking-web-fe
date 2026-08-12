import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { registerApi } from '../api/auth.api';

export const useRegisterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    },

    onError: (error) => {
      console.error('Error registering user:', error);
    },
  });
};