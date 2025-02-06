import React, { useState, useEffect } from "react";
import { Table, Button, Container } from "react-bootstrap";

function CancelRequests() {
  const [stat]=useState("TO_BE_CANCELLED");
  const [events, setEvents] = useState([]); // State to store events

  // Fetch "To Be Cancelled" Events from API
  const fetchEvents = async () => {
    try {
      const response = await fetch("https://localhost:7099/Admin/GetPublishedEventsThatToBeCancel?status="+stat); // Replace with actual API
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json(); // Parse JSON response

      // Filter only "To Be Cancelled" events
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Cancel Event (DELETE Request)
  const cancelEvent = async (eventId) => {
    try {
      const response = await fetch(`YOUR_DELETE_API_URL/${eventId}`, {
        method: "DELETE", // DELETE request to remove event
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Remove the event from state after successful deletion
      setEvents(prevEvents => prevEvents.filter(event => event.publishid !== eventId));

      console.log(`Event ID ${eventId} has been cancelled`);
    } catch (error) {
      console.error("Error cancelling event:", error);
    }
  };

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-3 text-center">Cancel Requests</h2>
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
                <td>{event.status}</td>
                <td>
                  <Button variant="danger" onClick={() => cancelEvent(event.publishid)}>
                    Cancel
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No events to cancel</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default CancelRequests;
