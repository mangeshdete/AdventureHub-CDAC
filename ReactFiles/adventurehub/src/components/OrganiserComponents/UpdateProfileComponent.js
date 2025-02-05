import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import '../../styles/OrganiserStyles/UpdateProfileComponent.css';

const UpdateProfileComponent = () => {
  const user = useSelector((state) => state.user.user);
  console.log("User  from Redux:", user);

  // Initialize states only if user is available
  const [organiserData, setOrganiserData] = useState(user || {});
  const [editableFields, setEditableFields] = useState({
    email: user?.user?.email || "",
    contact: user?.user?.contact || "",
  });

  // Update states when user changes
  useEffect(() => {
    if (user) {
      setOrganiserData(user);
      setEditableFields({
        email: user.user?.email || "",
        contact: user.user?.contact || "",
      });
    }
  }, [user]);

  const regexPatterns = {
    orgname: /^[A-Za-z0-9\s\-'&()]+$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    contactno: /^[0-9]{10}$/,
    pincode: /^\d{6}$/,
  };

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);

  // Fetch all states when component mounts
  useEffect(() => {
    async function fetchStates() {
      try {
        const response = await fetch("http://localhost:8142/getAllStates");
        const data = await response.json();
        setStates(data);
      } catch (err) {
        console.error("Error fetching states", err);
        setError("Failed to load states.");
      }
    }
    fetchStates();
  }, []);

  // Fetch cities based on selected state
  useEffect(() => {
    if (organiserData.stateid) {
      async function fetchCities() {
        try {
          const response = await fetch(
            `http://localhost:8142/getCitiesByStateId?stateId=${organiserData.stateid}`
          );
          const data = await response.json();
          setCities(data);
        } catch (err) {
          console.error("Error fetching cities", err);
          setError("Failed to load cities.");
        }
      }
      fetchCities();
    } else {
      setCities([]); // Clear cities if no state is selected
    }
  }, [organiserData.stateid]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrganiserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditableChange = (e) => {
    const { name, value } = e.target;
    setEditableFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reset form
  const handleReset = () => {
    if (user) {
      setOrganiserData(user);
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

    // Validate required fields
    if (!updatedData.orgname || !updatedData.user.email || !updatedData.user.contact) {
      alert("Please fill in all required fields.");
      return;
    }

    // Validate email and contact number
    if (!regexPatterns.email.test(updatedData.user.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!regexPatterns.contactno.test(updatedData.user.contact)) {
      alert("Please enter a valid 10-digit contact number.");
      return;
    }

    if (!regexPatterns.pincode.test(updatedData.pincode)) {
      alert("Please enter a valid 6-digit pincode.");
      return;
    }

    try {
      const response = await fetch(
        "https://localhost:9144/Organiser/updateOrganiserDetails",
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

      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error during PUT request:", err);
      alert("Failed to update profile.");
    }
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="update-profile-container mt-4">
      <h2 className="update-profile-title text-center mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form card p-4 shadow">
        <div className="row">
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