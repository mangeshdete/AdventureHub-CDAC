import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import EventRegistrationForm from "./EventRegistrationForm"; // Import the form component

const ExploreEvents = () => {
  const [states, setStates] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false); // Track whether to show the registration form
  const [selectedEvent, setSelectedEvent] = useState(null); // Store the selected event for registration
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const fetchStatesWithEvents = async () => {
    setLoading(true);
    setError(null);
    console.log(" inside fetchStatesWithEvents");

    try {
      const response = await fetch("http://localhost:8142/getAllStates");
      const statesData = await response.json();
      console.log(statesData);
  
      const statesWithEvents = [];
      
      for (const state of statesData) {
        try {
          const eventsResponse = await fetch(
            `https://localhost:9145/PublishEvents/GetNumberOfActiveEventsByStateId?stateid=${state.stateid}`
          );
          const eventCount = await eventsResponse.json();
          console.log(eventCount);
  
          statesWithEvents.push({ ...state, activeEvents: eventCount });
        } catch (err) {
          console.error(`Error fetching events for state ${state.stateid}:`, err);
        }
      }
  
      setStates(statesWithEvents);
    } catch (error) {
      setError("Error fetching states. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchEventsForLoggedInUser = async () => {
    setLoading(true);
    setError(null);
    setEvents([]);
    console.log("inside fetchEventsForLoggedInUser");
  
    try {
      const { cityid, states } = user.user.cities; // Corrected path
      const stateid = states.stateid; // Extract stateid
  
      const response = await fetch(
        `https://localhost:9145/PublishEvents/getPublishedEventsByCityIdOrStateId?cityid=${cityid}&stateid=${stateid}`
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
  
      const eventData = await response.json();
      setEvents(eventData);
      console.log("fetchEventsForLoggedInUser", eventData);
    } catch (error) {
      setError("Error fetching events. Please try again.");
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEventsByState = async (stateid) => {
    setLoading(true);
    setError(null);
    setEvents([]);

    try {
      const response = await fetch(
        `https://localhost:9145/PublishEvents/getAllPublishedEventsByStateId?stateid=${stateid}`
      );
      const eventData = await response.json();
      setEvents(eventData);
    } catch (error) {
      setError("Error fetching events. Please try again.");
    } finally {
      setLoading(false);
    }

  };

  const handleExploreClick = () => {
    console.log("called button");
    console.log(user);

    if (user.loggedIn && user.user?.user?.roleid?.roleid === 1){
      fetchEventsForLoggedInUser();
    } else {
      fetchStatesWithEvents();
    }
  };

  const handleRegistration = (event) => {
    if (!user.loggedIn) {
      navigate("/login");
    } else {
      setSelectedEvent(event); // Set the selected event for registration
      setShowForm(true); // Show the registration form
    }
  };

  const handleCloseForm = () => {
    setShowForm(false); // Close the registration form
    setSelectedEvent(null); // Reset selected event
  };

  return (
    <div className="container">
      <button onClick={handleExploreClick} className="explore-btn">
        Explore Now
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!user.loggedIn && (
        <div className="states-scroll-container">
          {states.map((state) => (
            <div
              key={state.stateid}
              className="state-card"
              onClick={() => fetchEventsByState(state.stateid)}
            >
              <h3>{state.statename}</h3>
              <p>Ongoing Events: {state.activeEvents}</p>
            </div>
          ))}
        </div>
      )}

      <div className="events-container">
        {events.map((event) => (
          <div key={event.publishid} className="event-card">
            <h3>{event.eventname}</h3>
            <p>
              Rating:{" "}
              {Array.from({ length: Math.round(event.rating) }, (_, i) => (
                <Star key={i} size={16} fill="gold" stroke="gold" />
              ))}
            </p>
            <p>Price: ₹{event.price}</p>
            <p>Location: {event.street}, {event.cityname}</p>
            <p>Pincode: {event.pincode}</p>
            <p>Remaining Slots: {event.capacity-event.totalRegistrations}</p>
            <button onClick={() => handleRegistration(event)}>REGISTER FOR THIS EVENT</button>
          </div>
        ))}
      </div>

      {showForm && (
        <EventRegistrationForm
          publishId={selectedEvent.publishid}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default ExploreEvents;
