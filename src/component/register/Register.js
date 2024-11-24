import React, { useState } from 'react';
import '../login/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { IKContext, IKUpload } from 'imagekitio-react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setUploading] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!imageUrl) {
      alert('Please wait for the image to upload before submitting.');
      return;
    }

    setLoading(true);

    try {
      // Create user in Firebase Auth
      const newUser = await createUserWithEmailAndPassword(auth, email, password);

      // Update user profile in Firebase Auth
      await updateProfile(newUser.user, {
        displayName: displayName,
        photoURL: imageUrl,
      });

      // Save user data in Firestore
      await setDoc(doc(db, 'users', newUser.user.uid), {
        uid: newUser.user.uid,
        displayName: displayName,
        email: email,
        photoURL: imageUrl,
      });

      // Save user info in localStorage
      localStorage.setItem('cName', displayName);
      localStorage.setItem('email', newUser.user.email);
      localStorage.setItem('uid', newUser.user.uid);

      navigate('/dashboard');
    } catch (error) {
      console.error('Error during registration:', error);
    } finally {
      setLoading(false);
    }
  };

  const onUploadSuccess = (response) => {
    console.log('Image uploaded successfully:', response.url);
    setImageUrl(response.url); // Save the uploaded image URL to state
    setUploading(false);
  };

  const onUploadError = (error) => {
    console.error('Error uploading image:', error);
    setUploading(false);
    alert('Failed to upload image. Please try again.');
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

            {/* ImageKit Upload Component */}
            <IKContext
              publicKey="public_oqQgn8KlbR4og8xmzwk+UIoAKYY="
              urlEndpoint="https://ik.imagekit.io/ant9lfnrk"
              authenticationEndpoint="http://localhost:3000/auth"
            >
              <label htmlFor="fileUpload" className="login-input">
                Upload Your Logo:
              </label>
              <IKUpload
                fileName="logo-upload"
                onSuccess={onUploadSuccess}
                onError={onUploadError}
                className="upload-btn"
              />
              {isUploading && <p>Uploading image...</p>}
            </IKContext>

            <button className="login-input login-btn" type="submit" disabled={isLoading || isUploading}>
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
