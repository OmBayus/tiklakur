import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import { authRoutes } from './auth';
import { dashboardRoutes } from './dashboard';

// Error
const Page500 = lazy(() => import('src/pages/error/500'));
const Page403 = lazy(() => import('src/pages/error/403'));
const Page404 = lazy(() => import('src/pages/error/404'));

export function Router() {
  return useRoutes([
    // Auth
    ...authRoutes,

    // Dashboard
    ...dashboardRoutes,

    { path: '500', element: <Page500 /> },
    { path: '404', element: <Page404 /> },
    { path: '403', element: <Page403 /> },

    // No match
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
