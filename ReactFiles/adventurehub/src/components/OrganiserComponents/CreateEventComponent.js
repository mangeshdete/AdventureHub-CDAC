// import React, { useState, useEffect } from "react";
// import "../../styles/OrganiserStyles/CreateEventComponent.css";
// import { useSelector } from "react-redux";

// function CreateEventComponent({ cityid: propCityid }) {

//   const user = useSelector(state => state.user);
//     // console.log(user)
//   const [eventDetails, setEventDetails] = useState({
//     eventid: "",
//     organiserid: user?.user?.organiserid || null,
//     eventdate: "",
//     eventtime: "",
//     price: "",
//     capacity: "",
//     status: "PROCESSING",
//     street: "",
//     cityid: propCityid || "",
//     pincode: "",
//     stateid: "",
//     categoryId: "",
//   });

//   const [errors, setErrors] = useState({
//     price: "",
//     capacity: "",
//     street: "",
//     pincode: "",
//     eventdate: "",
//     cityid: "",
//   });

//   const [message, setMessage] = useState({ text: "", type: "" });  // Success/failure message

//   const regexPatterns = {
//     price: /^(?!0+(?:\.0+)?$)\d+(\.\d{1,2})?$/,
//     capacity: /^(?!0+(?:\.0+)?$)\d+(\.\d{1,2})?$/,
//     street: /^(?=.*[A-Za-z])[A-Za-z0-9\s,'-]{3,}$/,
//     pincode: /^\d{6}$/,
//   };

//   const [categories, setCategories] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8140/organiser/Category/GetAllCategories")
//       .then((response) => response.json())
//       .then((data) => setCategories(data))
//       .catch((error) => console.error("Error fetching categories:", error));

//     fetch("http://localhost:8140/auth/getAllStates")
//       .then((resp) => resp.json())
//       .then((data) => setStates(data))
//       .catch((e) => console.log(e));
//   }, []);

//   const handleCategoryChange = (e) => {
//     const selectedCategoryId = e.target.value;
//     setEventDetails((prev) => ({
//       ...prev,
//       categoryId: selectedCategoryId,
//       eventid: "",
//     }));

//     if (selectedCategoryId) {
//       fetch(`http://localhost:8140/organiser/Event/GetAllEventsFromCategoryId?catId=${selectedCategoryId}`)
//         .then((response) => response.json())
//         .then((data) => setEvents(data))
//         .catch((error) => console.error("Error fetching events:", error));
//     } else {
//       setEvents([]);
//     }
//   };

//   const handleStateChange = (e) => {
//     const selectedStateId = e.target.value;
//     setEventDetails((prev) => ({
//       ...prev,
//       stateid: selectedStateId,
//       cityid: "",
//     }));

//     if (selectedStateId) {
//       fetch(`http://localhost:8140/auth/getCitiesByStateId?stateId=${selectedStateId}`)
//         .then((resp) => resp.json())
//         .then((data) => setCities(data))
//         .catch((e) => console.log(e));
//     } else {
//       setCities([]);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEventDetails((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const validateFields = () => {
//     const newErrors = {};

//     if (eventDetails.price && !regexPatterns.price.test(eventDetails.price)) {
//       newErrors.price = "Invalid price format. Please enter a valid price.";
//     }
//     if (eventDetails.capacity && !regexPatterns.capacity.test(eventDetails.capacity)) {
//       newErrors.capacity = "Invalid capacity. Please enter a valid integer value.";
//     }
//     if (eventDetails.street && !regexPatterns.street.test(eventDetails.street)) {
//       newErrors.street = "Invalid street format. Please enter a valid street address.";
//     }
//     if (eventDetails.pincode && !regexPatterns.pincode.test(eventDetails.pincode)) {
//       newErrors.pincode = "Invalid pincode format. Please enter a valid 6-digit pincode.";
//     }
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const enteredDate = new Date(eventDetails.eventdate);
//     if (enteredDate < today) {
//       newErrors.eventdate = "Event date cannot be in the past.";
//     }
//     if (!eventDetails.cityid) {
//       newErrors.cityid = "Please select a city.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validateFields()) {
//       return;
//     }

//     const payload = {
//       eventid: parseInt(eventDetails.eventid) || 0,
//       organiserid: user?.user?.organiserid || null,
//       eventdate: eventDetails.eventdate || "1970-01-01",
//       eventtime: eventDetails.eventtime ? eventDetails.eventtime + ":00" : "00:00:00",
//       price: parseFloat(eventDetails.price) || 0,
//       capacity: parseInt(eventDetails.capacity) || 0,
//       status: "PROCESSING",
//       street: eventDetails.street || "",
//       cityid: parseInt(eventDetails.cityid) || 0,
//       pincode: eventDetails.pincode || "",
//       stateid: parseInt(eventDetails.stateid) || 0,
//       categoryid: parseInt(eventDetails.categoryId) || 0,
//     };

//     fetch("http://localhost:8140/organiser/PublishEvent/PublishNewEvent", {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload),
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.text();
//       })
//       .then((data) => {
//         console.log("Event Created:", data);
//         setMessage({ text: "Event Created Successfully!", type: "success" });
//       })
//       .catch((error) => {
//         console.error("Error creating event:", error);
//         setMessage({ text: "Event creation failed.", type: "error" });
//       });
//   };

//   return (
//     <div className="event-form-container">
//       <h2 className="form-title text-center mb-4">Create Event</h2>
//       <form onSubmit={handleSubmit} className="event-form">
//         <div className="form-row">
//           <div className="form-column">
//             <label className="form-label">Category*</label>
//             <select
//               className="form-control"
//               name="categoryId"
//               value={eventDetails.categoryId}
//               onChange={handleCategoryChange}
//               required
//             >
//               <option value="">Select Category</option>
//               {categories.map((category) => (
//                 <option key={category.categoryid} value={category.categoryid}>
//                   {category.categoryname}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="form-column">
//             <label className="form-label">Event*</label>
//             <select
//               className="form-control"
//               name="eventid"
//               value={eventDetails.eventid}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select Event</option>
//               {events.map((event) => (
//                 <option key={event.eventid} value={event.eventid}>
//                   {event.eventname}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="form-row">
//           <div className="form-column">
//             <label className="form-label">Date*</label>
//             <input
//               type="date"
//               className="form-control"
//               name="eventdate"
//               value={eventDetails.eventdate}
//               onChange={handleChange}
//               required
//             />
//             {errors.eventdate && <div className="error-message">{errors.eventdate}</div>}
//           </div>
//           <div className="form-column">
//             <label className="form-label">Time*</label>
//             <input
//               type="time"
//               className="form-control"
//               name="eventtime"
//               value={eventDetails.eventtime}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>

//         <div className="form-row">
//           <div className="form-column">
//             <label className="form-label">Price per Person</label>
//             <input
//               type="number"
//               className="form-control"
//               name="price"
//               value={eventDetails.price}
//               onChange={handleChange}
//             />
//             {errors.price && <div className="error-message">{errors.price}</div>}
//           </div>
//           <div className="form-column">
//             <label className="form-label">Capacity</label>
//             <input
//               type="number"
//               className="form-control"
//               name="capacity"
//               value={eventDetails.capacity}
//               onChange={handleChange}
//             />
//             {errors.capacity && <div className="error-message">{errors.capacity}</div>}
//           </div>
//         </div>

//         <div className="form-row">
//           <div className="form-column">
//             <label className="form-label">State</label>
//             <select
//               className="form-control"
//               name="stateid"
//               value={eventDetails.stateid}
//               onChange={handleStateChange}
//               required
//             >
//               <option value="">Select State</option>
//               {states.map((state) => (
//                 <option key={state.stateid} value={state.stateid}>
//                   {state.statename}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="form-column">
//             <label className="form-label">City</label>
//             <select
//               className="form-control"
//               name="cityid"
//               value={eventDetails.cityid}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select City</option>
//               {cities.map((city) => (
//                 <option key={city.cityid} value={city.cityid}>
//                   {city.cityname}
//                 </option>
//               ))}
//             </select>
//             {errors.cityid && <div className="error-message">{errors.cityid}</div>}
//           </div>
//         </div>

//         <div className="form-group">
//           <label className="form-label">Street</label>
//           <input
//             type="text"
//             className="form-control"
//             name="street"
//             value={eventDetails.street}
//             onChange={handleChange}
//             required
//           />
//           {errors.street && <div className="error-message">{errors.street}</div>}
//         </div>

//         <div className="form-group">
//           <label className="form-label">Pincode</label>
//           <input
//             type="text"
//             className="form-control"
//             name="pincode"
//             value={eventDetails.pincode}
//             onChange={handleChange}
//             required
//           />
//           {errors.pincode && <div className="error-message">{errors.pincode}</div>}
//         </div>

//         <button type="submit" className="form-submit-btn">
//           Create Event
//         </button>
//       </form>

//       {message.text && (
//         <h3 className={`message ${message.type === "success" ? "success-message" : "error-message"}`}>
//           {message.text}
//         </h3>
//       )}
//     </div>
//   );
// }

// export default CreateEventComponent;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../../styles/OrganiserStyles/CreateEventComponent.css";

function CreateEventComponent() {
  const organiserinfo = useSelector(state => state?.user?.user);
  const defaultStateId = useSelector(state => state?.user?.user?.city?.states?.stateid);
  const defaultCityId = useSelector(state => state?.user?.user?.city?.cityid);
  //console.log(organiserinfo);
  //console.log(defaultCityId+" "+ defaultStateId);

  const [eventDetails, setEventDetails] = useState({
    eventid: "",
    organiserid: organiserinfo.organiserid,
    eventdate: "",
    eventtime: "",
    price: "",
    capacity: "",
    status: "PROCESSING",
    street: "",
    cityid: defaultCityId,
    pincode: "",
    stateid: defaultStateId,
    categoryId: "",
  });

  const [errors, setErrors] = useState({
    price: "",
    capacity: "",
    street: "",
    pincode: "",
    eventdate: "",
    cityid: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" });

  const regexPatterns = {
    price: /^(?!0+(?:\.0+)?$)\d+(\.\d{1,2})?$/,
    capacity: /^(?!0+(?:\.0+)?$)\d+(\.\d{1,2})?$/,
    street: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9\s,'-]{3,}$/,
    pincode: /^\d{6}$/,
  };

  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8140/organiser/Category/GetAllCategories")
      .then((response) => response.json())
      .then((data) => (Array.isArray(data) ? setCategories(data) : []))
      .catch((error) => console.error("Error fetching categories:", error));

    fetch("http://localhost:8140/auth/getAllStates")
      .then((resp) => resp.json())
      .then((data) => (Array.isArray(data) ? setStates(data) : []))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (defaultStateId) {
      fetch(`http://localhost:8140/auth/getCitiesByStateId?stateId=${defaultStateId}`)
        .then((resp) => resp.json())
        .then((data) => setCities(data))
        .catch((e) => console.log(e));
    }
  }, [defaultStateId]);

  const validateFields = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "price":
        newErrors.price = regexPatterns.price.test(value) ? "" : "Please enter a valid price.";
        break;
      case "capacity":
        newErrors.capacity = regexPatterns.capacity.test(value) ? "" : "Please enter a valid value.";
        break;
      case "street":
        newErrors.street = regexPatterns.street.test(value) ? "" : "Please enter a valid street address.";
        break;
      case "pincode":
        newErrors.pincode = regexPatterns.pincode.test(value) ? "" : "Please enter a valid 6-digit pincode.";
        break;
      case "eventdate":
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const enteredDate = new Date(value);
        newErrors.eventdate = enteredDate >= today ? "" : "Event date cannot be in the past.";
        break;
      case "cityid":
        newErrors.cityid = value ? "" : "Please select a city.";
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setEventDetails((prev) => ({
      ...prev,
      categoryId: selectedCategoryId,
      eventid: "",
    }));

    if (selectedCategoryId) {
      fetch(`http://localhost:8140/organiser/Event/GetAllEventsFromCategoryId?catId=${selectedCategoryId}`)
        .then((response) => response.json())
        .then((data) => setEvents(data))
        .catch((error) => console.error("Error fetching events:", error));
    } else {
      setEvents([]);
    }
  };

  const handleStateChange = (e) => {
    const selectedStateId = e.target.value;
    setEventDetails((prev) => ({
      ...prev,
      stateid: selectedStateId,
      cityid: "",
    }));

    if (selectedStateId) {
      fetch(`http://localhost:8140/auth/getCitiesByStateId?stateId=${selectedStateId}`)
        .then((resp) => resp.json())
        .then((data) => setCities(data))
        .catch((e) => console.log(e));
    } else {
      setCities([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateFields(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!Object.values(errors).every((error) => error === "")) {
      return;
    }

    const payload = {
      eventid: parseInt(eventDetails.eventid) ,
      organiserid: organiserinfo.organiserid ,
      eventdate: eventDetails.eventdate ,
      eventtime: eventDetails.eventtime ? eventDetails.eventtime + ":00" : "00:00:00",
      price: parseFloat(eventDetails.price) ,
      capacity: parseInt(eventDetails.capacity) ,
      status: "PROCESSING",
      street: eventDetails.street,
      cityid: parseInt(eventDetails.cityid),
      pincode: eventDetails.pincode,
      stateid: parseInt(eventDetails.stateid),
      categoryid: parseInt(eventDetails.categoryId),
    };

    fetch("http://localhost:8140/organiser/PublishEvent/PublishNewEvent", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        console.log("Event Created:", data);
        setMessage({ text: "Event Created Successfully!", type: "success" });
        setTimeout(() => setMessage({ text: "", type: "" }), 2000);
      })
      .catch((error) => {
        console.error("Error creating event:", error);
        setMessage({ text: "Event creation failed.", type: "error" });
        setTimeout(() => setMessage({ text: "", type: "" }), 2000);
      });
  };

  return (
    <div className="event-form-container" style={{ overflow: 'hidden' }}>
      {message.text && (
        <h3 className={`message ${message.type === "success" ? "success-message" : "error-message"}`}>
          {message.text}
        </h3>
      )}
      <h2 className="form-title text-center mb-4">Create Event</h2>
      <form onSubmit={handleSubmit} className="event-form">
        {/* Rest of the form fields remain unchanged */}
        <div className="form-row">
           <div className="form-column">
             <label className="form-label">Category*</label>
             <select
              className="form-control"
              name="categoryId"
              value={eventDetails.categoryId}
              onChange={handleCategoryChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.categoryid} value={category.categoryid}>
                  {category.categoryname}
                </option>
              ))}
            </select>
          </div>
          <div className="form-column">
            <label className="form-label">Event*</label>
            <select
              className="form-control"
              name="eventid"
              value={eventDetails.eventid}
              onChange={handleChange}
              required
            >
              <option value="">Select Event</option>
              {events.map((event) => (
                <option key={event.eventid} value={event.eventid}>
                  {event.eventname}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-column">
            <label className="form-label">Date*</label>
            <input
              type="date"
              className="form-control"
              name="eventdate"
              value={eventDetails.eventdate}
              onChange={handleChange}
              required
            />
            {errors.eventdate && <div className="error-message">{errors.eventdate}</div>}
          </div>
          <div className="form-column">
            <label className="form-label">Time*</label>
            <input
              type="time"
              className="form-control"
              name="eventtime"
              value={eventDetails.eventtime}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-column">
            <label className="form-label">Price per Person</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={eventDetails.price}
              onChange={handleChange}
              required
            />
            {errors.price && <div className="error-message">{errors.price}</div>}
          </div>
          <div className="form-column">
            <label className="form-label">Capacity</label>
            <input
              type="number"
              className="form-control"
              name="capacity"
              value={eventDetails.capacity}
              onChange={handleChange}
              required
            />
            {errors.capacity && <div className="error-message">{errors.capacity}</div>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-column">
            <label className="form-label">State</label>
            <select
              className="form-control"
              name="stateid"
              value={eventDetails.stateid}
              onChange={handleStateChange}
              required
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.stateid} value={state.stateid}>
                  {state.statename}
                </option>
              ))}
            </select>
          </div>
          <div className="form-column">
            <label className="form-label">City</label>
            <select
              className="form-control"
              name="cityid"
              value={eventDetails.cityid}
              onChange={handleChange}
              required
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.cityid} value={city.cityid}>
                  {city.cityname}
                </option>
              ))}
            </select>
            {errors.cityid && <div className="error-message">{errors.cityid}</div>}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Street</label>
          <input
            type="text"
            className="form-control"
            name="street"
            value={eventDetails.street}
            onChange={handleChange}
            required
          />
          {errors.street && <div className="error-message">{errors.street}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Pincode</label>
          <input
            type="text"
            className="form-control"
            name="pincode"
            value={eventDetails.pincode}
            onChange={handleChange}
            required
          />
          {errors.pincode && <div className="error-message">{errors.pincode}</div>}
        </div>

        <button type="submit" className="form-submit-btn">
          Create Event
        </button>
        
      </form>
    </div>
  );
}

export default CreateEventComponent;
