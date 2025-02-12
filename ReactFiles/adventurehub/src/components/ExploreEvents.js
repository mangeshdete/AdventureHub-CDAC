// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { Star } from "lucide-react";
// import EventRegistrationForm from "./EventRegistrationForm";
// import "../styles/ExploreEvents.css";

// const ExploreEvents = () => {
//   const [states, setStates] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [popupMessage, setPopupMessage] = useState(null);
//   const [registeredEvents, setRegisteredEvents] = useState(new Set()); // Track registered events
//   const user = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user.loggedIn) {
//       fetchEventsForLoggedInUser();
//     }
//   }, [user.loggedIn]);

//   const fetchStatesWithEvents = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch("http://localhost:8140/auth/getAllStates");
//       const statesData = await response.json();

//       const statesWithEvents = [];
//       for (const state of statesData) {
//         try {
//           const eventsResponse = await fetch(
//             `http://localhost:8140/customer/PublishEvents/GetNumberOfActiveEventsByStateId?stateid=${state.stateid}`
//           );
//           const eventCount = await eventsResponse.json();
//           statesWithEvents.push({ ...state, activeEvents: eventCount });
//         } catch (err) {
//           console.error(`Error fetching events for state ${state.stateid}:`, err);
//         }
//       }

//       setStates(statesWithEvents);
//     } catch (error) {
//       setError("Error fetching states. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchEventsForLoggedInUser = async () => {
//     setLoading(true);
//     setError(null);
//     setEvents([]);

//     try {
//       const { cityid, states } = user.user.cities;
//       const stateid = states.stateid;

//       const response = await fetch(
//         `http://localhost:8140/customer/PublishEvents/getPublishedEventsByCityIdOrStateId?cityid=${cityid}&stateid=${stateid}`
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch events");
//       }

//       const eventData = await response.json();
//       setEvents(eventData);

//       // Check registration status for each event
//       const registeredEventsSet = new Set();
//       for (const event of eventData) {
//         const isRegistered = await checkIfUserIsRegistered(event.publishid);
//         if (isRegistered) {
//           registeredEventsSet.add(event.publishid);
//         }
//       }
//       setRegisteredEvents(registeredEventsSet);
//     } catch (error) {
//       setError("Error fetching events. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchEventsByState = async (stateid) => {
//     setLoading(true);
//     setError(null);
//     setEvents([]);

//     try {
//       const response = await fetch(
//         `http://localhost:8140/customer/PublishEvents/getAllPublishedEventsByStateId?stateid=${stateid}`
//       );
//       const eventData = await response.json();
//       setEvents(eventData);

//       // Check registration status for each event
//       const registeredEventsSet = new Set();
//       for (const event of eventData) {
//         const isRegistered = await checkIfUserIsRegistered(event.publishid);
//         if (isRegistered) {
//           registeredEventsSet.add(event.publishid);
//         }
//       }
//       setRegisteredEvents(registeredEventsSet);
//     } catch (error) {
//       setError("Error fetching events. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const checkIfUserIsRegistered = async (publishid) => {
//     try {
//       const response = await fetch(
//         `http://localhost:8140/customer/EventRegistration/IsUserRegisteredForThatEventByCustIdAndPublishId?cid=${user?.user?.custid}&pid=${publishid}`
//       );
//       const data = await response.text();
//       return data === "true"; // Assuming the API returns "true" or "false" as strings
//     } catch (error) {
//       console.error("Error checking registration status:", error);
//       return false;
//     }
//   };

//   const handleRegistration = async (event) => {
//     if (!user.loggedIn) {
//       navigate("/login");
//     } else {
//       setLoading(true);
//       setError(null);
//       try {
//         const isRegistered = await checkIfUserIsRegistered(event.publishid);
//         if (!isRegistered) {
//           setSelectedEvent(event);
//           setShowForm(true);
//         } else {
//           setPopupMessage("You've already registered for this event");
//           setTimeout(() => setPopupMessage(null), 2000); // Popup disappears after 2 seconds
//         }
//       } catch (error) {
//         setError("Error during registration. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleCloseForm = () => {
//     setShowForm(false);
//     setSelectedEvent(null);
//   };

//   return (
//     <div className="container">
//       {!user.loggedIn && (
//         <button onClick={fetchStatesWithEvents} className="explore-btn">
//           Explore Now
//         </button>
//       )}

//       {loading && <p>Loading...</p>}
//       {error && <p className="error">{error}</p>}
//       {popupMessage && <div className="popup">{popupMessage}</div>}

//       {!user.loggedIn && states.length > 0 && (
//         <div className="state-carousel-container">
//           <div id="stateCarousel" className="carousel slide">
//             <div className="carousel-inner">
//               {states.map((state) => (
//                 <div key={state.stateid} className="state-card mx-2" onClick={() => fetchEventsByState(state.stateid)}>
//                   <h3>{state.statename}</h3>
//                   <p>Ongoing Events: {state.activeEvents}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       <div id="eventCarousel" className="carousel slide">
//         <div className="carousel-inner">
//           <div className="carousel-item active">
//             <div className="d-flex">
//               {events.map((event, index) => (
//                 <div key={index} className="event-card mx-2">
//                   <h3>{event.eventname}</h3>
//                   <p>
//                     Rating: {Array.from({ length: Math.round(event.rating) }, (_, i) => (
//                       <Star key={i} size={16} fill="gold" stroke="gold" />
//                     ))}
//                   </p>
//                   <p>Price: ₹{event.price}</p>
//                   <p>Location: {event.street}, {event.cityname}</p>
//                   <p>Pincode: {event.pincode}</p>
//                   <p>Remaining Slots: {event.capacity - event.totalRegistrations}</p>
//                     <button onClick={() => handleRegistration(event)}>
//                       REGISTER FOR THIS EVENT
//                     </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {showForm && (
//         <EventRegistrationForm publishId={selectedEvent.publishid} onClose={handleCloseForm} eventDetails={selectedEvent} />
//       )}
//     </div>
//   );
// };

// export default ExploreEvents;

// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { Star } from "lucide-react";
// import EventRegistrationForm from "./EventRegistrationForm";
// import "../styles/ExploreEvents.css";

// const ExploreEvents = () => {
//   const [states, setStates] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [popupMessage, setPopupMessage] = useState(null);
//   const [registeredEvents, setRegisteredEvents] = useState(new Set()); // Track registered events
//   const user = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   useEffect(() => {
//       fetchStatesWithEvents();
//   }, []);

//   const fetchStatesWithEvents = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch("http://localhost:8140/auth/getAllStates");
//       const statesData = await response.json();

//       const statesWithEvents = [];
//       for (const state of statesData) {
//         try {
//           const eventsResponse = await fetch(
//             `http://localhost:8140/customer/PublishEvents/GetNumberOfActiveEventsByStateId?stateid=${state.stateid}`
//           );
//           const eventCount = await eventsResponse.json();
//           statesWithEvents.push({ ...state, activeEvents: eventCount });
//         } catch (err) {
//           console.error(`Error fetching events for state ${state.stateid}:`, err);
//         }
//       }

//       setStates(statesWithEvents);
//     } catch (error) {
//       setError("Error fetching states. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchEventsByState = async (stateid) => {
//     setLoading(true);
//     setError(null);
//     setEvents([]);

//     try {
//       const response = await fetch(
//         `http://localhost:8140/customer/PublishEvents/getAllPublishedEventsByStateId?stateid=${stateid}`
//       );
//       const eventData = await response.json();
//       setEvents(eventData);

//       // Check registration status for each event
//       const registeredEventsSet = new Set();
//       for (const event of eventData) {
//         const isRegistered = await checkIfUserIsRegistered(event.publishid);
//         if (isRegistered) {
//           registeredEventsSet.add(event.publishid);
//         }
//       }
//       setRegisteredEvents(registeredEventsSet);
//     } catch (error) {
//       setError("Error fetching events. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const checkIfUserIsRegistered = async (publishid) => {
//     try {
//       const response = await fetch(
//         `http://localhost:8140/customer/EventRegistration/IsUserRegisteredForThatEventByCustIdAndPublishId?cid=${user?.user?.custid}&pid=${publishid}`
//       );
//       const data = await response.text();
//       return data === "true";
//     } catch (error) {
//       console.error("Error checking registration status:", error);
//       return false;
//     }
//   };

//   const handleRegistration = async (event) => {
//     if (!user.loggedIn) {
//       navigate("/login");
//     } else {
//       setLoading(true);
//       setError(null);
//       try {
//         const isRegistered = await checkIfUserIsRegistered(event.publishid);
//         if (!isRegistered) {
//           setSelectedEvent(event);
//           setShowForm(true);
//         } else {
//           setPopupMessage("You've already registered for this event");
//           setTimeout(() => setPopupMessage(null), 2000); // Popup disappears after 2 seconds
//         }
//       } catch (error) {
//         setError("Error during registration. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleCloseForm = () => {
//     setShowForm(false);
//     setSelectedEvent(null);
//   };

//   return (
//     <div className="container">
//       {/* {(
//         <button onClick={fetchStatesWithEvents} className="explore-btn">
//           Explore Now
//         </button>
//       )} */}

//       {loading && <p>Loading...</p>}
//       {error && <p className="error">{error}</p>}
//       {popupMessage && <div className="popup">{popupMessage}</div>}

//       {states.length > 0 && (
//         <div className="state-carousel-container">
//           <div id="stateCarousel" className="carousel slide">
//             <div className="carousel-inner">
//               {states.map((state) => (
//                 <div key={state.stateid} className="state-card mx-2" onClick={() => fetchEventsByState(state.stateid)}>
//                   <h3>{state.statename}</h3>
//                   <p>Ongoing Events: {state.activeEvents}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       <div id="eventCarousel" className="carousel slide">
//         <div className="carousel-inner">
//           <div className="carousel-item active">
//             <div className="d-flex">
//               {events.map((event, index) => (
//                 <div key={index} className="event-card mx-2">
//                   <h3>{event.eventname}</h3>
//                   <p>
//                     Rating: {Array.from({ length: Math.round(event.rating) }, (_, i) => (
//                       <Star key={i} size={16} fill="gold" stroke="gold" />
//                     ))}
//                   </p>
//                   <p>Price: ₹{event.price}</p>
//                   <p>Location: {event.street}, {event.cityname}</p>
//                   <p>Pincode: {event.pincode}</p>
//                   <p>Remaining Slots: {event.capacity - event.totalRegistrations}</p>
//                     <button onClick={() => handleRegistration(event)}>
//                       REGISTER FOR THIS EVENT
//                     </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {showForm && (
//         <EventRegistrationForm publishId={selectedEvent.publishid} onClose={handleCloseForm} eventDetails={selectedEvent} />
//       )}
//     </div>
//   );
// };

// export default ExploreEvents;


import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import EventRegistrationForm from "./EventRegistrationForm";
import "../styles/ExploreEvents.css";

const ExploreEvents = () => {
  const [states, setStates] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState(new Set());

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStatesWithEvents();
  }, []);

  const fetchStatesWithEvents = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8140/auth/getAllStates");
      const data = await response.json();

      if (!Array.isArray(data)) throw new Error(data.message || "Invalid response from server.");

      const statesWithEvents = await Promise.all(
        data.map(async (state) => {
          try {
            const eventsResponse = await fetch(
              `http://localhost:8140/customer/PublishEvents/GetNumberOfActiveEventsByStateId?stateid=${state.stateid}`
            );
            const eventCount = await eventsResponse.json();

            return { ...state, activeEvents: typeof eventCount === "number" ? eventCount : 0 };
          } catch (err) {
            console.error(`Error fetching events for state ${state.stateid}:`, err);
            return { ...state, activeEvents: 0 };
          }
        })
      );

      setStates(statesWithEvents);
    } catch (error) {
      setError(error.message || "Error fetching states. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchEventsByState = async (stateid) => {
    if (!stateid) return;

    setLoading(true);
    setError(null);
    setEvents([]);

    try {
      const response = await fetch(
        `http://localhost:8140/customer/PublishEvents/getAllPublishedEventsByStateId?stateid=${stateid}`
      );
      const data = await response.json();

      if (!Array.isArray(data)) throw new Error("Error Fetching Events.");

      setEvents(data);

      const registeredEventsSet = new Set();
      for (const event of data) {
        const isRegistered = await checkIfUserIsRegistered(event.publishid);
        if (isRegistered) {
          registeredEventsSet.add(event.publishid);
        }
      }
      setRegisteredEvents(registeredEventsSet);
    } catch (error) {
      setError(error.message || "Error fetching events. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const checkIfUserIsRegistered = async (publishid) => {
    try {
      const response = await fetch(
        `http://localhost:8140/customer/EventRegistration/IsUserRegisteredForThatEventByCustIdAndPublishId?cid=${user?.user?.custid}&pid=${publishid}`
      );
      const data = await response.text();
      return data === "true";
    } catch (error) {
      console.error("Error checking registration status:", error);
      return false;
    }
  };

  const handleRegistration = async (event) => {
    if (!user.loggedIn) {
      navigate("/login");
    } else {
      setLoading(true);
      setError(null);
      try {
        const isRegistered = await checkIfUserIsRegistered(event.publishid);
        if (!isRegistered) {
          setSelectedEvent(event);
          setShowForm(true);
        } else {
          setPopupMessage("You've already registered for this event");
          setTimeout(() => setPopupMessage(null), 2000);
        }
      } catch (error) {
        setError("Error during registration. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedEvent(null);
  };

  return (
    <div className="container">
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {popupMessage && <div className="popup">{popupMessage}</div>}

      {states.length > 0 && (
        <div className="state-carousel-container">
          <div id="stateCarousel" className="carousel slide">
            <div className="carousel-inner">
              {states.map((state) => (
                <div key={state.stateid} className="state-card mx-2" onClick={() => fetchEventsByState(state.stateid)}>
                  <h3>{state.statename}</h3>
                  <p>Ongoing Events: {state.activeEvents}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div id="eventCarousel" className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="d-flex">
              {events.map((event, index) => (
                <div key={index} className="event-card mx-2">
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
                  <p>Remaining Slots: {event.capacity - event.totalRegistrations}</p>
                  <button onClick={() => handleRegistration(event)}>
                    REGISTER FOR THIS EVENT
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <EventRegistrationForm publishId={selectedEvent.publishid} onClose={handleCloseForm} eventDetails={selectedEvent} />
      )}
    </div>
  );
};

export default ExploreEvents;
