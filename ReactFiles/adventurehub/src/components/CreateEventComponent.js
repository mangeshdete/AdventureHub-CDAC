import React, { useState } from "react";
import "../styles/CreateEventComponent.css";

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
    <div className="event-card p-3">
      <h2 className="event-title">Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="event-form-group">
          <div className="event-form-field">
            <label className="event-form-label">Event Name*</label>
            <input
              type="text"
              className="event-form-control"
              name="name"
              value={eventDetails.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="event-form-field">
            <label className="event-form-label">Date and Time*</label>
            <input
              type="datetime-local"
              className="event-form-control"
              name="date"
              value={eventDetails.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="event-form-group">
          <div className="event-form-field">
            <label className="event-form-label">Location*</label>
            <input
              type="text"
              className="event-form-control"
              name="location"
              value={eventDetails.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="event-form-field">
            <label className="event-form-label">Price</label>
            <input
              type="number"
              className="event-form-control"
              name="price"
              value={eventDetails.price}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="event-form-group">
          <div className="event-form-field">
            <label className="event-form-label">Contact Information</label>
            <input
              type="text"
              className="event-form-control"
              name="contact"
              value={eventDetails.contact}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="event-form-group">
          <label className="event-form-label">Description</label>
          <textarea
            className="event-form-control event-textarea"
            name="description"
            value={eventDetails.description}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="event-btn-primary">
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateEventComponent;
