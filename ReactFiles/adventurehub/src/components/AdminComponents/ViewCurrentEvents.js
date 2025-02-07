import React, { useState, useEffect } from "react";
import { Table, Form, Container, Card } from "react-bootstrap";

function ViewCurrentEvents() {
  const [cities, setCities] = useState([]); 
  const [selectedCityId, setSelectedCityId] = useState(""); 
  const [events, setEvents] = useState([]); 
  const [filteredEvents, setFilteredEvents] = useState([]); 

  // Fetch all cities from API
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("http://localhost:8142/getAllCities");
        const data = await response.json();
        console.log("Cities API Response:", data);
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, []);

  // Fetch events when a city is selected
  useEffect(() => {
    if (!selectedCityId) return;

    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `https://localhost:9146/Admin/GetPublishedEventsThatToBeViewByCityId?id=${selectedCityId}`
        );
        const data = await response.json();
        console.log("Events API Response:", data);
        setEvents(Array.isArray(data) ? data : []); 
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]); 
      }
    };

    fetchEvents();
  }, [selectedCityId]);

  // Handle city selection and filter events
  const handleCityChange = (event) => {
    const cityId = event.target.value;
    setSelectedCityId(cityId);

    if (cityId && Array.isArray(events)) {
      const filtered = events.filter((event) => event.cityname === cityId);
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents([]); // If no city selected or events are empty, reset filtered events
    }
  };

  return (
    <Container className="mt-5 d-flex flex-column align-items-center">
      <Card
        style={{
          width: "400px",
          padding: "20px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <Card.Body>
          <h3 className="text-center mb-3">Select City</h3>
          <Form.Group className="mb-3">
            <Form.Label>Choose a city to view active events:</Form.Label>
            <Form.Select value={selectedCityId} onChange={handleCityChange}>
              <option value="">-- Select a City --</option>
              {cities.map((city) => (
                <option key={city.cityid} value={city.cityid}>
                  {city.cityname}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Card.Body>
      </Card>

      {selectedCityId && (
        <Container className="mt-4">
          <h2 className="text-center mb-3">
            Active Events
            {cities.find((city) => city.cityid === selectedCityId)?.cityname}
          </h2>
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
                        : event.status === "COMPLETED"
                        ? "bg-primary"
                        : "bg-secondary"
                    }`}
                  >
                    {event.status}
                  </span></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No active events found
                  </td>
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
