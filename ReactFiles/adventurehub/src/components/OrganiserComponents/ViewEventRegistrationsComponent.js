import React, { useState, useEffect } from "react";
import "../../styles/OrganiserStyles/ViewEventRegistrationsComponent.css";
import { FaUser , FaEnvelope, FaPhone, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function ViewEventRegistrationsComponent({ eventId }) {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    fetch(`/api/events/${eventId}/registrations`)
      .then((response) => response.json())
      .then((data) => {
        setRegistrations(data);
      })
      .catch((error) => {
        console.error("Error fetching registrations", error);
      });
  }, [eventId]);

  return (
    <div className="view-registrations-container">
      <h2 className="view-registrations-title">🎟️ Event Registrations</h2>
      {registrations.length === 0 ? (
        <p className="no-registrations">No registrations found.</p>
      ) : (
        <div className="table-container">
          <div className="table">
            <div className="table-row">
              <div className="table-header">Name</div>
              <div className="table-header">Email</div>
              <div className="table-header">Phone</div>
              <div className="table-header">Status</div>
            </div>
            {registrations.map((registration, index) => (
              <div key={index} className="table-row">
                <div className="table-cell participant-name">
                  <FaUser  className="icon" /> {registration.name}
                </div>
                <div className="table-cell participant-info">
                  <FaEnvelope className="icon" /> {registration.email}
                </div>
                <div className="table-cell participant-info">
                  <FaPhone className="icon" /> {registration.phone}
                </div>
                <div className={`table-cell view-registrations-status view-registrations-status-${registration.status.toLowerCase()}`}>
                  {registration.status === "Confirmed" ? (
                    <>
                      <FaCheckCircle className="icon confirmed-icon" /> Confirmed
                    </>
                  ) : (
                    <>
                      <FaTimesCircle className="icon pending-icon" /> Pending
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewEventRegistrationsComponent;