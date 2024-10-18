import React, { useState } from 'react';
import logo from '../assets/logo.png'; // Adjust the path according to your folder structure
import { useAuth } from '../auth/AuthContext';

function Header() {
  // Manage the logged-in state (this can be passed as props or from a global state like Redux)
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const {isAuthenticated, logout } = useAuth();

  // Function to handle logout (this can be replaced with actual logout logic)
  const handleLogout = () => {
    setIsLoggedIn(true);
    logout();
    // Add actual logout functionality here
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand">
          <img src={logo} alt="Logo" style={{ height: '50px' }} />
          ShopSphere
        </a>

        {/* Conditional rendering based on login state */}
        {isAuthenticated ? (
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
                </a>
              </li> */}
              {/* 
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">
                  Disabled
                </a> */}
              {/* </li> */}
            </ul>

            {/* Show the search bar and Logout button if user is logged in */}
            <form className="d-flex me-3" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            <button className="btn btn-outline-danger" onClick={handleLogout} type="button">
              Logout
            </button>
          </div>
        ) : (
          // Show only the logo if the user is not logged in
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex">
              {/* Empty div to maintain structure, you can add some styling if needed */}
              <div style={{ flexGrow: 1 }}></div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
