import React, { useState, useEffect } from "react";
import "../../styles/OrganiserStyles/ViewEventRegistrationsComponent.css";
//import { FaUser , FaEnvelope, FaPhone, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

function ViewEventRegistrationsComponent() {
  
  const [events, setEvents] = useState([]);
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  
  // Fetch organiserId from Redux store
  const organiser = useSelector((state) => state.user?.user);

  // Fetch events by organiser ID
  useEffect(() => {
    if (organiser?.organiserid) {
      fetch(`http://localhost:8140/organiser/PublishEvent/GetPublishedEventsByOrganiserId?orgId=${organiser.organiserid}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched Events:", data);
          setEvents(data);
        })
        .catch((error) => console.error("Error fetching events:", error));
    }
  }, [organiser?.organiserid]); // Re-run when organiser ID changes

  // Fetch participants dynamically when an event is expanded
  const toggleParticipants = (eventId) => {
    if (expandedEvent === eventId) {
      setExpandedEvent(null);
      setParticipants([]); // Clear participants when collapsing
    } else {
      setExpandedEvent(eventId);
      console.log("Selected Event ID:", eventId);
      console.log("Organiser ID:", organiser.organiserid);

      fetch(`http://localhost:8140/organiser/EventRegistration/GetEventRegistrationsByEventIdAndOrganiserById?eventId=${eventId}&orgId=${organiser.organiserid}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched Participants:", data);
          setParticipants(data);
        })
        .catch((error) => console.error("Error fetching participants:", error));
    }
  };


  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 border-0 w-75" style={{ maxHeight: "90vh", overflowY: "auto" }}>
        <table className="table table-hover table-bordered text-center align-middle">
          <thead className="table-primary">
            <tr>
              <th>Sr No</th>
              <th>Event Name</th>
              <th>City</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ? (
              events.map((event, index) => (
                <React.Fragment key={event.eventid}>
                  <tr className="fw-bold">
                    <td>{index + 1}</td>
                    <td>{event.eventname}</td>
                    <td>{event.cityname}</td>
                    <td>
                      <span className={`badge ${
                        event.status === "ACTIVE"
                          ? "bg-success"
                          : event.status === "CANCELLED"
                          ? "bg-danger"
                          : event.status === "TO_BE_CANCELLED"
                          ? "bg-warning text-dark"
                          : event.status === "PROCESSING"
                          ? "bg-warning"
                          : "bg-secondary"
                      }`}>
                        {event.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => toggleParticipants(event.publishid)}
                      >
                        {expandedEvent === event.publishid ? "Hide Participants" : "View Participants"}
                      </button>
                    </td>
                  </tr>
                  {expandedEvent === event.publishid && (
                    <tr>
                      <td colSpan="5">
                        <div className="border rounded p-3 bg-light" style={{ maxHeight: "200px", overflowY: "auto" }}>
                          <h6 className="text-center mb-3 text-primary">Participants</h6>
                          {participants.length > 0 ? (
                            <table className="table table-striped">
                              <thead className="table-secondary">
                                <tr>
                                  <th>First Name</th>
                                  <th>Last Name</th>
                                  <th>Date of Birth</th>
                                  <th>Contact No</th>
                                </tr>
                              </thead>
                              <tbody>
                                {participants.map((participant, i) => (
                                  <tr key={i}>
                                    <td>{participant.fname}</td>
                                    <td>{participant.lname}</td>
                                    <td>{participant.dob}</td>
                                    <td>{participant.contact}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <p className="text-center text-muted">No Participants Found</p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted">No Events Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewEventRegistrationsComponent;