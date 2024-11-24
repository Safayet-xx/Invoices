import React, { useRef, useState } from "react";
import { storage, auth, db } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { updateProfile, updatePassword, sendPasswordResetEmail } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import '../../component/dashboard/Setting.css';

const Settings = () => {
  const fileInputRef = useRef(null);

  const [displayName, setDisplayName] = useState(localStorage.getItem("cName"));
  const [imageUrl, setImageUrl] = useState(localStorage.getItem("photoURL"));
  const [file, setFile] = useState(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("email"));

  const [statusMessage, setStatusMessage] = useState("");

  const updateCompanyName = () => {
    updateProfile(auth.currentUser, { displayName })
      .then(() => {
        localStorage.setItem("cName", displayName);
        updateDoc(doc(db, "users", localStorage.getItem("uid")), { displayName });
        setStatusMessage("Company name updated successfully!");
      })
      .catch((error) => setStatusMessage(`Error: ${error.message}`));
  };

  const onSelectFile = (e) => {
    setFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const updateLogo = () => {
    const fileRef = ref(storage, `users/${auth.currentUser.uid}/profile.jpg`);
    uploadBytesResumable(fileRef, file)
      .then(() => getDownloadURL(fileRef))
      .then((url) => {
        updateProfile(auth.currentUser, { photoURL: url });
        localStorage.setItem("photoURL", url);
        setStatusMessage("Profile picture updated successfully!");
      })
      .catch((error) => setStatusMessage(`Error: ${error.message}`));
  };

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword) {
      setStatusMessage("Please provide both current and new passwords.");
      return;
    }
    updatePassword(auth.currentUser, newPassword)
      .then(() => setStatusMessage("Password updated successfully!"))
      .catch((error) => setStatusMessage(`Error: ${error.message}`));
  };

  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => setStatusMessage("Password reset email sent!"))
      .catch((error) => setStatusMessage(`Error: ${error.message}`));
  };

  return (
    <div className="settings">
      <h1>Settings</h1>
      {statusMessage && <p className="status-message">{statusMessage}</p>}

      <div className="settings-wrapper">
        {/* Profile Picture Section */}
        <div className="profile-info">
          <img
            onClick={() => fileInputRef.current.click()}
            className="profile-pic"
            alt="Profile"
            src={imageUrl}
          />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={onSelectFile}
          />
          {file && (
            <button onClick={updateLogo} className="btn">
              Update Profile Picture
            </button>
          )}
        </div>

        {/* Update Display Name */}
        <div className="form-group">
          <input
            type="text"
            placeholder="Company Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <button onClick={updateCompanyName} className="btn">
            Update Name
          </button>
        </div>

        {/* Update Password */}
        <div className="form-group">
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handlePasswordChange} className="btn">
            Change Password
          </button>
        </div>

        {/* Reset Password */}
        <div className="form-group">
          <button onClick={resetPassword} className="btn reset-btn">
            Send Password Reset Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
