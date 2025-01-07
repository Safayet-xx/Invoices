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
      // Authenticate the user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user details to localStorage
      localStorage.setItem('cName', user.displayName || 'Anonymous');
      localStorage.setItem('photoURL', user.photoURL || 'https://ik.imagekit.io/ant9lfnrk/default-profile.jpg');
      localStorage.setItem('email', user.email);
      localStorage.setItem('phoneNumber', user.phoneNumber || '');
      localStorage.setItem('uid', user.uid);

      // Redirect to dashboard
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
      {/* Background */}
      <div className="login-background"></div>

      {/* Login Form */}
      <div className="login-container">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-btn">
            {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Submit'}
          </button>
        </form>
        <Link to="/register" className="register-link">
          Create an Account
        </Link>
      </div>
    </div>
  );
};

export default Login;
