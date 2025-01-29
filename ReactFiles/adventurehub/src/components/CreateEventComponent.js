import React, { useState } from "react";

function CreateEventComponent() {
  const [eventDetails, setEventDetails] = useState({
    name: "",
    date: "",
    location: "",
    description: "",
    price: "",
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!eventDetails.name || !eventDetails.date || !eventDetails.location) {
      alert("Please fill out all required fields.");
      return;
    }
    // Mock database save
    console.log("Event Created:", eventDetails);
    alert("Event created successfully!");
    setEventDetails({
      name: "",
      date: "",
      location: "",
      description: "",
      price: "",
      contact: "",
    });
  };

  return (
    <div className="card p-3">
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Event Name*</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={eventDetails.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date and Time*</label>
          <input
            type="datetime-local"
            className="form-control"
            name="date"
            value={eventDetails.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Location*</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={eventDetails.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={eventDetails.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={eventDetails.price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contact Information</label>
          <input
            type="text"
            className="form-control"
            name="contact"
            value={eventDetails.contact}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateEventComponent;
