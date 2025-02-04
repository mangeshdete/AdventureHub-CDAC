import React, { useState, useEffect } from "react";
import { Table, Form, Container, Card } from "react-bootstrap";

function ViewCurrentEvents() {
  const [cities, setCities] = useState([]); // Store list of cities from API
  const [selectedCityId, setSelectedCityId] = useState(""); // Store selected city's ID
  const [events, setEvents] = useState([]); // Store events of selected city

  // Fetch Cities from API
  const getCities = async () => {
    try {
      const response = await fetch("http://localhost:8142/getAllCities", {
        method: "GET",
        headers: {
          "Accept": "application/json", // Ensure API returns JSON response
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json(); // Parse JSON response
      setCities(data); // Assuming API returns an array of cities
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  // Fetch Events based on selected city ID
  const getEvents = async (cityId) => {
    try {
      const response = await fetch(`https://localhost:7099/Admin/GetPublishedEventsByStatus?status=PROCESSING`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setEvents(data); // Store fetched events
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Fetch cities on component mount
  useEffect(() => {
    getCities();
  }, []);

  // Handle city selection
  const handleCityChange = (event) => {
    const cityId = event.target.value;
    setSelectedCityId(cityId);
    if (cityId) {
      getEvents(cityId); // Fetch events when a city is selected
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card style={{ width: "400px", padding: "20px", boxShadow: "0px 4px 10px rgba(0,0,0,0.2)" }}>
        <Card.Body>
          <h3 className="text-center mb-3">Select City</h3>
          <Form.Group className="mb-3">
            <Form.Label>Choose a city to view active events:</Form.Label>
            <Form.Select value={selectedCityId} onChange={handleCityChange}>
              <option value="">-- Select a City --</option>
              {cities.map((city) => (
                <option key={city.cityid} value={city.cityid}>{city.cityname}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Card.Body>
      </Card>

      {/* Show event list only after city selection */}
      {selectedCityId && (
        <Container className="mt-4">
          <h2 className="text-center mb-3">Active Events in {cities.find(city => city.cityid=== selectedCityId)?.name}</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Event Name</th>
                <th>City</th>
                <th>Status</th>
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">No active events found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Container>
      )}
    </Container>
  );
}

export default ViewCurrentEvents;
