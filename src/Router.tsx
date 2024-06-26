import { createBrowserRouter, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import ErrorPage from './error-page';
import App from './App';
import { Consumption } from './Consumption';

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
    ],
  },
]);

export default Router;
