import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function ViewRegistrationsComponent() {
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [activeTab, setActiveTab] = useState("view");

  const events = [
    {
      id: 1,
      date: "2025-02-15",
      name: "Tech Conference",
      status: "Upcoming",
      participants: ["John Doe", "Jane Smith", "David Warner", "Chris Evans"]
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
    <div className="container-fluid d-flex vh-100 bg-light">
      {/* Sidebar */}
      <div className="bg-primary text-white p-4" style={{ width: "250px" }}>
        <h4>Manage Events</h4>
        <ul className="list-group list-group-flush">
          <li className={`list-group-item list-group-item-action ${activeTab === "view" ? "active" : ""}`} onClick={() => setActiveTab("view")}>
            View Event Details
          </li>
          <li className={`list-group-item list-group-item-action ${activeTab === "update" ? "active" : ""}`} onClick={() => setActiveTab("update")}>
            Update Event Details
          </li>
          <li className={`list-group-item list-group-item-action ${activeTab === "cancel" ? "active" : ""}`} onClick={() => setActiveTab("cancel")}>
            Cancel Event
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="flex-grow-1 p-4" style={{ overflowY: "auto" }}>
        {activeTab === "view" && (
          <div>
            <h3>View Event Details</h3>
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
                  <React.Fragment key={event.id}>
                    <tr className="fw-bold">
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
                          <div className="border rounded p-3 bg-white shadow-sm" style={{ maxHeight: "200px", overflowY: "auto", borderLeft: "5px solid #007bff" }}>
                            <h6 className="text-center mb-3 text-primary">Participants</h6>
                            <ul className="list-group list-group-flush">
                              {event.participants.map((participant, i) => (
                                <li key={i} className="list-group-item text-dark">
                                  {participant}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "update" && (
          <div>
            <h3>Update Event Details</h3>
            <form>
              <div className="form-group mb-3">
                <label>Event Name (Not Editable)</label>
                <input type="text" className="form-control" value="Selected Event" readOnly />
              </div>
              <div className="form-group mb-3">
                <label>Change Date and Time</label>
                <input type="datetime-local" className="form-control" />
              </div>
              <div className="form-group mb-3">
                <label>Update Location</label>
                <input type="text" className="form-control" placeholder="Enter new location" />
              </div>
              <div className="form-group mb-3">
                <label>Edit Description</label>
                <textarea className="form-control" rows="4" placeholder="Enter new description"></textarea>
              </div>
              <button type="submit" className="btn btn-success">Save Changes</button>
            </form>
          </div>
        )}

        {activeTab === "cancel" && (
          <div>
            <h3>Cancel Event</h3>
            <form>
              <div className="form-group mb-3">
                <label>Reason for Cancellation (Optional)</label>
                <textarea className="form-control" rows="4" placeholder="Enter reason (if any)"></textarea>
              </div>
              <div className="form-group mb-3">
                <input type="checkbox" id="notify" className="form-check-input" />
                <label htmlFor="notify" className="form-check-label ms-2">Notify Registered Participants</label>
              </div>
              <button type="submit" className="btn btn-danger">Cancel Event</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewRegistrationsComponent;
