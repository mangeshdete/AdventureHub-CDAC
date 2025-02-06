import React, { useState, useEffect } from "react";
import "../../styles/OrganiserStyles/CreateEventComponent.css";

function CreateEventComponent({ cityid: propCityid }) {
  const [eventDetails, setEventDetails] = useState({
    eventid: "",
    organiserid: 1,
    eventdate: "",
    eventtime: "",
    price: "",
    capacity: "",
    status: "PROCESSING",
    street: "",
    cityid: propCityid || "",
    pincode: "",
    stateid: "",
    categoryId: "",
  });

  const regexPatterns = {
    price: /^\d+(\.\d{1,2})?$/,
    capacity: /^\d+$/,
    street:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9\s,'-]{3,}$/,
    pincode: /^\d{6}$/,
  };

  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch("https://localhost:9144/Category/GetAllCategories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));

    fetch("http://localhost:8142/getAllStates")
      .then((resp) => resp.json())
      .then((data) => setStates(data))
      .catch((e) => console.log(e));
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setEventDetails((prev) => ({
      ...prev,
      categoryId: selectedCategoryId,
      eventid: "",
    }));

    if (selectedCategoryId) {
      fetch(`https://localhost:9144/Event/GetAllEventsFromCategoryId?catId=${selectedCategoryId}`)
        .then((response) => response.json())
        .then((data) => setEvents(data))
        .catch((error) => console.error("Error fetching events:", error));
    } else {
      setEvents([]);
    }
  };

  const handleStateChange = (e) => {
    const selectedStateId = e.target.value;
    setEventDetails((prev) => ({
      ...prev,
      stateid: selectedStateId,
      cityid: "",
    }));

    if (selectedStateId) {
      fetch(`http://localhost:8142/getCitiesByStateId?stateId=${selectedStateId}`)
        .then((resp) => resp.json())
        .then((data) => setCities(data))
        .catch((e) => console.log(e));
    } else {
      setCities([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!eventDetails.eventid || !eventDetails.eventdate || !eventDetails.cityid) {
      alert("Please fill out all required fields.");
      return;
    }

    if (eventDetails.price && !regexPatterns.price.test(eventDetails.price)) {
      alert("Invalid price format. Please enter a valid price.");
      return;
    }
    if (eventDetails.street && !regexPatterns.street.test(eventDetails.street)) {
      alert("Invalid street format. Please enter a valid street address.");
      return;
    }
    if (eventDetails.pincode && !regexPatterns.pincode.test(eventDetails.pincode)) {
      alert("Invalid pincode format. Please enter a valid 6-digit pincode.");
      return;
    }
    if (eventDetails.capacity && !regexPatterns.capacity.test(eventDetails.capacity)) {
      alert("Invalid capacity. Please enter a valid integer value.");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const enteredDate = new Date(eventDetails.eventdate);
    if (enteredDate < today) {
      alert("Event date cannot be in the past.");
      return;
    }

    // const payload = {
    //   eventid: parseInt(eventDetails.eventid),
    //   organiserid: 1,
    //   eventdate: eventDetails.eventdate,
    //   eventtime: eventDetails.eventtime+":00" || "00:00:00",
    //   price: parseFloat(eventDetails.price) || 0,
    //   capacity: parseInt(eventDetails.capacity) || 0,
    //   status: "PROCESSING",
    //   street: eventDetails.street,
    //   cityid: parseInt(eventDetails.cityid),
    //   pincode: eventDetails.pincode,
    //   stateid: parseInt(eventDetails.stateid),
    //   categoryid: parseInt(eventDetails.categoryId)
    // };

    const payload = {
      eventid: parseInt(eventDetails.eventid) || 0,
      organiserid: 1,
      eventdate: eventDetails.eventdate || "1970-01-01",  // Fallback to a default date
      eventtime: eventDetails.eventtime ? eventDetails.eventtime + ":00" : "00:00:00",
      price: parseFloat(eventDetails.price) || 0,
      capacity: parseInt(eventDetails.capacity) || 0,
      status: "PROCESSING",
      street: eventDetails.street || "",
      cityid: parseInt(eventDetails.cityid) || 0,
      pincode: eventDetails.pincode || "",
      stateid: parseInt(eventDetails.stateid) || 0,
      categoryid: parseInt(eventDetails.categoryId) || 0
    };
    

    console.log(payload);

    // fetch("https://localhost:9144/PublishEvent/PublishNewEvent", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(payload),
    // })
    //   .then((response) => {
    //     if (response.ok) return response.json();
    //   })
    //   .then((data) => {
    //     console.log("Event Created:", data);
    //     alert("Event created successfully!");
    //   })
    //   .catch((error) => {
    //     console.error("Error creating event:", error);
    //     alert("There was an error creating the event.");
    //   });
  

  fetch("https://localhost:9144/PublishEvent/PublishNewEvent", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.text();
  })
  .then((data) => {
         console.log("Event Created:", data);
         alert("Event created successfully!");
       })
  .catch((error) => {
        console.error("Error creating event:", error);
        alert("There was an error creating the event.");
      });
};

  return (
    <div className="event-form-container">
      <h2 className="form-title" class = "text-center mb-4" >Create Event</h2>
      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-row">
          <div className="form-column">
            <label className="form-label">Category*</label>
            <select
              className="form-control"
              name="categoryId"
              value={eventDetails.categoryId}
              onChange={handleCategoryChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.categoryid} value={category.categoryid}>
                  {category.categoryname}
                </option>
              ))}
            </select>
          </div>
          <div className="form-column">
            <label className="form-label">Event*</label>
            <select
              className="form-control"
              name="eventid"
              value={eventDetails.eventid}
              onChange={handleChange}
              required
            >
              <option value="">Select Event</option>
              {events.map((event) => (
                <option key={event.eventid} value={event.eventid}>
                  {event.eventname}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-column">
            <label className="form-label">Date*</label>
            <input
              type="date"
              className="form-control"
              name="eventdate"
              value={eventDetails.eventdate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-column">
            <label className="form-label">Time*</label>
            <input
              type="time"
              className="form-control"
              name="eventtime"
              value={eventDetails.eventtime}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-column">
            <label className="form-label">Price per Person</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={eventDetails.price}
              onChange={handleChange}
            />
          </div>
          <div className="form-column">
            <label className="form-label">Capacity</label>
            <input
              type="number"
              className="form-control"
              name="capacity"
              value={eventDetails.capacity}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-column">
            <label className="form-label">State</label>
            <select
              className="form-control"
              name="stateid"
              value={eventDetails.stateid}
              onChange={handleStateChange}
              required
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.stateid} value={state.stateid}>
                  {state.statename}
                </option>
              ))}
            </select>
          </div>
          <div className="form-column">
            <label className="form-label">City</label>
            <select
              className="form-control"
              name="cityid"
              value={eventDetails.cityid}
              onChange={handleChange}
              required
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

        <div className="form-group">
          <label className="form-label">Street</label>
          <input
            type="text"
            className="form-control"
            name="street"
            value={eventDetails.street}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Pincode</label>
          <input
            type="text"
            className="form-control"
            name="pincode"
            value={eventDetails.pincode}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="form-submit-btn">
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateEventComponent;


// {
//   "capacity":20,
//   "categoryid":1,
//   "cityid":67,
//   "eventdate":"2025-02-27",
//   "eventid":7,
//   "eventtime":"17:30:00",
//   "organiserid":1,
//   "pincode":"432345",
//   "price":100,
//   "stateid":14,
//   "status":"PROCESSING",
//   "street":"2,Hera Chowak"
//   }