import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

function ViewRegistrationsComponent() {
  const [activeTab, setActiveTab] = useState("view");
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(0);
  const [eventDetails, setEventDetails] = useState({});
  const [updatedEventDetails, setUpdatedEventDetails] = useState([]);
  const [isEligibleForUpdate, setIsEligibleForUpdate] = useState(false);

  const organiser = useSelector((state) => state.user?.user);

  useEffect(() => {
    if (organiser?.organiserid) {
      fetch(`https://localhost:9144/PublishEvent/GetPublishedEventsByOrganiserId?orgId=${organiser.organiserid}`)
        .then((response) => response.json())
        .then((data) => {
          setEvents(data);
          console.log(data);
        })
        .catch((error) => console.error("Error fetching events:", error));
    }
  }, [organiser?.organiserid]);

  const handleUpdateClick = async (eventId) => {
    console.log(eventId);
    setSelectedEventId(eventId);

    try {
      const response = await fetch(`https://localhost:9144/PublishEvent/GetPublishedEventById?id=${eventId}`);
      const data = await response.json();
      console.log(data[0]);
      setEventDetails(data[0]);
      setUpdatedEventDetails(data[0]); // Initialize updatedEventDetails with the original data
      setActiveTab("update");
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
  };

  const handleCheckEligibility = () => {
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    fetch(`https://localhost:9144/EventRegistration/GetParticipantNumbersByPublishId?id=${eventDetails.publishid}`)
    .then((response) => response.json())
    .then(data => 
      {
        console.log("Participants : "+data);

        const num=Number(data);

        if(num === 0 && new Date(updatedEventDetails.eventdate) >= new Date(eventDetails.eventdate) && updatedEventDetails.capacity >= eventDetails.capacity){
          setIsEligibleForUpdate(true);
          alert("This event is eligible for update.");
        }
        else if(new Date(eventDetails.eventdate) < new Date(updatedEventDetails.eventdate))
          alert("Date should be after the event date.");
        else if(num !== 0)
          alert("Number of Participants are not zero");
        else if(updatedEventDetails.capacity < eventDetails.capacity)
          alert("New Capacity should be more than previous capacity");
        else
          alert("Not eligible for updates");
      })
    if (!isEligibleForUpdate) {
      alert("This event is not eligible for update.");
      return;
    }
    console.log("Updated Event Details:", updatedEventDetails);

    try{
      const response = await fetch(`https://localhost:9144/PublishEvent/UpdatePulishedEventDetails`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publishid : updatedEventDetails.publishid,
          eventid : updatedEventDetails.eventid,
          eventdate : updatedEventDetails.eventdate,
          eventtime : updatedEventDetails.eventtime,
          price : updatedEventDetails.price,
          street : updatedEventDetails.street,
          pincode : updatedEventDetails.pincode,
          cityid : updatedEventDetails.cityid,
          status : 'PROCESSING',
          capacity : updatedEventDetails.capacity
        }),
        /*
            sample request JSON
            {
              "publishid": 1,
              "eventid": 1,
              "eventdate": "2025-02-15",
              "eventtime": "10:00:56",
              "price": 150,
              "street": "New Beach Road",
              "pincode": "500002",
              "cityid": 9,
              "status": "PROCESSING",
              "capacity": 200
            }
        */ 
      });

      if (!response.ok) {
        throw new Error(`${response.statusText}`);
      }
      const result =await response.json();
      alert("Event updated successfully!");
      console.log(result);
      setActiveTab("view")
  } catch (err) {
    alert("Failed to update EVENT");
  }
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
                    <span className={`badge ${event.status === "ACTIVE" ? "bg-success" : "bg-secondary"}`}>
                      {event.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-outline-primary btn-sm me-2" onClick={() => handleUpdateClick(event.eventid)}>
                      Update Event
                    </button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => setActiveTab("cancel")}>
                      Cancel Event
                    </button>
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
                  <input type="text" className="form-control" value={eventDetails.eventname || ''} disabled />
                </div>
                <div className="form-group mb-3">
                  <label>Price</label>
                  <input type="text" className="form-control" value={eventDetails.price || ''} disabled />
                </div>
                <div className="form-group mb-3">
                  <label>Total Capacity</label>
                  <input type="number" className="form-control" value={eventDetails.capacity || ''} disabled />
                </div>
                <div className="form-group mb-3">
                  <label>Date</label>
                  <input type="date" className="form-control" value={eventDetails.eventdate || ''} disabled />
                </div>
                <div className="form-group mb-3">
                  <label>Time</label>
                  <input type="time" className="form-control" value={eventDetails.eventtime || ''} disabled />
                </div>
                <div className="form-group mb-3">
                  <label>Address</label>
                  <input type="text" className="form-control" value={`${eventDetails.street}, ${eventDetails.cityname}, ${eventDetails.statename}, ${eventDetails.pincode}` || ''} disabled />
                </div>
              </form>
            </div>

            {/* Right Side: Editable Fields for Updating Data */}
            <div className="col-md-6">
              <h3 style={{ color: "black" }}>Update Event Details</h3>
              <form onSubmit={handleSubmit}>
                {/* <div className="form-group mb-3">
                  <label>New Event Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="eventname"
                    value={updatedEventDetails.eventname || ''}
                    onChange={handleInputChange}
                  />
                </div> */}
                <div className="form-group mb-3">
                  <label>New Price</label>
                  <input
                    type="text"
                    className="form-control"
                    name="price"
                    value={updatedEventDetails.price || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>New Total Capacity</label>
                  <input
                    type="number"
                    className="form-control"
                    name="capacity"
                    value={updatedEventDetails.capacity || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>New Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="eventdate"
                    value={updatedEventDetails.eventdate || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>New Time</label>
                  <input
                    type="time"
                    className="form-control"
                    name="eventtime"
                    value={updatedEventDetails.eventtime || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>New Street</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={updatedEventDetails.street || ''}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Check Eligibility Button */}
                <button
                  type="button"
                  className="btn btn-warning mb-3"
                  onClick={handleCheckEligibility}
                  style={{display : isEligibleForUpdate? 'none' : 'block' }}
                >
                  Check for Ability to Update
                </button>

                {/* Submit and Cancel Buttons */}
                <button type="submit" className="btn btn-success me-2" style={{display : isEligibleForUpdate ? 'block': 'none'}} onClick={handleSubmit}>
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