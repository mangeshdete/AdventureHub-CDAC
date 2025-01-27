import React, { useState } from "react";

function ProfileManagement() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    organization: "Example Organization",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <div>
      <h3>Profile Management</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            disabled
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="organization" className="form-label">
            Organization
          </label>
          <input
            type="text"
            className="form-control"
            id="organization"
            name="organization"
            value={profile.organization}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default ProfileManagement;
