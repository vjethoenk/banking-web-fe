import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { AuthLayout } from './layouts/AuthLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { ProtectedRoute } from '../components/common/ProtectedRoute';
import { RoleRoute } from '../components/common/RoleRoute';
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
import { NewsPage } from '@/features/news/pages/NewsPage';
import { NewsDetailPage } from '@/features/news/pages/NewsDetailPage';
import { NewsAdminPage } from '@/features/news/pages/NewsAdminPage';
import { CreateNewsPage } from '@/features/news/pages/CreateNewsPage';
import { EditNewsPage } from '@/features/news/pages/EditNewsPage';

export const router = createBrowserRouter([
  // Root / Home
  {
    path: ROUTES.HOME,
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTES.ACCOUNT, element: <CreateAccount /> },
      { path: ROUTES.NEWS, element: <NewsPage /> },
      { path: ROUTES.NEWS_DETAIL, element: <NewsDetailPage /> },
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
          {
            path: ROUTES.NEWS_ADMIN,
            element: <RoleRoute allowedRoles={['ADMIN']} />,
            children: [
              { index: true, element: <NewsAdminPage /> },
              { path: 'create', element: <CreateNewsPage /> },
              { path: 'edit/:id', element: <EditNewsPage /> },
            ],
          },
        ],
      },
    ],
  },

  // Error pages
  { path: ROUTES.FORBIDDEN, element: <ForbiddenPage /> },
  { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> },
]);
