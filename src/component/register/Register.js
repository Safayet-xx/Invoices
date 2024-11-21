import React, { useRef, useState } from 'react';
import axios from 'axios';
import '../login/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {
  const fileInputRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Commented out file-related code
  // const [file, setFile] = useState(null);
  // const [imageUrl, setImageUrl] = useState(null);

  // Commented out the file selection handler
  // const onSelectFile = (e) => {
  //   setFile(e.target.files[0]);
  //   setImageUrl(URL.createObjectURL(e.target.files[0]));
  // };

  // Commented out the Cloudinary upload function
  // const uploadToCloudinary = async (file) => {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   formData.append('upload_preset', 'yx0r1d81e'); // Replace with your Cloudinary preset

  //   try {
  //     const response = await axios.post(
  //       'https://api.cloudinary.com/v1_1/dpqs8cobk/image/upload',
  //       formData
  //     );
  //     const imageUrl = response.data.secure_url;
  //     console.log('Uploaded Image URL:', imageUrl);
  //     return imageUrl;
  //   } catch (error) {
  //     console.error('Error uploading to Cloudinary:', error);
  //     throw error;
  //   }
  // };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create user in Firebase Auth
      const newUser = await createUserWithEmailAndPassword(auth, email, password);

      // Commented out Cloudinary integration
      // const uploadedImageUrl = await uploadToCloudinary(file);

      // Update user profile in Firebase Auth
      await updateProfile(newUser.user, {
        displayName: displayName,
        // photoURL: uploadedImageUrl, // Commented out photoURL
      });

      // Save user data in Firestore
      await setDoc(doc(db, 'users', newUser.user.uid), {
        uid: newUser.user.uid,
        displayName: displayName,
        email: email,
        // photoURL: uploadedImageUrl, // Commented out photoURL
      });

      // Navigate to dashboard and save user info in localStorage
      navigate('/dashboard');
      localStorage.setItem('cName', displayName);
      localStorage.setItem('email', newUser.user.email);
      localStorage.setItem('uid', newUser.user.uid);

      setLoading(false);
    } catch (error) {
      console.error('Error during registration:', error);
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
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              type="password"
              placeholder="Password"
            />
            {/* File input and preview are commented out */}
            {/* <input
              required
              onChange={onSelectFile}
              style={{ display: 'none' }}
              className="login-input"
              type="file"
              ref={fileInputRef}
            />
            <input
              required
              className="login-input"
              type="button"
              value="Select Your Logo"
              onClick={() => fileInputRef.current.click()}
            />
            {imageUrl && <img className="image-preview" src={imageUrl} alt="preview" />} */}
            <button className="login-input login-btn" type="submit">
              {isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>} Submit
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
