import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

function ViewRegistrationsComponent() {
  const [activeTab, setActiveTab] = useState("view");
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [eventDetails, setEventDetails] = useState(null);

  
  const organiser = useSelector((state) => state.user?.user);

 
  useEffect(() => {
    if (organiser?.organiserid) {
      fetch(`https://localhost:9144/PublishEvent/GetPublishedEventsByOrganiserId?orgId=${organiser.organiserid}`)
        .then((response) => response.json())
        .then((data) => {
          setEvents(data);
        })
        .catch((error) => console.error("Error fetching events:", error));
    }
  }, [organiser?.organiserid]);

  const handleUpdateClick = (eventId) => {
    console.log(eventId);
    setSelectedEventId(eventId);
    setActiveTab("update");
  
    fetch(`https://localhost:9144/PublishEvent/GetPublishedEventById?id=${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        setEventDetails(data);
      })
      .catch((error) => console.error("Error fetching event details:", error));
  };
  

  return (
    <div className="container-fluid d-flex flex-column align-items-center vh-100 bg-light p-4">
      <h3 className="mb-4">Manage Events</h3>
      <div className="w-75">
        {activeTab === "view" && (
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
                    <button className="btn btn-outline-primary btn-sm me-2" onClick={() => handleUpdateClick(event.eventid)}>
                      Update
                    </button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => setActiveTab("cancel")}>
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === "update" && eventDetails && (
          <div>
            <h3>Update Event Details</h3>
            <form>
              <div className="form-group mb-3">
                <label>Event Name</label>
                <input type="text" className="form-control" value={eventDetails.eventname} readOnly />
              </div>
              <div className="form-group mb-3">
                <label>Price</label>
                <input type="text" className="form-control" value={eventDetails.price} readOnly />
              </div>
              <div className="form-group mb-3">
                <label>Total Capacity</label>
                <input type="number" className="form-control" value={eventDetails.capacity} readOnly />
              </div>
              <div className="form-group mb-3">
                <label>Date and Time</label>
                <input type="datetime-local" className="form-control" value={eventDetails.eventdate} />
              </div>
              <div className="form-group mb-3">
                <label>Date and Time</label>
                <input type="datetime-local" className="form-control" value={eventDetails.eventtime} />
              </div>

              <button type="button" className="btn btn-warning mb-3">
                Check for ability to update
              </button>

              <div className="form-group mb-3">
                <label>Address of the event</label>
                <input type="text" className="form-control" value={eventDetails.address} />
              </div>
              <button type="button" className="btn btn-info mb-3">
                Update Address
              </button>

              <button type="submit" className="btn btn-success me-2">
                Update Event
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setActiveTab("view")}>
                Cancel
              </button>
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
              <button type="button" className="btn btn-secondary ms-2" onClick={() => setActiveTab("view")}>
                Back
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewRegistrationsComponent;
