import { createBrowserRouter, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import ErrorPage from './error-page';
import App from './App';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/national-energy-consumption',
        element: <div>national-map</div>,
      },
    ],
  },
]);

export default Router;
