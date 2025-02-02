import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function ViewRegisteredEvents() {
  // Static dummy data for registered events
  const events = [
    {
      id: 1,
      name: "Mountain Trekking Adventure",
      dateTime: "2025-01-10 10:00 AM",
      location: "Himalayas, Nepal",
      price: 500,
      organizerName: "Adventure Co.",
      description: "A thrilling trek through the Himalayan trails with experienced guides.",
    },
    {
      id: 2,
      name: "Scuba Diving in the Great Barrier Reef",
      dateTime: "2025-02-15 03:00 PM",
      location: "Queensland, Australia",
      price: 300,
      organizerName: "Ocean Explorers",
      description: "Explore the underwater wonders of the Great Barrier Reef.",
    },
    {
      id: 3,
      name: "Safari in Serengeti National Park",
      dateTime: "2025-03-20 12:00 PM",
      location: "Tanzania",
      price: 700,
      organizerName: "Wildlife Adventures",
      description: "Witness the majestic wildlife of Africa in their natural habitat.",
    },
    {
      id: 4,
      name: "Northern Lights Tour in Iceland",
      dateTime: "2025-04-25 09:00 PM",
      location: "Reykjavik, Iceland",
      price: 600,
      organizerName: "Aurora Chasers",
      description: "Experience the magical Northern Lights in Iceland.",
    },
    {
      id: 5,
      name: "Hot Air Balloon Ride in Cappadocia",
      dateTime: "2025-05-30 06:00 AM",
      location: "Cappadocia, Turkey",
      price: 400,
      organizerName: "Sky High Adventures",
      description: "Enjoy a breathtaking hot air balloon ride over the unique landscapes of Cappadocia.",
    },
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary fw-bold mb-4">
        Registered Events
      </h2>
      <div className="table-responsive shadow-lg rounded-3">
        <table className="table table-hover table-striped table-bordered">
          <thead className="bg-dark text-white">
            <tr>
              <th className="p-3 fs-5">Event Name</th>
              <th className="p-3 fs-5">Date & Time</th>
              <th className="p-3 fs-5">Location</th>
              <th className="p-3 fs-5">Description</th>
              <th className="p-3 fs-5">Organizer Name</th>
              <th className="p-3 fs-5">Price</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="align-middle">
                <td className="p-4 fw-bold text-primary">{event.name}</td>
                <td className="p-4">{event.dateTime}</td>
                <td className="p-4">{event.location}</td>
                <td className="p-4">{event.description}</td>
                <td className="p-4">{event.organizerName}</td>
                <td className="p-4">${event.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewRegisteredEvents;