import React, { useState } from "react";
import "../styles/ManageEventComponent.css";

function ManageEventComponent() {
  const [activeTab, setActiveTab] = useState("view");

  // Handlers to set active tab
  const handleViewDetails = () => setActiveTab("view");
  const handleUpdateDetails = () => setActiveTab("update");
  const handleCancelEvent = () => setActiveTab("cancel");

  return (
    <div className="manage-event-container">
      <div className="sidebar">
        <button
          className="btn btn-primary w-100 mb-3"
          onClick={handleViewDetails}
        >
          View Event Details
        </button>
        <button
          className="btn btn-success w-100 mb-3"
          onClick={handleUpdateDetails}
        >
          Update Event Details
        </button>
        <button
          className="btn btn-danger w-100"
          onClick={handleCancelEvent}
        >
          Cancel Event
        </button>
      </div>
      <div className="content">
        {activeTab === "view" && (
          <div className="view-event">
            <h3>View Event Details</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Date and Time</th>
                  <th>Location</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Adventure Trekking</td>
                  <td>2025-01-10 09:00 AM</td>
                  <td>Mountain Base Camp</td>
                  <td>A thrilling adventure trek through the mountains.</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {activeTab === "update" && (
          <div className="update-event">
            <h3>Update Event Details</h3>
            <form>
              <div className="form-group mb-3">
                <label>Event Name (Not Editable)</label>
                <input
                  type="text"
                  className="form-control"
                  value="Adventure Trekking"
                  readOnly
                />
              </div>
              <div className="form-group mb-3">
                <label>Change Date and Time</label>
                <input type="datetime-local" className="form-control" />
              </div>
              <div className="form-group mb-3">
                <label>Update Location</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter new location"
                />
              </div>
              <div className="form-group mb-3">
                <label>Edit Description</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Enter new description"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-success">
                Save Changes
              </button>
            </form>
          </div>
        )}
        {activeTab === "cancel" && (
          <div className="cancel-event">
            <h3>Cancel Event</h3>
            <form>
              <div className="form-group mb-3">
                <label>Reason for Cancellation (Optional)</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Enter reason (if any)"
                ></textarea>
              </div>
              <div className="form-group mb-3">
                <input
                  type="checkbox"
                  id="notify"
                  className="form-check-input"
                />
                <label htmlFor="notify" className="form-check-label ms-2">
                  Notify Registered Participants
                </label>
              </div>
              <button type="submit" className="btn btn-danger">
                Cancel Event
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageEventComponent;
