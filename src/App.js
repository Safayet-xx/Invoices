import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './component/login/Login';
import Register from './component/register/Register';
import Dashboard from './component/dashboard/Dashboard';
import Home from './component/dashboard/Home';
import Invoices from './component/dashboard/Invoices';
import NewInvoice from './component/dashboard/NewInvoice';
import Setting from './component/dashboard/Setting';
import InvoiceDetail from './component/dashboard/InvoiceDetail';
import Profile from './component/dashboard/Profile';

// Function to check if the profile is saved
const isProfileSaved = () => {
  return localStorage.getItem('profileSaved') === 'true';
};

// Route Guard for Protected Routes
const ProtectedRoute = ({ children }) => {
  return isProfileSaved() ? children : <Navigate to="/dashboard/profile" replace />;
};

function App() {
  const myRouter = createBrowserRouter([
    { path: '/', element: <Navigate to="/login" replace /> }, // Redirect root path to login
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    {
      path: '/dashboard',
      element: <Dashboard />,
      children: [
        { path: '', element: <Navigate to="profile" replace /> }, // Default route to profile
        { path: 'home', element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'invoices', element: <ProtectedRoute><Invoices /></ProtectedRoute> },
        { path: 'new-invoice', element: <ProtectedRoute><NewInvoice /></ProtectedRoute> },
        { path: 'invoice-detail', element: <ProtectedRoute><InvoiceDetail /></ProtectedRoute> },
        { path: 'setting', element: <ProtectedRoute><Setting /></ProtectedRoute> },
        { path: 'profile', element: <Profile /> }, // Accessible without protection
      ],
    },
  ]);

  return <RouterProvider router={myRouter} />;
}

export default App;
