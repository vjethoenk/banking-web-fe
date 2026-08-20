import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { AuthLayout } from './layouts/AuthLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { ProtectedRoute } from '../components/common/ProtectedRoute';
import { LoginForm } from '../features/auth';
import { RegisterForm } from '../features/auth/components/RegisterForm';
import MainLayout from '@/features/home/layout';
import { HomePage } from '@/features/home/page';
import { ForbiddenPage } from '@/components/common/ForbiddenPage';
import { NotFoundPage } from '@/components/common/NotFoundPage';
import { DashboardPage } from '@/features/dashboard/page';
import { SettingsPage } from '@/features/home/components/Settings';
import { CreateAccount } from '@/features/account/components/CreateAccount';
import DepositPage from '@/features/account/pages/DepositPage';
import TransferPage from '@/features/transfer/pages/TransferPage';

export const router = createBrowserRouter([
  // Root / Home
  {
    path: ROUTES.HOME,
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTES.ACCOUNT, element: <CreateAccount /> },
    ],
  },

  // Public routes (Auth Layout)
  {
    element: <AuthLayout />,
    children: [
      { path: ROUTES.LOGIN, element: <LoginForm /> },
      { path: ROUTES.REGISTER, element: <RegisterForm /> },
    ],
  },

  // Protected routes (Dashboard Layout)
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: ROUTES.DASHBOARD, element: <DashboardPage /> },
          { path: ROUTES.SETTINGS, element: <SettingsPage /> },
          { path: ROUTES.DEPOSIT, element: <DepositPage /> },
          { path: ROUTES.TRANSFER, element: <TransferPage /> },
        ],
      },
    ],
  },

  // Error pages
  { path: ROUTES.FORBIDDEN, element: <ForbiddenPage /> },
  { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> },
]);
