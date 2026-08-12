import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { AuthLayout } from './layouts/AuthLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { ProtectedRoute } from '../components/common/ProtectedRoute';
import { RoleRoute } from '../components/common/RoleRoute';

import {
  DashboardPage,
  AccountsPage,
  TransferPage,
  TransactionsPage,
  AdminUsersPage,
  AdminRolesPage,
  AdminPermissionsPage,
  ForgotPasswordPage,
  ForbiddenPage,
  NotFoundPage,
} from '../components/common/MockPages';
// import { RegisterForm } from '../features/auth';
import { LoginForm} from '../features/auth';
import { RegisterForm } from '../features/auth/components/RegisterForm';

export const router = createBrowserRouter([
  // Root Redirect
  {
    path: '/',
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },
  
  // Public routes (Auth Layout)
  {
    element: <AuthLayout />,
    children: [
      { path: ROUTES.LOGIN, element: <LoginForm /> },
      { path: ROUTES.REGISTER, element: <RegisterForm /> },
      { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPasswordPage /> },
    ],
  },
  
  // Protected routes (Protected Route + Dashboard Layout)
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: ROUTES.DASHBOARD, element: <DashboardPage /> },
          { path: ROUTES.ACCOUNTS, element: <AccountsPage /> },
          { path: ROUTES.TRANSFER, element: <TransferPage /> },
          { path: ROUTES.TRANSACTIONS, element: <TransactionsPage /> },
          
          // Admin routes (Role Restricted)
          {
            element: <RoleRoute allowedRoles={['ADMIN']} />,
            children: [
              { path: ROUTES.ADMIN_USERS, element: <AdminUsersPage /> },
              { path: ROUTES.ADMIN_ROLES, element: <AdminRolesPage /> },
              { path: ROUTES.ADMIN_PERMISSIONS, element: <AdminPermissionsPage /> },
            ],
          },
        ],
      },
    ],
  },
  
  // Forbidden error page
  { path: ROUTES.FORBIDDEN, element: <ForbiddenPage /> },
  
  // Catch-all (404)
  { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> },
]);
