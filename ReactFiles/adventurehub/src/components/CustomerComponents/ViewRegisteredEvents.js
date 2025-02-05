import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/CustomerStyles/ViewRegisteredEvents.css";

function ViewRegisteredEvents() {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    console.log(user.custid);
    fetch(`https://localhost:9145/EventRegistration/GetEventRegistrationsByCustId?cid=${user.custid}`)
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, [user.custid]);

  const handleViewDetails = (eventid) => {
    if (selectedEventId === eventid) {
      setSelectedEventId(null);
      setSelectedEvent(null);
    } else {
      setSelectedEventId(eventid);
      fetch(`https://localhost:9145/EventRegistration/GetEventRegistrationDetailsByEventId?eid=${eventid}`)
        .then((response) => response.json())
        .then((data) => {
          setSelectedEvent(data[0]);
        })
        .catch((error) => console.error("Error fetching event details:", error));
    }
  };

  const renderStars = (rating) => {
    const starSymbol = "⭐";
    return starSymbol.repeat(rating);
  };

  return (
    <div className="registered-events-container">
      <h2 className="registered-events-title">Registered Events</h2>
      <div className="registered-events-table-wrapper">
        <table className="registered-events-table">
          <thead className="registered-events-table-header">
            <tr>
              <th>Event Name</th>
              <th>Date & Time</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <React.Fragment key={event.eventId}>
                <tr className="registered-events-table-row">
                  <td className="event-name">{event.eventname}</td>
                  <td className="event-date-time">{event.eventdate}, {event.eventtime}</td>
                  <td className="event-location">{event.cityname}</td>
                  <td className="event-action">
                    <button
                      className="view-details-btn"
                      onClick={() => handleViewDetails(event.eventid)}
                    >
                      {selectedEventId === event.eventid ? "Hide Details" : "View Details"}
                    </button>
                  </td>
                </tr>
                {selectedEventId === event.eventid && selectedEvent && (
                  <tr className="event-details-row">
                    <td colSpan="4">
                      <div className="event-details-card">
                        <h5 className="event-details-title">{selectedEvent.eventname}</h5>
                        <p className="event-details-info">
                          <strong>Organizer:</strong> {selectedEvent.orgname}
                        </p>
                        <p className="event-details-info">
                          <strong>Ratings:</strong> {renderStars(selectedEvent.rating)}
                        </p>
                        <p className="event-details-info">
                          <strong>Date & Time:</strong> {selectedEvent.eventdate}, {selectedEvent.eventtime}
                        </p>
                        <p className="event-details-info">
                          <strong>Amount Paid:</strong> {selectedEvent.price}.00 Rs
                        </p>
                        <p className="event-details-info">
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