import React, { useState, useEffect } from "react";
import "../styles/UpdateProfileComponent.css";

function UpdateProfileComponent({ userProfile, onUpdateProfile }) {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    contact: "",
    organization: "",
    address: "",
    password: "",
  });

  const [newPassword, setNewPassword] = useState("");

  // Populate form with user data on component mount
  useEffect(() => {
    if (userProfile) {
      setProfile({
        name: userProfile.name || "",
        email: userProfile.email || "",
        contact: userProfile.contact || "",
        organization: userProfile.organization || "",
        address: userProfile.address || "",
        password: "", // Password should not be pre-filled for security reasons
      });
    }
  }, [userProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    const updatedProfile = { ...profile, password: newPassword };
    onUpdateProfile(updatedProfile);
    alert("Profile updated successfully!");
  };

  const handleReset = () => {
    if (userProfile) {
      setProfile({
        name: userProfile.name,
        email: userProfile.email,
        contact: userProfile.contact,
        organization: userProfile.organization,
        address: userProfile.address,
        password: "",
      });
      setNewPassword("");
    }
  };

  return (
    <div className="container update-profile-container">
      <h3 className="mb-4">Update Profile</h3>
      <form onSubmit={handleSaveChanges}>
        {/* Name */}
        <div className="form-group mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            className="form-control"
            disabled
          />
        </div>

        {/* Email */}
        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        {/* Contact Number */}
        <div className="form-group mb-3">
          <label>Contact Number</label>
          <input
            type="text"
            name="contact"
            value={profile.contact}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        {/* Organization */}
        <div className="form-group mb-3">
          <label>Organization</label>
          <input
            type="text"
            name="organization"
            value={profile.organization}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        {/* Address */}
        <div className="form-group mb-3">
          <label>Address</label>
          <textarea
            name="address"
            value={profile.address}
            onChange={handleInputChange}
            className="form-control"
            rows="3"
          ></textarea>
        </div>

        {/* Password */}
        <div className="form-group mb-3">
          <label>New Password</label>
          <input
            type="password"
            name="password"
            value={newPassword}
            onChange={handlePasswordChange}
            className="form-control"
          />
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" onClick={handleReset}>
            Reset
          </button>
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProfileComponent;
