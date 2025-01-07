import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase'; // Firestore instance
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import axios from 'axios'; // For Cloudinary image upload
import './Profile.css';

const Profile = ({ userId }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    address: '',
    logo: '', // Holds the Cloudinary URL
  });
  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false); // Tracks upload status
  const navigate = useNavigate();

  const profileCollection = collection(db, 'profiles');

  // Fetch the user's profile data from Firestore
  useEffect(() => {
    if (userId) {
      const fetchProfile = async () => {
        try {
          const profileRef = doc(profileCollection, userId);
          const profileSnap = await getDoc(profileRef);
          if (profileSnap.exists()) {
            setFormData(profileSnap.data());
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      };
      fetchProfile();
    }
  }, [userId]);

  // Validate the form inputs
  const validateForm = () => {
    const newErrors = {};
    const { companyName, email, phone, address, logo } = formData;

    if (!companyName.trim()) newErrors.companyName = 'Company Name is required.';
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address.';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Phone Number is required.';
    } else if (!/^\d+$/.test(phone)) {
      newErrors.phone = 'Phone Number must contain only digits.';
    }
    if (!address.trim()) newErrors.address = 'Address is required.';
    if (!logo.trim()) newErrors.logo = 'Company Logo is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save profile data to Firestore
  const handleSave = async () => {
    if (isUploading) {
      alert('Please wait for the image to finish uploading.');
      return;
    }

    if (validateForm()) {
      try {
        const profileRef = doc(profileCollection, userId);
        await setDoc(profileRef, formData);
        alert('Profile saved successfully!');
        setErrors({});
        navigate('/dashboard/home');
      } catch (error) {
        console.error('Error saving profile:', error);
        alert('Failed to save profile. Please try again.');
      }
    } else {
      alert('Please fill in all required fields correctly.');
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle logo upload to Cloudinary
  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true); // Set uploading status
      const uploadData = new FormData();
      uploadData.append('file', file);
      uploadData.append('upload_preset', 'x0r1d81e'); // Replace with your Cloudinary upload preset

      try {
        const res = await axios.post(
          'https://api.cloudinary.com/v1_1/dpqs8cobk/image/upload', // Replace with your Cloudinary URL
          uploadData
        );
        const logoUrl = res.data.secure_url;

        // Update the formData with the uploaded logo URL
        setFormData((prev) => ({ ...prev, logo: logoUrl }));

        console.log('Uploaded logo URL:', logoUrl); // Debugging log
      } catch (error) {
        console.error('Error uploading logo:', error);
        alert('Failed to upload logo. Please try again.');
      } finally {
        setIsUploading(false); // Reset uploading status
      }
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Profile</h2>
      <form>
        <div className="form-group mb-3">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            className="form-control"
            value={formData.companyName}
            onChange={handleChange}
          />
          {errors.companyName && <small className="text-danger">{errors.companyName}</small>}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <small className="text-danger">{errors.phone}</small>}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            className="form-control"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <small className="text-danger">{errors.address}</small>}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="logo">Company Logo</label>
          <input
            type="file"
            id="logo"
            className="form-control"
            onChange={handleLogoChange}
          />
          {isUploading && <small className="text-info">Uploading logo...</small>}
          {errors.logo && <small className="text-danger">{errors.logo}</small>}
          {formData.logo && (
            <img
              src={formData.logo}
              alt="Company Logo"
              className="mt-3"
              style={{ width: '100px' }}
            />
          )}
        </div>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleSave}
          disabled={isUploading}
        >
          {isUploading ? 'Uploading...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
