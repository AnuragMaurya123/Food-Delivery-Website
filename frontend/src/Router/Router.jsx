import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home/Home';
import Main from '../layout/Main';
import Menu from '../pages/shop/Menu';
import Profile from '../component/updateUser/Profile';
import CartItems  from '../pages/shop/CartItems';
import ProtectedRouter from './ProtectedRouter';
import DashboardLayout from '../layout/DashboardLayout';
import AdminDashboard from '../pages/dashboad/admin/Dashboard';
import UserDashboard from '../pages/dashboad/user/Dashboard';

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
        element: <Menu />, 
      },
      {
        path: '/update-profile',
        element:<ProtectedRouter><Profile/></ProtectedRouter> , 
      },
      {
        path: '/cart-items',
        element:<ProtectedRouter><CartItems/></ProtectedRouter> , 
      }
    ]
  },
  {
    path: 'dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: 'admin',
        element: <AdminDashboard />,
      },
      {
        path: 'user',
        element: <UserDashboard />, 
      }
    ]
  }
])

export default router;
