//Updat event Component  added 
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

const UpdateProfileComponent = () => {
  const user = useSelector((state) => state.user.user);
  console.log("User from Redux:", user); // Debugging line

  // Initialize states only if user is available
  const [organiserData, setOrganiserData] = useState(user || {});
  const [editableFields, setEditableFields] = useState({
    email: user?.user?.email || "", // Access nested email
    contact: user?.user?.contact || "", // Access nested contact
  });

  // Update states when user changes
  useEffect(() => {
    if (user) {
      setOrganiserData(user);
      setEditableFields({
        email: user.user?.email || "", // Access nested email
        contact: user.user?.contact || "", // Access nested contact
      });
    }
  }, [user]);

  const regexPatterns = {
    orgname: /^[A-Za-z0-9\s\-'&()]+$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    contactno: /^[0-9]{10}$/,
    // street: /^(?=.[A-Za-z])(?=.\d)[A-Za-z0-9\s,'-]{3,}$/,
    pincode: /^\d{6}$/,
  };

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
        email: user.user?.email || "", // Access nested email
        contact: user.user?.contact || "", // Access nested contact
      });
    }
  };

  // Handle form submission
  const handleSubmit = async(e) => {
  e.preventDefault();

  // Construct the updatedData object in the required format
  const updatedData = {
    organiserid: organiserData.organiserid, // Include organiserid
    userid: organiserData.user?.userid, // Include userid
    orgname: organiserData.orgname,
    gst: organiserData.gst,
    pancard: organiserData.pancard,
    street: organiserData.street,
    cityid: organiserData.cityid, // Include cityid
    pincode: organiserData.pincode,
    user: {
      userid: organiserData.user?.userid, // Include userid
      password: organiserData.user?.password, // Include password
      contact: editableFields.contact, // Use updated contact
      email: editableFields.email, // Use updated email
      securityqid: organiserData.user?.securityqid, // Include securityqid
      securityqans: organiserData.user?.securityqans, // Include securityqans
    },
  };

  console.log("Data being sent to the server:", updatedData); // Debugging line

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

  // if (!regexPatterns.street.test(updatedData.street)) {
  //   alert("Street address must contain at least one letter and one number.");
  //   return;
  // }

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
      const errorResponse = await response.json(); // Parse the error response
      console.error("Server error response:", errorResponse);
      throw new Error(Error+" : "+`${response.statusText}`);
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
      <form onSubmit={handleSubmit} className="card p-4 shadow">
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

          {/* GST */}
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

          {/* Pancard */}
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

          {/* State Selection */}
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

          {/* City Selection */}
          <div className="col-md-6 mb-3">
            <label className="form-label">City</label>
            <select
              name="cityid"
              className="form-select"
              value={organiserData.cityid || ""}
              onChange={handleChange}
              disabled={!organiserData.stateid} // Disable city dropdown if no state is selected
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