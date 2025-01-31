import React, { useState } from "react";
import { FaPlus, FaEdit, FaUser, FaList, FaMoneyBill } from "react-icons/fa";
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
        return <div className="welcome-text">Welcome to the Organizer Dashboard</div>;
    }
  };

  return (
    <div className="organizer-dashboard">
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <h3 className="sidebar-title">Organizer Panel</h3>
        <button
          className={`nav-button ${selectedView === "createEvent" ? "active" : ""}`}
          onClick={() => setSelectedView("createEvent")}
        >
          <FaPlus className="icon" /> Create Event
        </button>
        <button
          className={`nav-button ${selectedView === "manageEvent" ? "active" : ""}`}
          onClick={() => setSelectedView("manageEvent")}
        >
          <FaEdit className="icon" /> Manage Event
        </button>
        <button
          className={`nav-button ${selectedView === "updateProfile" ? "active" : ""}`}
          onClick={() => setSelectedView("updateProfile")}
        >
          <FaUser className="icon" /> Update Profile
        </button>
        <button
          className={`nav-button ${selectedView === "viewRegistrations" ? "active" : ""}`}
          onClick={() => setSelectedView("viewRegistrations")}
        >
          <FaList className="icon" /> View Registrations
        </button>
        <button
          className={`nav-button ${selectedView === "payment" ? "active" : ""}`}
          onClick={() => setSelectedView("payment")}
        >
          <FaMoneyBill className="icon" /> Payment
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">{renderContent()}</div>
    </div>
  );
}

export default OrganizerDashboard;
