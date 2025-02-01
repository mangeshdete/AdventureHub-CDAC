import React, { useState, useEffect } from "react";
import "../styles/ViewEventRegistrationsComponent.css";
import { FaUser, FaEnvelope, FaPhone, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

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
    <div className="registrations-container">
      <h2 className="registrations-title">🎟️ Event Registrations</h2>
      {registrations.length === 0 ? (
        <p className="no-registrations">No registrations found.</p>
      ) : (
        <div className="registrations-list">
          {registrations.map((registration, index) => (
            <div key={index} className="registration-card">
              <h3 className="participant-name">
                <FaUser className="icon" /> {registration.name}
              </h3>
              <p className="participant-info">
                <FaEnvelope className="icon" /> {registration.email}
              </p>
              <p className="participant-info">
                <FaPhone className="icon" /> {registration.phone}
              </p>
              <p className={`status ${registration.status === "Confirmed" ? "confirmed" : "pending"}`}>
                {registration.status === "Confirmed" ? (
                  <>
                    <FaCheckCircle className="icon confirmed-icon" /> Confirmed
                  </>
                ) : (
                  <>
                    <FaTimesCircle className="icon pending-icon" /> Pending
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewEventRegistrationsComponent;
