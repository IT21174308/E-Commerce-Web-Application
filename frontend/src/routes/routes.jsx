import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ProductList from "../pages/vendor/ProductList";
import OrderManagement from "../pages/OrderManagement";
import HomePage from "../pages/user/HomePage";
import ViewItemPage from "../pages/user/viewItemPage";
import MyCart from "../pages/user/MyCart";
import MyOrders from "../pages/user/MyOrders";
import CancelRequests from "../pages/admin/CancelRequests";
import StockList from "../pages/vendor/StockList";
import ProtectedRoute from "../auth/ProtectedRoute";
import { AuthProvider } from "../auth/AuthContext";

function AppRoutes() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* administration routes */}

        {/* Administration routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor/products"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrderManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cancelRequests"
          element={
            <ProtectedRoute>
              <CancelRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stock"
          element={
            <ProtectedRoute>
              <StockList />
            </ProtectedRoute>
          }
        />

        {/* customer routes */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/viewItem/:productId" element={<ViewItemPage />} />
        <Route path="/mycart" element={<MyCart />} />
        <Route path="/myorders" element={<MyOrders />} />
      </Routes>
    </Router>
    </ AuthProvider>
  );
}

export default AppRoutes;
