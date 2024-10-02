import React from 'react';
import { NavLink } from 'react-router-dom'; // Ensure you have react-router-dom installed

function Sidebar() {
    return (
        <nav className="sidebar bg-light">
            <ul className="nav flex-column">
                <li className="nav-item">
                    <NavLink to="/admin/dashboard" className="nav-link" activeClassName="active">
                        <i className="fa fa-dashboard"></i> Dashboard
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/admin-dashboard" className="nav-link" activeClassName="active">
                        <i className="fa fa-users"></i> Vendors
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/admin/orders" className="nav-link" activeClassName="active">
                        <i className="fa fa-shopping-cart"></i> Orders
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/vendor/products" className="nav-link" activeClassName="active">
                        <i className="fa fa-product-hunt"></i> Products
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/admin/reports" className="nav-link" activeClassName="active">
                        <i className="fa fa-file-text"></i> Reports
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/admin/settings" className="nav-link" activeClassName="active">
                        <i className="fa fa-cog"></i> Settings
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Sidebar;
