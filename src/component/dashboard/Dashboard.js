import React, { useState } from 'react';
import '../../component/dashboard/dashboard.css';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar is always open

  const logout = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        navigate('/login');
      })
      .catch((error) => {
        console.error('Logout Error:', error.message);
      });
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar Navigation */}
      <div className={`side-nav ${sidebarOpen ? 'open' : 'closed'}`}>
        {/* Profile Section */}
        <div className="profile-info">
          <img
            src="/default-avatar.png"
            alt="User Avatar"
            className="profile-img"
          />
          <div className="profile-details">
            <p className="company-name">{localStorage.getItem('cName') || 'User'}</p>
          </div>
        </div>
        <hr />
        {/* Navigation Links */}
        <div className="menu">
          <Link
            to="/dashboard/home"
            className={`menu-link ${isActive('/dashboard/home') ? 'active' : ''}`}
          >
            <i className="fa-solid fa-house"></i> Home
          </Link>
          <Link
            to="/dashboard/invoices"
            className={`menu-link ${isActive('/dashboard/invoices') ? 'active' : ''}`}
          >
            <i className="fa-solid fa-file-invoice"></i> Invoices
          </Link>
          <Link
            to="/dashboard/new-invoice"
            className={`menu-link ${isActive('/dashboard/new-invoice') ? 'active' : ''}`}
          >
            <i className="fa-solid fa-file-circle-plus"></i> New Invoice
          </Link>
          <Link
            to="/dashboard/setting"
            className={`menu-link ${isActive('/dashboard/setting') ? 'active' : ''}`}
          >
            <i className="fa-solid fa-gear"></i> Settings
          </Link>
          <Link
            to="/dashboard/profile"
            className={`menu-link ${isActive('/dashboard/profile') ? 'active' : ''}`}
          >
            <i className="fa-solid fa-file-invoice"></i> Profile
          </Link>          
        </div>

        {/* Logout Button in Red Bar */}
        <div className="logout-section">
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
