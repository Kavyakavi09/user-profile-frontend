import './App.css';
import {
  RouterProvider,
  Outlet,
  Navigate,
  createHashRouter,
} from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import Home from './pages/Home';
import Navbar from './components/Navbar';

import Register from './pages/Register';
import Login from './pages/Login';
import Password from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import EditProfileForm from './pages/EditProfileForm';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((state) => state?.user?.currentUser?.user);

  const Layout = () => {
    return (
      <div>
        <Navbar />
        <Outlet />
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to='/login' />;
    }

    return children;
  };

  const router = createHashRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/profile',
          element: <ProfilePage />,
        },
        {
          path: '/edit/:id',
          element: <EditProfileForm />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/forget',
      element: <Password />,
    },
    {
      path: '/reset/:token',
      element: <ResetPassword />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
