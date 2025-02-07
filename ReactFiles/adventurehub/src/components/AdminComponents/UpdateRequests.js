import React, { useState, useEffect } from "react";
import { Table, Button, Container, Alert } from "react-bootstrap";

function UpdateRequests() {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState(null);

  // Fetch "In Process" Events from API
  const fetchEvents = async () => {
    try {
      const response = await fetch("https://localhost:9146/Admin/GetAllUpdateRequestsForAdmin");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Show message for 2 seconds
  const showMessage = (msg, type = "success") => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(null), 2000);
  };

  // Update Event Status (Allow or Reject)
  const updateEventStatus = async (publishId) => {
    try {
      const response = await fetch(`https://localhost:9146/Admin/ApproveUpdateRequestByPublishId?pid=${publishId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      const responseText = await response.text(); // Get response message

      if (response.ok) {
        // Only remove from UI if update was successful
        setEvents((prevEvents) => prevEvents.filter((event) => event.publishid !== publishId));
        showMessage(`✅ Event ID ${publishId} updated successfully!`, "success");
      } else {
        // Show actual error message from API
        throw new Error(responseText || "Failed to update event.");
      }
    } catch (error) {
      console.error("❌ Error updating event status:", error.message);
      showMessage(`❌ ${error.message}`, "danger");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-3 text-center">Update Requests</h2>

      {/* Popup Message */}
      {message && (
        <Alert variant={message.type} className="text-center">
          {message.text}
        </Alert>
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Event Name</th>
            <th>City</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map((event, index) => (
              <tr key={event.publishid}>
                <td>{index + 1}</td>
                <td>{event.eventname}</td>
                <td>{event.cityname}</td>
                <td><span
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
                    </span></td>
                <td>
                  <Button
                    variant="success"
                    className="me-2"
                    onClick={() => updateEventStatus(event.publishid)}
                  >
                    Allow Update
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No events to update</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default UpdateRequests;
