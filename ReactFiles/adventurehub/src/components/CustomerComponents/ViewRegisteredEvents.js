import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

function ViewRegisteredEvents() {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null); // To track which event's details are visible
  const [selectedEvent, setSelectedEvent] = useState(null); // To store event details
  const user = useSelector((state) => state.user.user);

  // Fetch registered events when the component loads
  useEffect(() => {
    console.log(user.custid);
    fetch(`https://localhost:9145/EventRegistration/GetEventRegistrationsByCustId?cid=${user.custid}`) // Replace with actual API endpoint
      .then((response) => response.json())
      .then((data) => {
      console.log(data);
      setEvents(data)})
      .catch((error) => console.error("Error fetching events:", error));
  }, [user.custid]);

  // Function to fetch event details when "View Details" is clicked
  const handleViewDetails = (eventid) => {
    // Toggle visibility of the event details
    if (selectedEventId === eventid) {
      setSelectedEventId(null); // If the same event is clicked, hide details
      setSelectedEvent(null); // Clear event details
    } else {
      setSelectedEventId(eventid); // Show the details for the selected event
      // Fetch event details for the selected event
      fetch(`https://localhost:9145/EventRegistration/GetEventRegistrationDetailsByEventId?eid=${eventid}`) // Replace with actual API endpoint
        .then((response) => response.json())
        .then((data) => {
          setSelectedEvent(data[0]); // Set the event details
        })
        .catch((error) => console.error("Error fetching event details:", error));
    }
  };

  // Function to convert rating number to stars
  const renderStars = (rating) => {
    const starSymbol = "⭐";
    return starSymbol.repeat(rating); // Repeat the star symbol for the given rating
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary fw-bold mb-4">Registered Events</h2>
      <div className="table-responsive shadow-lg rounded-3">
        <table className="table table-hover table-striped table-bordered">
          <thead className="bg-dark text-white">
            <tr>
              <th className="p-3 fs-5">Event Name</th>
              <th className="p-3 fs-5">Date & Time</th>
              <th className="p-3 fs-5">Location</th>
              <th className="p-3 fs-5">Status</th>
              <th className="p-3 fs-5">Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <React.Fragment key={event.eventId}>
                <tr className="align-middle">
                  <td className="p-4 fw-bold text-primary">{event.eventname}</td>
                  <td className="p-4">{event.eventdate}, {event.eventtime}</td>
                  <td className="p-4"><span
                      className={`badge ${
                        event.status === "ACTIVE"
                          ? "bg-success"
                          : event.status === "CANCELLED"
                          ? "bg-danger"
                          : event.status === "TO_BE_CANCELLED"
                          ? "bg-warning text-dark"
                          : event.status === "PROCESSING"
                          ? "bg-warning"
                          : "bg-secondary"
                      }`}
                    >
                      {event.status}
                    </span></td>
                  <td className="p-4">{event.cityname}</td>
                  <td className="p-4">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleViewDetails(event.eventid)}
                    >
                      {selectedEventId === event.eventid ? "Hide Details" : "View Details"}
                    </button>
                  </td>
                </tr>
                {selectedEventId === event.eventid && selectedEvent && (
                  <tr className="bg-light">
                    <td colSpan="4">
                      <div className="card shadow-sm border-0 p-3">
                        <h5 className="text-primary">{selectedEvent.eventname}</h5>
                        <p className="mb-1">
                          <strong>Organizer:</strong> {selectedEvent.orgname}
                        </p>
                        <p className="mb-1">
                          <strong>Ratings:</strong> {renderStars(selectedEvent.rating)}
                        </p>
                        <p className="mb-1">
                          <strong>Date & Time:</strong> {selectedEvent.eventdate}, {selectedEvent.eventtime}  
                        </p>
                        <p className="mb-1">
                          <strong>Amount Paid:</strong> {selectedEvent.price}.00 Rs
                        </p>
                        <p className="mb-1">
                          <strong>Contact:</strong> +91 {selectedEvent.contact}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewRegisteredEvents;
