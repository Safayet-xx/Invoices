import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [logo, setLogo] = useState('');
  const [isEditMode, setIsEditMode] = useState(true); // Toggles between edit and view mode

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedCompanyName = localStorage.getItem('cName');
    const storedEmail = localStorage.getItem('email');
    const storedLogo = localStorage.getItem('photoURL'); // Assuming logo URL is saved in registration
    if (storedCompanyName) setCompanyName(storedCompanyName);
    if (storedEmail) setEmail(storedEmail);
    if (storedLogo) setLogo(storedLogo);
  }, []);

  const handleSave = () => {
    // Save data locally or send to the backend
    localStorage.setItem('phone', phone);
    localStorage.setItem('address', address);
    setIsEditMode(false); // Switch to view mode
    alert('Profile saved successfully!');
  };

  const handleEdit = () => {
    setIsEditMode(true); // Switch back to edit mode
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(URL.createObjectURL(file));
    // Save logo to localStorage or backend
  };

  return (
    <div className="container my-5">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h3>Company Profile</h3>
        </div>
        <div className="card-body">
          {isEditMode ? (
            <form>
              <div className="mb-3">
                <label htmlFor="companyName" className="form-label">
                  Company Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  disabled // Company Name is fetched from registration and not editable
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled // Email is fetched from registration and not editable
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  placeholder="Enter your company phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Company Address
                </label>
                <textarea
                  className="form-control"
                  id="address"
                  rows="3"
                  placeholder="Enter your company address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="logo" className="form-label">
                  Company Logo
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="logo"
                  accept="image/*"
                  onChange={handleLogoChange}
                />
                {logo && (
                  <div className="mt-3">
                    <p>Selected Logo:</p>
                    <img
                      src={logo}
                      alt="Company Logo"
                      className="logo-preview"
                      style={{ maxWidth: '150px' }}
                    />
                  </div>
                )}
              </div>

              <button type="button" className="btn btn-success" onClick={handleSave}>
                Save Profile
              </button>
            </form>
          ) : (
            <div>
              <p>
                <strong>Company Name:</strong> {companyName}
              </p>
              <p>
                <strong>Email:</strong> {email}
              </p>
              <p>
                <strong>Phone Number:</strong> {phone || 'N/A'}
              </p>
              <p>
                <strong>Address:</strong> {address || 'N/A'}
              </p>
              {logo && (
                <div>
                  <strong>Company Logo:</strong>
                  <div>
                    <img
                      src={logo}
                      alt="Company Logo"
                      className="logo-preview"
                      style={{ maxWidth: '150px' }}
                    />
                  </div>
                </div>
              )}

              <button type="button" className="btn btn-primary mt-3" onClick={handleEdit}>
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
