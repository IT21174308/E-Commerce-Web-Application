import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import AdminDashboard from '../pages/admin/AdminDashboard';
// import VendorDashboard from '../pages/vendor/VendorDashboard';
// import CSRDashboard from './pages/CSR/CSRDashboard';
// import UserManagement from './pages/Admin/UserManagement';
// import VendorManagement from './pages/Admin/VendorManagement';
import ProductList from '../pages/vendor/ProductList';
import OrderManagement from '../pages/OrderManagement';
// import Notifications from './pages/Notifications';
// import AccountApproval from './pages/AccountApproval';
import HomePage from '../pages/user/HomePage';
import ViewItemPage from '../pages/user/viewItemPage'; 
import PurchaseDetails from '../pages/user/purchaseDetails';
import MyCart from '../pages/user/MyCart';
function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> {/* Changed 'component' to 'element' */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* <Route path="/vendor-dashboard" element={<VendorDashboard />} /> */}
        <Route path="/vendor/products" element={<ProductList />} />
        <Route path="/orders" element={<OrderManagement />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/viewItem/:productId" element={<ViewItemPage />} />
        <Route path="/purchaseDetails" element={<PurchaseDetails />} />
        <Route path="/mycart" element={<MyCart />} />


        {/*
        <Route path="/csr-dashboard" element={<CSRDashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/vendors" element={<VendorManagement />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/account-approval" element={<AccountApproval />} /> */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
