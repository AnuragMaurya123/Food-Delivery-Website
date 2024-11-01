import { createBrowserRouter } from 'react-router-dom';
import Main from '../layout/Main';
import ProtectedRouter from './ProtectedRouter';
import Home from "../pages/home/Home"
import Menu from "../pages/shop/Menu"
import CartItems from "../pages/shop/CartItems"
import Profile from '../component/updateUser/Profile';
import DashboardLayout from '../layout/DashboardLayout';
import Dashboard from '../pages/dashboad/admin/Dashboard';
import Users from '../pages/dashboad/admin/Users';
import AdminProtectedRouter from './adminProtectedRouter';
import ManageMenu from '../pages/dashboad/admin/ManageMenu';
// Inside your router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <ProtectedRouter><Menu /></ProtectedRouter>, 
      },
      {
        path: '/update-profile',
        element: <ProtectedRouter><Profile /></ProtectedRouter>, 
      },
      {
        path: '/cart-items',
        element: <ProtectedRouter><CartItems /></ProtectedRouter>, 
      }
    ]
  },
  {
    path: 'dashboard',
    element: <AdminProtectedRouter><DashboardLayout /></AdminProtectedRouter>,
    children: [
      {
        path: '',
        element:  <AdminProtectedRouter><Dashboard /></AdminProtectedRouter>,
      },
      {
        path: 'users',
        element: <AdminProtectedRouter><Users /></AdminProtectedRouter>, 
      },
      {
        path: 'list-menu',
        element: <AdminProtectedRouter><ManageMenu/></AdminProtectedRouter>, 
      }
    ]
  }
]);

export default router;
