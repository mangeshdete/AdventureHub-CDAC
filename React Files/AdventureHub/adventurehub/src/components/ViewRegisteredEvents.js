import React from "react";

function ViewRegisteredEvents() {
  // Placeholder content for viewing registered events
  return (
    <div>
      <h3>Registered Events</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Date & Time</th>
            <th>Location</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {/* Example data */}
          <tr>
            <td>Sample Event 1</td>
            <td>2025-01-10 10:00 AM</td>
            <td>Location A</td>
            <td>This is a sample description of the event.</td>
          </tr>
          <tr>
            <td>Sample Event 2</td>
            <td>2025-02-15 03:00 PM</td>
            <td>Location B</td>
            <td>Another sample description.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ViewRegisteredEvents;
