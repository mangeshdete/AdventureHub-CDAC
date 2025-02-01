import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const UpdateProfileComponent = () => {
  const [organiserData, setOrganiserData] = useState({
    orgname: "",
    email: "",
    contact: "",
    gst: "",
    pancard: "",
    stateid: "",
    cityid: "",
    street: "",
    pincode: "",
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
      }
    }
    fetchStates();
  }, []);

  // Fetch all cities (independent of state selection)
  useEffect(() => {
    async function fetchAllCities() {
      try {
        const response = await fetch("http://localhost:8142/getAllCities");
        const data = await response.json();
        setCities(data);
      } catch (err) {
        console.error("Error fetching cities", err);
        setError("Failed to load cities.");
      }
    }
    fetchAllCities();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrganiserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Reset form
  const handleReset = () => {
    setOrganiserData({
      orgname: "",
      email: "",
      contact: "",
      gst: "",
      pancard: "",
      stateid: "",
      cityid: "",
      street: "",
      pincode: "",
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://localhost:9144/Organiser/updateOrganiserDetails",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(organiserData),
        }
      );

      if (!response.ok) {
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

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="row">
          {/* Organization Name */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Organization Name</label>
            <input
              type="text"
              name="orgname"
              className="form-control"
              value={organiserData.orgname}
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
              value={organiserData.email}
              onChange={handleChange}
            />
          </div>

          {/* Contact Number */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Contact Number</label>
            <input
              type="text"
              name="contact"
              className="form-control"
              value={organiserData.contact}
              onChange={handleChange}
            />
          </div>

          {/* GST */}
          <div className="col-md-6 mb-3">
            <label className="form-label">GST</label>
            <input
              type="text"
              name="gst"
              className="form-control"
              value={organiserData.gst}
              onChange={handleChange}
            />
          </div>

          {/* Pancard */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Pancard</label>
            <input
              type="text"
              name="pancard"
              className="form-control"
              value={organiserData.pancard}
              onChange={handleChange}
            />
          </div>

          {/* State Selection */}
          <div className="col-md-6 mb-3">
            <label className="form-label">State</label>
            <select
              name="stateid"
              className="form-select"
              value={organiserData.stateid}
              onChange={handleChange}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          {/* City Selection */}
          <div className="col-md-6 mb-3">
            <label className="form-label">City</label>
            <select
              name="cityid"
              className="form-select"
              value={organiserData.cityid}
              onChange={handleChange}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
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
              value={organiserData.street}
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
              value={organiserData.pincode}
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
