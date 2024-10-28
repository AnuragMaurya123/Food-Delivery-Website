import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import Menu from '../pages/shop/Menu';
import ProtectedRouter from './ProtectedRouter';
import UserDashboard from '../pages/dashboad/UserDashboard';
import CartItems from '../pages/shop/CartItems';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/menu' element={<ProtectedRouter><Menu /></ProtectedRouter>} /> 
      <Route path='/update-profile' element={<ProtectedRouter><UserDashboard /></ProtectedRouter>} /> 
      <Route path='/cart-items' element={<ProtectedRouter><CartItems /></ProtectedRouter>} /> 
    </Routes>
  );
};

export default Router;
