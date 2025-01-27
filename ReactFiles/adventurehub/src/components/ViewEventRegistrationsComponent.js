import React, { useState, useEffect } from "react";
import axios from "axios"; // or any other data fetching library
import "../styles/ViewEventRegistrationsComponent.css";

function ViewEventRegistrationsComponent({ eventId }) {
  const [registrations, setRegistrations] = useState([]);

  // Fetch event registrations from API or mock data source
  useEffect(() => {
    // Mock API call (replace with actual API call)
    axios.get(`/api/events/${eventId}/registrations`)
      .then((response) => {
        setRegistrations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching registrations", error);
      });
  }, [eventId]);

  return (
    <div className="container view-registrations-container">
      <h3 className="mb-4">Event Registrations</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Participant Name</th>
            <th>Contact Information</th>
            <th>Registration Status</th>
          </tr>
        </thead>
        <tbody>
          {registrations.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">
                No registrations found.
              </td>
            </tr>
          ) : (
            registrations.map((registration, index) => (
              <tr key={index}>
                <td>{registration.name}</td>
                <td>
                  {registration.email} <br /> {registration.phone}
                </td>
                <td>{registration.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ViewEventRegistrationsComponent;
