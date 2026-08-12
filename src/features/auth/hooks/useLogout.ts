import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/auth.store';
import { ROUTES } from '../../../constants/routes';

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return { handleLogout };
};
