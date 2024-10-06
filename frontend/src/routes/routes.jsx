import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ProductList from '../pages/vendor/ProductList';
import OrderManagement from '../pages/OrderManagement';
import HomePage from '../pages/user/HomePage';
import ViewItemPage from '../pages/user/viewItemPage'; 
import MyCart from '../pages/user/MyCart';
import MyOrders from '../pages/user/MyOrders';
import CancelRequests from '../pages/admin/CancelRequests';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> 

        {/* administration routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/vendor/products" element={<ProductList />} />
        <Route path="/orders" element={<OrderManagement />} />
        <Route path="/cancelRequests" element={<CancelRequests />} />

        {/* customer routes */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/viewItem/:productId" element={<ViewItemPage />} />
        <Route path="/mycart" element={<MyCart />} />
        <Route path="/myorders" element={<MyOrders />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
