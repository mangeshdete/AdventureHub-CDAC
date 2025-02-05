import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Row, Col, Container, Dropdown } from "react-bootstrap";

const AdventureHubComponent = () => {
  const [states, setStates] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [viewBy, setViewBy] = useState("state"); // 'state' or 'city'

  // Fetch all states
  const fetchStates = async () => {
    try {
      const response = await axios.get("http://localhost:8142/getAllStates");
      setStates(response.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  // Fetch number of active events for a state
  const fetchActiveEventsCount = async (stateId) => {
    try {
      const response = await axios.get(
        `https://localhost:9145/PublishEvents/GetNumberOfActiveEventsByStateId?stateid=${stateId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching active events count:", error);
      return 0;
    }
  };

  // Fetch events by state
  const fetchEventsByState = async (stateId) => {
    try {
      const response = await axios.get(
        `https://localhost:9145/PublishEvents/getAllPublishedEventsByStateId?stateid=${stateId}`
      );
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events by state:", error);
    }
  };

  // Fetch events by city or state
  const fetchEventsByCityOrState = async (cityId, stateId) => {
    try {
      const response = await axios.get(
        `https://localhost:9145/PublishEvents/getPublishedEventsByCityIdOrStateId?cityid=${cityId}&stateid=${stateId}`
      );
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events by city or state:", error);
    }
  };

  // Handle state card click
  const handleStateClick = async (stateId) => {
    setSelectedState(stateId);
    if (viewBy === "state") {
      await fetchEventsByState(stateId);
    } else {
      // For city, you can prompt the user to select a city or pass a default cityId
      const cityId = 1; // Replace with dynamic cityId logic
      await fetchEventsByCityOrState(cityId, stateId);
    }
  };

  // Render state cards
  const renderStateCards = () => {
    return states.map(async (state) => {
      const activeEventsCount = await fetchActiveEventsCount(state.id);
      return (
        <Col key={state.id} md={4} className="mb-4">
          <Card onClick={() => handleStateClick(state.id)}>
            <Card.Body>
              <Card.Title>{state.name}</Card.Title>
              <Card.Text>Active Events: {activeEventsCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      );
    });
  };

  // Render event cards
  const renderEventCards = () => {
    return events.map((event) => (
      <Col key={event.id} md={4} className="mb-4">
        <Card>
          <Card.Body>
            <Card.Title>{event.name}</Card.Title>
            <Card.Text>
              <strong>Date:</strong> {event.date}
              <br />
              <strong>Location:</strong> {event.location}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  return (
    <Container>
      <h1>Adventure Hub</h1>
      <Button onClick={fetchStates} className="mb-3">
        Explore Now
      </Button>

      <Dropdown className="mb-3">
        <Dropdown.Toggle variant="secondary">
          View By: {viewBy === "state" ? "State" : "City"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setViewBy("state")}>State</Dropdown.Item>
          <Dropdown.Item onClick={() => setViewBy("city")}>City</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Row>
        {selectedState ? renderEventCards() : renderStateCards()}
      </Row>
    </Container>
  );
};

export default AdventureHubComponent;