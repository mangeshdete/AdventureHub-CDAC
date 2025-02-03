import React, { useState, useEffect } from "react";
import { Table, Button, Container } from "react-bootstrap";

function UpdateRequests() {
  const [events, setEvents] = useState([]); // State to store events

  // Fetch "In Process" Events from API
  const fetchEvents = async () => {
    try {
      const response = await fetch("YOUR_API_URL_HERE"); // Replace with actual API
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json(); // Parse JSON response

      // Filter only "In Process" events
      const inProcessEvents = data.filter(event => event.status === "In Process");
      setEvents(inProcessEvents); // Store filtered events in state
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Update Event Status (Allow or Reject)
  const updateEventStatus = async (eventId, newStatus) => {
    try {
      const response = await fetch(`YOUR_UPDATE_API_URL/${eventId}`, {
        method: "PUT", // Use PUT method to update event status
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ status: newStatus }), // Send updated status
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Update state after successful API call
      setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));

      console.log(`Event ID ${eventId} updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating event status:", error);
    }
  };

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-3 text-center">Update Requests</h2>
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
              <tr key={event.id}>
                <td>{index + 1}</td>
                <td>{event.eventName}</td>
                <td>{event.city}</td>
                <td>{event.status}</td>
                <td>
                  <Button
                    variant="success"
                    className="me-2"
                    onClick={() => updateEventStatus(event.id, "Approved")}
                  >
                    Allow
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => updateEventStatus(event.id, "Rejected")}
                  >
                    Reject
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
