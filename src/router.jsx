import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import DevDashboard from './pages/DevDashboard';
import ClientDashboard from './pages/ClientDashboard';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: 'desarrollador',
        element: (
          <ProtectedRoute allowedRoles={["desarrollador"]}>
            <DevDashboard />
          </ProtectedRoute>
        )
      },
      {
        path: 'cliente',
        element: (
          <ProtectedRoute allowedRoles={["cliente"]}>
            <ClientDashboard />
          </ProtectedRoute>
        )
      }
    ]
  }
]);