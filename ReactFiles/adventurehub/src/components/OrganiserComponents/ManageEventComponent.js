import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import "../../styles/OrganiserStyles/ManageEventComponent.css";

function ManageEventComponent() {
  const [activeTab, setActiveTab] = useState("view");
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(0);
  const [eventDetails, setEventDetails] = useState({});
  const [updatedEventDetails, setUpdatedEventDetails] = useState({});
  const [errors, setErrors] = useState({});
  const [cancellationReason, setCancellationReason] = useState(null);
  const [cancelEventMessage, setCancelEventMessage] = useState(null);
  const [isCanceling, setIsCanceling] = useState(false);

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
    // console.log("here")
    // return;
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
      // const participantResponse = await fetch(
      //   `https://localhost:9144/EventRegistration/GetParticipantNumbersByPublishId?id=${eventDetails.publishid}`
      // );
      // const participantData = await participantResponse.json();
      // const participantCount = Number(participantData);

      // if (participantCount !== participantCount/2) {
      //   setErrors({ ...errors, general: "The event cannot be updated because the number of participants is not zero." });
      //   return;
      // }

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
      
      //fetch the latest events again
      fetch(`https://localhost:9144/PublishEvent/GetPublishedEventsByOrganiserId?orgId=${organiser.organiserid}`)
        .then((response) => response.json())
        .then((data) => {
          setEvents(data);
        })
        .catch((error) => console.error("Error fetching events:", error));
      
        setTimeout(() => {
        setActiveTab("view");
        setErrors({general : ""})
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
    if (isCanceling) return;

    setIsCanceling(true);
    fetch(`https://localhost:9144/PublishEvent/UpdateStatusToBeCancelledByPublishId?eid=${selectedEventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: cancellationReason }),
    })
      .then((resp) => resp.text())
      .then((data) => {
        if (data === "true") {
          setCancelEventMessage("Request has been successfully sent to the admin for the cancellation");
          setTimeout(() => {
            setActiveTab("view");
            setIsCanceling(false);
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        setCancelEventMessage("Sending Request Failed :" + err);
        setIsCanceling(false);
      });
  };

  return (
    <div className="manage-events-container">
      <h3 className="manage-events-title">Manage Events</h3>
      <div className="manage-events-content">
        {activeTab === "view" && (
          <div className="table-responsive" style={{ maxHeight: "400px", overflowY: "auto" }}>
            <table className="table table-striped table-bordered table-hover">
              <thead className="table-dark text-center">
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
                  <tr key={event.id} className="text-center align-middle">
                    <td>{index + 1}</td>
                    <td>{event.eventname}</td>
                    <td>{event.cityname}</td>
                    <td>{new Date(event.eventdate).toLocaleDateString()}</td>
                    <td>{event.capacity}</td>
                    <td>{event.participants}</td>
                    <td>
                      <span className={`badge 
                        ${event.status === "ACTIVE" ? "bg-success" : 
                          event.status === "CANCELLED" ? "bg-danger" : 
                          event.status === "TO_BE_CANCELLED" || event.status === "PROCESSING" ? "bg-warning text-dark" : 
                          "bg-secondary"}`}>
                        {event.status}
                      </span>
                    </td>
                    <td>
                      {event.status === "ACTIVE" && (
                        <button className="btn btn-outline-primary btn-sm me-2" onClick={() => handleUpdateClick(event.eventid)}>
                          Update
                        </button>
                      )}
                      {(event.status === "ACTIVE" || event.status === "PROCESSING") && (
                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleCancelClick(event.publishid)}>
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <strong style={{zIndex : "9999", color : "green"}}>{errors?.general}</strong>
        {activeTab === "update" && eventDetails && (
          <div className="update-event-container expand row">
            <div className="original-event-details col-md-6">
              <h3>Original Details</h3>
              <div className="card p-3">
                <form>
                  <div className="form-group">
                    <label>Event Name</label>
                    <input type="text" className="form-control" value={eventDetails.eventname || ""} disabled />
                  </div>
                  <div className="form-group">
                    <label>Price</label>
                    <input type="text" className="form-control" value={eventDetails.price || ""} disabled />
                  </div>
                  <div className="form-group">
                    <label>Total Capacity</label>
                    <input type="number" className="form-control" value={eventDetails.capacity || ""} disabled />
                  </div>
                  <div className="form-group">
                    <label>Date</label>
                    <input type="date" className="form-control" value={eventDetails.eventdate || ""} disabled />
                  </div>
                  <div className="form-group">
                    <label>Time</label>
                    <input type="time" className="form-control" value={eventDetails.eventtime || ""} disabled />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input type="text" className="form-control" value={`${eventDetails.street}, ${eventDetails.cityname}, ${eventDetails.statename}, ${eventDetails.pincode}` || ""} disabled />
                  </div>
                </form>
              </div>
            </div>

            <div className="update-event-details col-md-6">
              <h3>Update Details</h3>
              <div className="card p-3">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>New Price</label>
                    <input type="text" className="form-control" name="price" value={updatedEventDetails.price || ""} onChange={handleInputChange} />
                    {errors.price && <div className="text-danger">{errors.price}</div>}
                  </div>
                  <div className="form-group">
                    <label>New Total Capacity</label>
                    <input type="number" className="form-control" name="capacity" value={updatedEventDetails.capacity || ""} onChange={handleInputChange} />
                    {errors.capacity && <div className="text-danger">{errors.capacity}</div>}
                  </div>
                  <div className="form-group">
                    <label>New Event Date</label>
                    <input type="date" className="form-control" name="eventdate" value={updatedEventDetails.eventdate || ""} onChange={handleInputChange} />
                    {errors.eventdate && <div className="text-danger">{errors.eventdate}</div>}
                  </div>
                  <div className="form-group">
                    <label>New Event Time</label>
                    <input type="time" className="form-control" name="eventtime" value={updatedEventDetails.eventtime || ""} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>New Address</label>
                    <input type="text" className="form-control" name="street" value={updatedEventDetails.street || ""} onChange={handleInputChange} />
                  </div>
                  <button type="submit" className="btn btn-success">Update Event</button>
                </form>
              </div>
            </div>
          </div>
        )}

        {activeTab === "cancel" && (
          <div className="cancel-event-container">
            <h3>Cancel Event</h3>
            <div className="form-group">
              <label>Reason for Cancellation</label>
              <textarea
                className="form-control"
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                placeholder="Provide the reason for cancellation"
              />
            </div>
            <button className="btn btn-danger" onClick={requestAdminForCancellation} disabled={isCanceling}>
              {isCanceling ? "Canceling..." : "Request Cancellation"}
            </button>
            {cancelEventMessage && <div className="alert alert-info mt-3">{cancelEventMessage}</div>}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageEventComponent;
