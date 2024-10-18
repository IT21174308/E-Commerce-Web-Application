import React from "react";
import { NavLink } from "react-router-dom"; // Ensure you have react-router-dom installed
import { useAuth } from "../auth/AuthContext";
import Permission from "../utils/Permission";

function Sidebar() {
  const { permissions } = useAuth();

  const hasPermission = (requiredPermission) => {
    return permissions.includes(requiredPermission);
  };

  return (
    <nav className="sidebar bg-light">
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink to="/home" className="nav-link" activeClassName="active">
            <i className="fa fa-house"></i> Home
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/mycart" className="nav-link" activeClassName="active">
            <i className="fa fa-shopping-cart"></i> My Cart
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/myorders" className="nav-link" activeClassName="active">
            <i className="fa fa-first-order"></i> My Orders
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/cancelRequests"
            className="nav-link"
            activeClassName="active"
          >
            <i className="fa fa-note-sticky"></i> Cancel Notice
          </NavLink>
        </li>

        {hasPermission(Permission.CREATE_VENDOR) && (
          <li className="nav-item">
            <NavLink
              to="/admin-dashboard"
              className="nav-link"
              activeClassName="active"
            >
              <i className="fa fa-users"></i> Vendors
            </NavLink>
          </li>
        )}

        {hasPermission(Permission.VIEW_ALL_ORDERS) && (
          <li className="nav-item">
            <NavLink to="/orders" className="nav-link" activeClassName="active">
              <i className="fa fa-first-order"></i> Orders
            </NavLink>
          </li>
        )}

        {/* {hasPermission(Permission.VIEW_PRODUCTS) && ( */}
          <li className="nav-item">
            <NavLink
              to="/vendor/products"
              className="nav-link"
              activeClassName="active"
            >
              <i className="fa fa-product-hunt"></i> Products
            </NavLink>
          </li>
        {/* )} */}

        {hasPermission(Permission.VIEW_INVENTORY) && (
          <li className="nav-item">
            <NavLink to="/stock" className="nav-link" activeClassName="active">
              <i className="fa fa-file-text"></i> Stock
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Sidebar;
