import React from 'react';
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import { AuthInitializer } from '../components/common/AuthInitializer';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <AuthInitializer>
        {children}
      </AuthInitializer>
    </ErrorBoundary>
  );
};
