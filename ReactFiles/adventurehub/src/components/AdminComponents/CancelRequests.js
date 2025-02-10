import React, { useState, useEffect } from "react";
import { Table, Button, Container, Alert } from "react-bootstrap";

function CancelRequests() {
  const [events, setEvents] = useState([]); // State to store events
  const [message, setMessage] = useState(null); // State for success/error messages

  // Fetch "To Be Cancelled" Events from API
  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:8140/admin/Admin/GetToBeCancelledRequestsForAdmin");
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      
      const data = await response.json();
      setEvents(data);
      console.log(data)
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Approve or Reject Event
  const handleAction = async (publishid, actionType) => {
    try {
      const response = await fetch(`http://localhost:8140/admin/Admin/${actionType}CancelRequestByRegId?regId=${publishid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed: ${errorText}`);
      }

      // Remove the event from state after successful approval/rejection
      setEvents(prevEvents => prevEvents.filter(event => event.id !== publishid));

      // Show success message
      setMessage({ type: "success", text: `Request ${actionType}ed successfully` });

    } catch (error) {
      console.error(`Error while ${actionType}ing request:`, error);

      // Show error message
      setMessage({ type: "danger", text: `Error while ${actionType}ing request` });
    }

    // Hide message after 2 seconds
    setTimeout(() => setMessage(null), 2000);
  };

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-3 text-center">Cancel Requests</h2>

      {/* Minimal Popup Message */}
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
            <th>State</th>
            <th>Status</th>
            <th>Cancellation Reason</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map((event, index) => (
              <tr key={event.id}>
                <td>{index + 1}</td>
                <td>{event.eventname}</td>
                <td>{event.cityname}</td>
                <td>{event.statename}</td>
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
                <td>{event.cancellationReason}</td>
                <td>
                  <Button variant="success" className="me-2" onClick={() => handleAction(event.id, "Approve")}>
                    Approve
                  </Button>
                  <Button variant="danger" onClick={() => handleAction(event.id, "Reject")}>
                    Reject
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No events to cancel</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default CancelRequests;
