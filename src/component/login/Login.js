import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear any previous errors

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Example: Fetch media URL from your storage or media service
      const mediaUrl = user.photoURL || 'https://ik.imagekit.io/ant9lfnrk/default-profile.jpg';

      // Save user details to localStorage
      localStorage.setItem('cName', user.displayName || 'Anonymous');
      localStorage.setItem('photoURL', mediaUrl);
      localStorage.setItem('email', user.email);
      localStorage.setItem('phoneNumber', user.phoneNumber || '');
      localStorage.setItem('uid', user.uid);

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-boxes login-left"></div>
        <div className="login-boxes login-right">
          <h2 className="login-heading">Login</h2>
          <form onSubmit={submitHandler}>
            <input
              required
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              type="text"
              placeholder="Email"
            />
            <input
              required
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              type="password"
              placeholder="Password"
            />
            {error && <p className="error-message">{error}</p>}
            <button className="login-input login-btn" type="submit">
              {isLoading ? <i className="fa-solid fa-spinner fa-spin-pulse"></i> : 'Submit'}
            </button>
          </form>
          <Link to="/register" className="register-link">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
