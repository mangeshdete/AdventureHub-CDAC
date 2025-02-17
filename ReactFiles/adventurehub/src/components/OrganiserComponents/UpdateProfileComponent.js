import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import '../../styles/OrganiserStyles/UpdateProfileComponent.css';

const UpdateProfileComponent = () => {
  // Fetch user data from Redux store
  const user = useSelector((state) => state.user.user);
  console.log("User from Redux:", user);

  // Set initial state for organiser data and editable fields
  const [organiserData, setOrganiserData] = useState(user || {});
  const [editableFields, setEditableFields] = useState({
    email: user?.user?.email || "",
    contact: user?.user?.contact || "",
  });

  const [states, setStates] = useState([]);  // Store all states fetched from API
  const [cities, setCities] = useState([]);  // Store cities based on selected state
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  // Sync organiserData and editableFields whenever user data changes in Redux
  useEffect(() => {
    if (user) {
      setOrganiserData(user);
      setEditableFields({
        email: user.user?.email || "",
        contact: user.user?.contact || "",
      });
    }
  }, [user]);

  // Fetch all states when the component mounts
  useEffect(() => {
    async function fetchStates() {
      try {
        const response = await fetch("http://localhost:8140/auth/getAllStates");
        const data = await response.json();
        setStates(data);  // Set fetched states in the state variable
      } catch (err) {
        console.error("Error fetching states", err);
        setError("Failed to load states.");
      }
    }
    fetchStates();
  }, []);

  // Fetch cities when a state is selected or organiserData.stateid changes
  useEffect(() => {
    if (organiserData.stateid) {
      async function fetchCities() {
        try {
          const response = await fetch(
            `http://localhost:8140/auth/getCitiesByStateId?stateId=${organiserData.stateid}`
          );
          const data = await response.json();
          setCities(data);  // Set fetched cities in the state variable
        } catch (err) {
          console.error("Error fetching cities", err);
          setError("Failed to load cities.");
        }
      }
      fetchCities();
    } else {
      setCities([]);  // Clear cities if no state is selected
    }
  }, [organiserData.stateid]);

  // Pre-populate the state if user data contains state information
  useEffect(() => {
    if (states.length && user?.city?.states?.stateid) {
      setOrganiserData((prev) => ({
        ...prev,
        stateid: user?.city?.states?.stateid,  // Set state ID from user data
      }));
    }
  }, [states, user?.city?.states?.stateid]);

  // Pre-populate the city if user data contains city information
  useEffect(() => {
    if (cities.length && user?.city.cityid) {
      setOrganiserData((prev) => ({
        ...prev,
        cityid: user?.city.cityid,  // Set city ID from user data
      }));
    }
  }, [cities, user?.city?.cityid]);

  // Regex patterns for validation
  const regexPatterns = {
    orgname: /^[A-Za-z0-9\s\-'&()]+$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    contactno: /^[0-9]{10}$/,
    pincode: /^\d{6}$/,
  };

  // Handle input changes for non-editable fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrganiserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle input changes for editable fields (email, contact)
  const handleEditableChange = (e) => {
    const { name, value } = e.target;
    setEditableFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reset form to initial values
  const handleReset = () => {
    if (user) {
      setOrganiserData({
        ...user,
        stateid: user?.city?.states?.stateid || "",
        cityid: user?.city?.cityid || "",
      });
      setEditableFields({
        email: user.user?.email || "",
        contact: user.user?.contact || "",
      });
    }
  };
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      organiserid: organiserData.organiserid,
      userid: organiserData.user?.userid,
      orgname: organiserData.orgname,
      gst: organiserData.gst,
      pancard: organiserData.pancard,
      street: organiserData.street,
      cityid: organiserData.cityid,
      pincode: organiserData.pincode,
      user: {
        userid: organiserData.user?.userid,
        password: organiserData.user?.password,
        contact: editableFields.contact,
        email: editableFields.email,
        securityqid: organiserData.user?.securityqid,
        securityqans: organiserData.user?.securityqans,
      },
    };

    // Validation before submitting
    if (!updatedData.orgname || !updatedData.user.email || !updatedData.user.contact) {
      setMessage("Please fill in all required fields.");
      setTimeout(() => setMessage(""), 2000);
      return;
    }

    if (!regexPatterns.email.test(updatedData.user.email)) {
      setMessage("Please enter a valid email address.");
      setTimeout(() => setMessage(""), 2000);
      return;
    }

    if (!regexPatterns.contactno.test(updatedData.user.contact)) {
      setMessage("Please enter a valid 10-digit contact number.");
      setTimeout(() => setMessage(""), 2000);
      return;
    }

    if (!regexPatterns.pincode.test(updatedData.pincode)) {
      setMessage("Please enter a valid 6-digit pincode.");
      setTimeout(() => setMessage(""), 2000);
      return;
    }

    // Sending the update request
    try {
      const response = await fetch(
        "http://localhost:8140/organiser/Organiser/updateOrganiserDetails",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Server error response:", errorResponse);
        throw new Error(`${response.statusText}`);
      }

      setMessage("Profile updated successfully!");
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      console.error("Error during PUT request:", err);
      setMessage("Failed to update profile.");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  // Display error message if any
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="update-profile-container mt-4">
      <h2 className="update-profile-title text-center mb-4">Update Profile</h2>
      {message && <div className="alert alert-info text-center">{message}</div>}
      <form onSubmit={handleSubmit} className="profile-form card p-4 shadow">
        <div className="row">
          {/* Organization Name */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Organization Name</label>
            <input
              type="text"
              name="orgname"
              className="form-control"
              value={organiserData.orgname || ""}
              onChange={handleChange}
            />
          </div>
          {/* Email */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={editableFields.email}
              onChange={handleEditableChange}
            />
          </div>
          {/* Contact Number */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Contact Number</label>
            <input
              type="text"
              name="contact"
              className="form-control"
              value={editableFields.contact}
              onChange={handleEditableChange}
            />
          </div>
          {/* GST (Read-only) */}
          <div className="col-md-6 mb-3">
            <label className="form-label">GST</label>
            <input
              type="text"
              name="gst"
              className="form-control"
              value={organiserData.gst || ""}
              readOnly
            />
          </div>
          {/* Pancard (Read-only) */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Pancard</label>
            <input
              type="text"
              name="pancard"
              className="form-control"
              value={organiserData.pancard || ""}
              readOnly
            />
          </div>
          {/* State Dropdown */}
          <div className="col-md-6 mb-3">
            <label className="form-label">State</label>
            <select
              name="stateid"
              className="form-select"
              value={organiserData.stateid || ""}
              onChange={handleChange}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.stateid} value={state.stateid}>
                  {state.statename}
                </option>
              ))}
            </select>
          </div>
          {/* City Dropdown */}
          <div className="col-md-6 mb-3">
            <label className="form-label">City</label>
            <select
              name="cityid"
              className="form-select"
              value={organiserData.cityid || ""}
              onChange={handleChange}
              disabled={!organiserData.stateid}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.cityid} value={city.cityid}>
                  {city.cityname}
                </option>
              ))}
            </select>
          </div>
          {/* Street */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Street</label>
            <input
              type="text"
              name="street"
              className="form-control"
              value={organiserData.street || ""}
              onChange={handleChange}
            />
          </div>
          {/* Pincode */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Pincode</label>
            <input
              type="text"
              name="pincode"
              className="form-control"
              value={organiserData.pincode || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Buttons */}
        <div className="text-center mt-3">
          <button type="button" className="btn btn-secondary me-2" onClick={handleReset}>
            Reset
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfileComponent;
