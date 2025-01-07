import React, { useState } from "react";
import CreateEventComponent from "./CreateEventComponent";
import ManageEventComponent from "./ManageEventComponent";
import UpdateProfileComponent from "./UpdateProfileComponent";
import ViewRegistrationsComponent from "./ViewRegistrationsComponent";
import PaymentComponent from "./PaymentComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/OrganizerDashboard.css";

function OrganizerDashboard() {
  const [selectedView, setSelectedView] = useState("dashboard");

  const renderContent = () => {
    switch (selectedView) {
      case "createEvent":
        return <CreateEventComponent />;
      case "manageEvent":
        return <ManageEventComponent />;
      case "updateProfile":
        return <UpdateProfileComponent />;
      case "viewRegistrations":
        return <ViewRegistrationsComponent />;
      case "payment":
        return <PaymentComponent />;
      default:
        return <div>Welcome to the Organizer Dashboard</div>;
    }
  };

  return (
    <div className="d-flex organizer-dashboard">
      {/* Left Side Navigation */}
      <div className="nav flex-column col-3 bg-light p-3">
        <button
          className="btn btn-link text-start"
          onClick={() => setSelectedView("createEvent")}
        >
          Create Event
        </button>
        <button
          className="btn btn-link text-start"
          onClick={() => setSelectedView("manageEvent")}
        >
          Manage Event
        </button>
        <button
          className="btn btn-link text-start"
          onClick={() => setSelectedView("updateProfile")}
        >
          Update Profile
        </button>
        <button
          className="btn btn-link text-start"
          onClick={() => setSelectedView("viewRegistrations")}
        >
          View/Search Registrations
        </button>
        <button
          className="btn btn-link text-start"
          onClick={() => setSelectedView("payment")}
        >
          Payment
        </button>
      </div>

      {/* Right Side Content */}
      <div className="col-9 p-4">{renderContent()}</div>
    </div>
  );
}

export default OrganizerDashboard;
