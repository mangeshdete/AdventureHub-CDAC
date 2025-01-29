import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function ViewRegistrationsComponent() {
  const [expandedEvent, setExpandedEvent] = useState(null);

  // Sample data (Replace with actual data)
  const events = [
    {
      id: 1,
      date: "2025-02-15",
      name: "Tech Conference",
      status: "Upcoming",
      participants: ["Tejas Shinkar", "Gaurav Varade", "Mangesh Dete"]
    },
    {
      id: 2,
      date: "2025-03-10",
      name: "Music Fest",
      status: "Completed",
      participants: ["Alice Brown", "Mark Taylor", "Sophia Wilson", "Emma Watson", "Elon Musk"]
    }
  ];

  const toggleParticipants = (id) => {
    setExpandedEvent(expandedEvent === id ? null : id);
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 border-0 w-75" style={{ maxHeight: "90vh", overflowY: "auto" }}>
        <table className="table table-hover table-bordered text-center align-middle">
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Event Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <>
                <tr key={event.id} className="fw-bold">
                  <td>{index + 1}</td>
                  <td>{event.date}</td>
                  <td>{event.name}</td>
                  <td>
                    <span className={`badge ${event.status === "Upcoming" ? "bg-success" : "bg-secondary"}`}>
                      {event.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => toggleParticipants(event.id)}
                    >
                      {expandedEvent === event.id ? "Hide Participants" : "View Participants"}
                    </button>
                  </td>
                </tr>
                {expandedEvent === event.id && (
                  <tr>
                    <td colSpan="5">
                      <div className="border rounded p-3 bg-light" style={{ maxHeight: "200px", overflowY: "auto" }}>
                        <h6 className="text-center mb-3 text-primary">Participants</h6>
                        <ul className="list-group list-group-flush">
                          {event.participants.map((participant, i) => (
                            <li key={i} className="list-group-item">
                              {participant}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewRegistrationsComponent;
