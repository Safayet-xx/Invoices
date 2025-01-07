import React, { useState } from 'react';
import '../login/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== repeatPassword) {
      alert("Passwords don't match.");
      return;
    }

    setLoading(true);

    try {
      // Create user in Firebase Auth
      const newUser = await createUserWithEmailAndPassword(auth, email, password);

      // Update user profile in Firebase Auth
      await updateProfile(newUser.user, {
        displayName: displayName,
      });

      // Save user data in Firestore
      await setDoc(doc(db, 'users', newUser.user.uid), {
        uid: newUser.user.uid,
        displayName: displayName,
        email: email,
        companyAddress: companyAddress,
        contactNo: contactNo,
      });

      // Save user info in localStorage
      localStorage.setItem('cName', displayName);
      localStorage.setItem('email', newUser.user.email);
      localStorage.setItem('uid', newUser.user.uid);

      // Redirect to the Profile page
      navigate('/dashboard/profile');
    } catch (error) {
      console.error('Error during registration:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-boxes login-left"></div>
        <div className="login-boxes login-right">
          <h2 className="login-heading">Create Your Account</h2>
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
              onChange={(e) => setDisplayName(e.target.value)}
              className="login-input"
              type="text"
              placeholder="Company Name"
            />
            <input
              required
              onChange={(e) => setCompanyAddress(e.target.value)}
              className="login-input"
              type="text"
              placeholder="Company Address"
            />
            <input
              required
              onChange={(e) => setContactNo(e.target.value)}
              className="login-input"
              type="text"
              placeholder="Contact No."
            />
            <input
              required
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              type="password"
              placeholder="Password"
            />
            <input
              required
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="login-input"
              type="password"
              placeholder="Repeat Password"
            />

            <button className="login-input login-btn" type="submit" disabled={isLoading}>
              {isLoading ? <i className="fa-solid fa-spinner fa-spin-pulse"></i> : 'Submit'}
            </button>
          </form>
          <Link to="/login" className="register-link">
            Login With Your Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
