import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

function ViewRegistrationsComponent() {
  const [activeTab, setActiveTab] = useState("view");
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(0);
  const [eventDetails, setEventDetails] = useState({});
  const [updatedEventDetails, setUpdatedEventDetails] = useState({});
  const [errors, setErrors] = useState({}); // To store validation errors
  const [cancellationReason, setCancellationReason] = useState(null);
  const [cancelEventMessage, setCancelEventMessage] = useState(null);
  const [isCanceling, setIsCanceling] = useState(false); // To handle button disable after click

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

  const handleUpdateClick = async (eventId) => {
    setSelectedEventId(eventId);

    try {
      const response = await fetch(`https://localhost:9144/PublishEvent/GetPublishedEventById?id=${eventId}`);
      const data = await response.json();
      setEventDetails(data[0]);
      setUpdatedEventDetails(data[0]);
      setActiveTab("update");
      setErrors({});
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEventDetails({
      ...updatedEventDetails,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (new Date(updatedEventDetails.eventdate) < new Date(eventDetails.eventdate)) {
      newErrors.eventdate = "New date must be after the original event date.";
    }

    if (updatedEventDetails.capacity < eventDetails.capacity) {
      newErrors.capacity = "New capacity must be greater than or equal to the original capacity.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const participantResponse = await fetch(
        `https://localhost:9144/EventRegistration/GetParticipantNumbersByPublishId?id=${eventDetails.publishid}`
      );
      const participantData = await participantResponse.json();
      const participantCount = Number(participantData);

      if (participantCount !== 0) {
        setErrors({ ...errors, general: "The event cannot be updated because the number of participants is not zero." });
        return;
      }

      const response = await fetch(`https://localhost:9144/PublishEvent/UpdatePulishedEventDetails`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publishid: updatedEventDetails.publishid,
          eventid: updatedEventDetails.eventid,
          eventdate: updatedEventDetails.eventdate,
          eventtime: updatedEventDetails.eventtime,
          price: updatedEventDetails.price,
          street: updatedEventDetails.street,
          pincode: updatedEventDetails.pincode,
          cityid: updatedEventDetails.cityid,
          status: "PROCESSING",
          capacity: updatedEventDetails.capacity,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update event.");
      }
      setErrors({ general: "Event updated successfully!" });

      setTimeout(() => {
        setActiveTab("view");
      }, 2000);
    } catch (err) {
      console.error("Failed to update event:", err);
      setErrors({ general: "Failed to update event: " + err.message });
    }
  };

  const handleCancelClick = (publishId) => {
    setSelectedEventId(publishId);
    setActiveTab("cancel");
  };

  const requestAdminForCancellation = () => {
    if (isCanceling) return; // Prevent multiple requests

    setIsCanceling(true); // Disable button to prevent double click
    fetch(`https://localhost:9144/PublishEvent/UpdateStatusToBeCancelledByPublishId?eid=${selectedEventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: cancellationReason }),
    })
      .then((resp) => resp.text())
      .then((data) => {
        if (data == "true") {
          setCancelEventMessage("Request has been successfully sent to the admin for the cancellation");
          setTimeout(() => {
            setActiveTab("view");
            setIsCanceling(false); // Enable button again
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        setCancelEventMessage("Sending Request Failed :" + err);
        setIsCanceling(false); // Enable button again if request fails
      });
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
                <th>Event Date</th>
                <th>Total Capacity</th>
                <th>Participants</th>
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
                  <td>{event.eventdate}</td>
                  <td>{event.capacity}</td>
                  <td>{event.participants}</td>
                  <td>
                    <span
                      className={`badge ${
                        event.status === "ACTIVE"
                          ? "bg-success"
                          : event.status === "CANCELLED"
                          ? "bg-danger"
                          : event.status === "TO_BE_CANCELLED"
                          ? "bg-warning text-dark"
                          : event.status === "PROCESSING"
                          ? "bg-warning"
                          : "bg-secondary"
                      }`}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td>
                    {event.status === "ACTIVE" && (
                      <button
                        className="btn btn-outline-primary btn-sm me-2"
                        onClick={() => handleUpdateClick(event.eventid)}
                      >
                        Update
                      </button>
                    )}
                    {(event.status === "ACTIVE" || event.status === "PROCESSING") && (
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleCancelClick(event.publishid)}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === "update" && eventDetails && (
          <div className="row">
            {/* Left Side: Original Data (Disabled Form) */}
            <div className="col-md-6">
              <h3 style={{ color: "black" }}>Original Event Details</h3>
              <form>
                <div className="form-group mb-3">
                  <label>Event Name</label>
                  <input type="text" className="form-control" value={eventDetails.eventname || ""} disabled />
                </div>
                <div className="form-group mb-3">
                  <label>Price</label>
                  <input type="text" className="form-control" value={eventDetails.price || ""} disabled />
                </div>
                <div className="form-group mb-3">
                  <label>Total Capacity</label>
                  <input type="number" className="form-control" value={eventDetails.capacity || ""} disabled />
                </div>
                <div className="form-group mb-3">
                  <label>Date</label>
                  <input type="date" className="form-control" value={eventDetails.eventdate || ""} disabled />
                </div>
                <div className="form-group mb-3">
                  <label>Time</label>
                  <input type="time" className="form-control" value={eventDetails.eventtime || ""} disabled />
                </div>
                <div className="form-group mb-3">
                  <label>Address</label>
                  <input
                    type="text"
                    className="form-control"
                    value={`${eventDetails.street}, ${eventDetails.cityname}, ${eventDetails.statename}, ${eventDetails.pincode}` || ""}
                    disabled
                  />
                </div>
              </form>
            </div>

            {/* Right Side: Editable Fields for Updating Data */}
            <div className="col-md-6">
              <h3 style={{ color: "black" }}>Update Event Details</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label>New Price</label>
                  <input
                    type="text"
                    className="form-control"
                    name="price"
                    value={updatedEventDetails.price || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>New Total Capacity</label>
                  <input
                    type="number"
                    className="form-control"
                    name="capacity"
                    value={updatedEventDetails.capacity || ""}
                    onChange={handleInputChange}
                  />
                  {errors.capacity && <div className="text-danger">{errors.capacity}</div>}
                </div>
                <div className="form-group mb-3">
                  <label>New Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="eventdate"
                    value={updatedEventDetails.eventdate || ""}
                    onChange={handleInputChange}
                  />
                  {errors.eventdate && <div className="text-danger">{errors.eventdate}</div>}
                </div>
                <div className="form-group mb-3">
                  <label>New Time</label>
                  <input
                    type="time"
                    className="form-control"
                    name="eventtime"
                    value={updatedEventDetails.eventtime || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>New Street</label>
                  <input
                    type="text"
                    className="form-control"
                    name="street"
                    value={updatedEventDetails.street || ""}
                    onChange={handleInputChange}
                  />
                </div>

                {/* General error or success message */}
                {errors.general && (
                  <div className={`alert ${errors.general.includes("success") ? "alert-success" : "alert-danger"}`}>
                    {errors.general}
                  </div>
                )}

                {/* Submit and Cancel Buttons */}
                <button type="submit" className="btn btn-success me-2">
                  Update Event
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setActiveTab("view")}>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === "cancel" && (
          <div>
            <h3>Cancel Event</h3>
            <form>
              <div className="form-group mb-3">
                <label>Reason for Cancellation<span style={{ color: "red" }}>*</span></label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Enter Cancellation Reason Here"
                  required
                  onChange={(e) => setCancellationReason(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group mb-3">
                <input type="checkbox" id="notify" className="form-check-input" />
                <label htmlFor="notify" className="form-check-label ms-2">
                  Notify Registered Participants
                </label>
              </div>
              <button
                type="button"
                className="btn btn-danger"
                onClick={requestAdminForCancellation}
                disabled={isCanceling} // Disable the button during cancellation request
              >
                {isCanceling ? "Requesting..." : "Request Cancellation"}
              </button>
              <button type="button" className="btn btn-secondary ms-2" onClick={() => setActiveTab("view")}>
                Back
              </button>
            </form>
            {cancelEventMessage && <div className="alert alert-info mt-3">{cancelEventMessage}</div>}
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewRegistrationsComponent;
