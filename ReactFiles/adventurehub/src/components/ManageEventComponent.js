import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

function ViewRegistrationsComponent() {
  const [activeTab, setActiveTab] = useState("view");
  const [events, setEvents] =useState([]);

  const organiser = useSelector((state) => state.user.user);

  useEffect(() =>{
    if (organiser?.organiserid) {
      fetch(`https://localhost:9144/PublishEvent/GetPublishedEventsByOrganiserId?orgId=${organiser.organiserid}`)
        .then((response) => response.json())
        .then((data) => {
          setEvents(data);
        })
        .catch((error) => console.error("Error fetching events:", error));
    }
  }, [organiser?.organiserid]); // Re-run when organiser ID changes
  

  return (
    <div className="container-fluid d-flex flex-column align-items-center vh-100 bg-light p-4">
      {/* Title */}
      <h3 className="mb-4" > Manage Events </h3>

      {/* Content */}
      <div className="w-75">
        {activeTab === "view" && (
          <div>
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
                {events.map((event, index) => (
                  <tr key={event.id} className="fw-bold">
                    <td>{index + 1}</td>
                    <td>{event.eventname}</td>
                    <td>{event.cityname}</td>
                    <td>
                      <span className={`badge ${event.status === "Upcoming" ? "bg-success" : "bg-secondary"}`}>
                        {event.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-primary btn-sm me-2"
                        onClick={() => setActiveTab("update")}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => setActiveTab("cancel")}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
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
              <button type="button" className="btn btn-secondary ms-2" onClick={() => setActiveTab("view")}>Back</button>
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
              <button type="button" className="btn btn-secondary ms-2" onClick={() => setActiveTab("view")}>Back</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewRegistrationsComponent;
