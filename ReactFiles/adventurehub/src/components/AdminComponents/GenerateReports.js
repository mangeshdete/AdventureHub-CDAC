import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const GenerateReports = () => {
  const [organizers, setOrganizers] = useState([]);
  const [events, setEvents] = useState([]);
  const [viewOrganizers, setViewOrganizers] = useState(false);
  const [viewEvents, setViewEvents] = useState(false);

  // Fetch Data for Organizers and Events
  useEffect(() => {
    fetchOrganizersData();
    fetchEventsData();
  }, []);

  // Fetch top 10 highest rated organizers
  const fetchOrganizersData = () => {
    fetch("http://localhost:5000/api/organizers/top10") // Update with your API URL
      .then((response) => response.json())
      .then((data) => setOrganizers(data))
      .catch((error) => console.error("Error fetching organizers:", error));
  };

  // Fetch events registered in the last month
  const fetchEventsData = () => {
    fetch("http://localhost:5000/api/eventsLastMonth") // Update with your API URL
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  };

  // Handle View button for Organizers
  const handleViewOrganizers = () => {
    setViewOrganizers(true);
    setViewEvents(false);
  };

  // Handle View button for Events
  const handleViewEvents = () => {
    setViewEvents(true);
    setViewOrganizers(false);
  };

  // Function to Generate PDF (Organizers)
  const downloadOrganizersPDF = () => {
    const doc = new jsPDF();
    doc.text("Top 10 Highest Rated Organizers", 20, 10); // Title

    // Table Data Formatting
    const tableColumn = ["Organizer ID", "Organizer Name", "City", "Rating"];
    const tableRows = organizers.map((org) => [
      org.organiserid,
      org.orgname,
      org.cityName,
      org.rating,
    ]);

    // AutoTable for Table
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    // Save the PDF
    doc.save("Top_10_Organizers_Report.pdf");
  };

  // Function to Generate PDF (Events)
  const downloadEventsPDF = () => {
    const doc = new jsPDF();
    doc.text("Events Registered in Last Month", 20, 10); // Title

    // Table Data Formatting
    const tableColumn = ["Event ID", "Event Name", "Location", "Registration Date"];
    const tableRows = events.map((event) => [
      event.eventId,
      event.eventName,
      event.location,
      event.registrationDate,
    ]);

    // AutoTable for Table
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    // Save the PDF
    doc.save("Events_Last_Month_Report.pdf");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">Generate Reports</h2>

      <div className="row">
        <div className="col-12 col-md-8">
          {/* Organizers Section */}
          <h4>Top 10 Highest Rated Organizers</h4>
          <button className="btn btn-primary mb-3" onClick={handleViewOrganizers}>
            View Organizers
          </button>
          {viewOrganizers && (
            <div>
              <ul className="list-group">
                {organizers.map((org) => (
                  <li className="list-group-item" key={org.organiserid}>
                    <strong>{org.orgname}</strong> ({org.rating}) - {org.cityName}
                  </li>
                ))}
              </ul>
              <button className="btn btn-success mt-3" onClick={downloadOrganizersPDF}>
                Download Organizer Report
              </button>
            </div>
          )}

          {/* Events Section */}
          <h4 className="mt-4">Events Registered in Last Month</h4>
          <button className="btn btn-primary mb-3" onClick={handleViewEvents}>
            View Events
          </button>
          {viewEvents && (
            <div>
              <ul className="list-group">
                {events.map((event) => (
                  <li className="list-group-item" key={event.eventId}>
                    <strong>{event.eventName}</strong> ({event.registrationDate}) - {event.location}
                  </li>
                ))}
              </ul>
              <button className="btn btn-success mt-3" onClick={downloadEventsPDF}>
                Download Event Report
              </button>
            </div>
          )}
        </div>

        <div className="col-12 col-md-4">
          <h4 className="text-center">Download Report Section</h4>
        </div>
      </div>
    </div>
  );
};

export default GenerateReports;
