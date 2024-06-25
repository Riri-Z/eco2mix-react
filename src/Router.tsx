import { createBrowserRouter, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ErrorPage from './error-page';
import App from './App';
import { Consumption } from './pages/Consumption';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
        element: <Consumption />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },

    ],
  },
]);

export default Router;
