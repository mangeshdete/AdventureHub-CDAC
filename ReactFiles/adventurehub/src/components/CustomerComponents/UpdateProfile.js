import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

const UpdateProfileComponent = () => {
  const user = useSelector((state) => state.user);
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

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);
  const [failureMessage, setFailureMessage] = useState(null);

  useEffect(() => {
    async function fetchStates() {
      try {
        const response = await fetch("http://localhost:8142/getAllStates");
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setStates(data);
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
  }, []);

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
      setCities([]);
    }
  }, [editableFields.stateid]);

  useEffect(() => {
    if (user && user.user) {
      setCustomerData(user);
      setEditableFields({
        email: user.user?.user?.email || "",
        password: "",
        contact: user.user?.user?.contact || "",
        firstName: user.user?.fname || "",
        lastName: user.user?.lname || "",
        dob: user.user?.dob || "",
        aadhaar: user.user?.aadhaar || "",
        stateid: user.user?.stateid || "",
        cityid: user.user?.cityid || "",
      });
    }
  }, [user]);

  const handleEditableChange = (e) => {
    const { name, value } = e.target;
    setEditableFields((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error when user starts typing
    setValidationErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
  useEffect(() => {
    if (successMessage || failureMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
        setFailureMessage(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, failureMessage]);

  const validateFields = () => {
    const errors = {};
    const regexPatterns = {
      email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      contact: /^[0-9]{10}$/,
    };

    if (!editableFields.email || !regexPatterns.email.test(editableFields.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!editableFields.contact || !regexPatterns.contact.test(editableFields.contact)) {
      errors.contact = "Please enter a valid 10-digit contact number.";
    }

    if (!editableFields.firstName) {
      errors.firstName = "First name is required.";
    }

    if (!editableFields.lastName) {
      errors.lastName = "Last name is required.";
    }

    if (!editableFields.stateid) {
      errors.stateid = "Please select a state.";
    }

    if (!editableFields.cityid) {
      errors.cityid = "Please select a city.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    const updatedData = {
      custid: customerData?.user?.custid,
      userid: customerData?.user?.userid,
      fname: editableFields.firstName,
      lname: editableFields.lastName,
      street: customerData?.user?.street,
      cityid: editableFields.cityid,
      pincode: customerData?.user?.pincode,
      aadhaar: customerData?.user?.aadhaar,
      dob: customerData?.user?.dob,
      user: {
        userid: customerData?.user?.userid,
        password: editableFields.password,
        contact: editableFields?.contact,
        email: editableFields.email,
        qid: customerData?.user?.questions?.qid,
        securityqans: customerData?.user?.user?.securityqans,
      },
    };
    console.log(updatedData);

    try {
      const response = await fetch(
        `https://localhost:9145/EventRegistration/updateCustomerDetails`,
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
        setFailureMessage("Failed to update profile.");
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setSuccessMessage("Profile updated successfully!");
      console.log(result);
    } catch (err) {
      console.error("Error during PUT request:", err);
      setFailureMessage("Failed to update profile.");
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
                    value={customerData?.user?.user?.email || ""}
                    disabled
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Contact</label>
                  <input
                    type="text"
                    className="form-control"
                    value={customerData?.user?.user?.contact || ""}
                    disabled
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={customerData?.user?.fname || ""}
                    disabled
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={customerData?.user?.lname || ""}
                    disabled
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    value={customerData?.user?.dob || ""}
                    disabled
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Aadhaar Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={customerData?.user?.aadhaar || ""}
                    disabled
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    className="form-control"
                    value={customerData?.user?.cities?.states?.statename || ""}
                    disabled
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    value={customerData?.user?.cities?.cityname || ""}
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
                  />
                  {validationErrors.email && (
                    <div className="text-danger">{validationErrors.email}</div>
                  )}
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Contact</label>
                  <input
                    type="text"
                    name="contact"
                    className="form-control"
                    value={editableFields.contact}
                    onChange={handleEditableChange}
                  />
                  {validationErrors.contact && (
                    <div className="text-danger">{validationErrors.contact}</div>
                  )}
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    value={editableFields.firstName}
                    onChange={handleEditableChange}
                  />
                  {validationErrors.firstName && (
                    <div className="text-danger">{validationErrors.firstName}</div>
                  )}
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    value={editableFields.lastName}
                    onChange={handleEditableChange}
                  />
                  {validationErrors.lastName && (
                    <div className="text-danger">{validationErrors.lastName}</div>
                  )}
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">State</label>
                  <select
                    name="stateid"
                    className="form-control"
                    value={editableFields.stateid}
                    onChange={handleEditableChange}
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.stateid} value={state.stateid}>
                        {state.statename}
                      </option>
                    ))}
                  </select>
                  {validationErrors.stateid && (
                    <div className="text-danger">{validationErrors.stateid}</div>
                  )}
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">City</label>
                  <select
                    name="cityid"
                    className="form-control"
                    value={editableFields.cityid}
                    onChange={handleEditableChange}
                    disabled={!editableFields.stateid}
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city.cityid} value={city.cityid}>
                        {city.cityname}
                      </option>
                    ))}
                  </select>
                  {validationErrors.cityid && (
                    <div className="text-danger">{validationErrors.cityid}</div>
                  )}
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>

      {successMessage && (
        <div
          className="alert alert-success"
          style={{ position: "fixed", top: "500px", right: "500px", zIndex: 9999 }}
        >
          {successMessage}
        </div>
      )}
      {failureMessage && (
        <div
          className="alert alert-danger"
          style={{ position: "fixed", top: "500px", right: "500px", zIndex: 9999 }}
        >
          {failureMessage}
        </div>
      )}
    </div>
  );
};

export default UpdateProfileComponent;
