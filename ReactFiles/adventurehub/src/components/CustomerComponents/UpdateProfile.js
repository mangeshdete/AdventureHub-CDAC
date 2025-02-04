

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

const UpdateProfileComponent = () => {
  const user = useSelector((state) => state.user);
  console.log("User from Redux:", user); // Debugging line

  // Initialize states only if user is available
  const [customerData, setCustomerData] = useState(user || {});
  const [editableFields, setEditableFields] = useState({
    email: "",
    password: "",
    contact: "",
    firstName: "",
    lastName: "",
    dob: "",
    aadhaar: "",
    stateid: "",
    cityid: "",
  });

  // Fetch all states when component mounts
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStates() {
      try {
        const response = await fetch("http://localhost:8142/getAllStates");
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setStates(data);  // Set the states data if it's valid
        } else {
          console.error("Invalid data structure for states:", data);
          setError("Failed to load states.");
        }  
      } catch (err) {
        console.error("Error fetching states", err);
        setError("Failed to load states.");
      } finally {
        setLoading(false);
      }
    }

    fetchStates();
  }, []);  // Empty dependency array to run once when the component mounts


  // Fetch cities based on selected state
  useEffect(() => {
    if (editableFields.stateid) {
      async function fetchCities() {
        try {
          const response = await fetch(
            `http://localhost:8142/getCitiesByStateId?stateId=${editableFields.stateid}`
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
  }, [editableFields.stateid]);

  // Set the customer data after it is fetched
  useEffect(() => {
    if (user) {
      setCustomerData(user);
      setEditableFields({
        email: "",
        password: "",
        contact: "",
        firstName: "",
        lastName: "",
        dob: "",
        aadhaar: "",
        stateid: user.stateid,
        cityid: user.cityid,
      });
    }
  }, [user]);

  // Handle input changes for editable fields
  const handleEditableChange = (e) => {
    const { name, value } = e.target;
    setEditableFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      customerid: customerData.customerid,
      userid: customerData.user?.userid,
      street: customerData.street,
      cityid: editableFields.cityid,
      pincode: customerData.pincode,
      user: {
        userid: customerData.user?.userid,
        password: editableFields.password,
        contact: editableFields.contact,
        email: editableFields.email,
        firstName: editableFields.firstName,
        lastName: editableFields.lastName,
        dob: editableFields.dob,
        aadhaar: editableFields.aadhaar,
      },
    };

    console.log("Data being sent to the server:", updatedData); // Debugging line

    if (
      !updatedData.user.email ||
      !updatedData.user.password ||
      !updatedData.user.contact ||
      !updatedData.user.firstName ||
      !updatedData.user.lastName ||
      !updatedData.user.dob ||
      !updatedData.user.aadhaar
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const regexPatterns = {
      email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      contactno: /^[0-9]{10}$/,
      aadhaar: /^\d{12}$/,
    };

    if (!regexPatterns.email.test(updatedData.user.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!regexPatterns.contactno.test(updatedData.user.contact)) {
      alert("Please enter a valid 10-digit contact number.");
      return;
    }

    if (!regexPatterns.aadhaar.test(updatedData.user.aadhaar)) {
      alert("Please enter a valid 12-digit Aadhaar number.");
      return;
    }

    try {
      const response = await fetch(
        "https://localhost:9144/Customer/updateCustomerDetails",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json(); // Parse the error response
        console.error("Server error response:", errorResponse);
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      alert("Profile updated successfully!");
      console.log(result);
    } catch (err) {
      console.error("Error during PUT request:", err);
      alert("Failed to update profile.");
    }
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Update Profile</h2>
      <div className="row">
        <div className="col-md-6">
          <h3>Current Profile Details</h3>
          <form>
            <div className="card p-4 shadow">
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={customerData.user.user.email || ""}
                    disabled
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={customerData.user.user.password || ""}
                    disabled
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={customerData.user.fname || ""}
                    disabled
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={customerData.user.lname || ""}
                    disabled
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    value={customerData.user.dob || ""}
                    disabled
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Aadhaar Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={customerData.user.aadhaar || ""}
                    disabled
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    className="form-control"
                    value={customerData.user.cities.states.statename || ""}
                    disabled
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    value={customerData.user.cities.cityname || ""}
                    disabled
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="col-md-6">
          <h3>Update Your Profile</h3>
          <form onSubmit={handleSubmit}>
            <div className="card p-4 shadow">
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={editableFields.email}
                    onChange={handleEditableChange}
                    required
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={editableFields.password}
                    onChange={handleEditableChange}
                    required
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Contact</label>
                  <input
                    type="text"
                    name="contact"
                    className="form-control"
                    value={editableFields.contact}
                    onChange={handleEditableChange}
                    required
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    value={editableFields.firstName}
                    onChange={handleEditableChange}
                    required
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    value={editableFields.lastName}
                    onChange={handleEditableChange}
                    required
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    className="form-control"
                    value={editableFields.dob}
                    onChange={handleEditableChange}
                    disabled
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Aadhaar Number</label>
                  <input
                    type="text"
                    name="aadhaar"
                    className="form-control"
                    value={editableFields.aadhaar}
                    onChange={handleEditableChange}
                    disabled
                  />
                </div>

                {/* State Dropdown */}
                <div className="col-md-12 mb-3">
                  <label className="form-label">State</label>
                  <select
                    name="stateid"
                    className="form-control"
                    value={editableFields.stateid}
                    onChange={handleEditableChange}
                    required
                  >
                    <option value="">Select State</option>
                    {states.length > 0 ? (
                      states.map((state) => (
                        <option key={state.stateid} value={state.stateid}>
                          {state.statename}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>No states available</option>
                    )}
                  </select>
                </div>


                {/* City Dropdown */}
                <div className="col-md-12 mb-3">
                  <label className="form-label">City</label>
                  <select
                    name="cityid"
                    className="form-control"
                    value={editableFields.cityid}
                    onChange={handleEditableChange}
                    required
                    disabled={!editableFields.stateid}
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city.cityid} value={city.cityid}>
                        {city.cityname}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileComponent;
