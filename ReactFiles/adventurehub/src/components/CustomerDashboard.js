import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/CustomerDashboard.css";

// Importing all the components
import ViewRegisteredEvents from "./ViewRegisteredEvents";
import ManageBookings from "./ManageBookings";
import PaymentHistory from "./PaymentHistory";
import ProfileManagement from "./ProfileManagement";
import RefundRequests from "./RefundRequests";
import SupportHelp from "./SupportHelp";
import Feedback from "./FeedbackComponent";

function CustomerDashboard() {
  const [selectedView, setSelectedView] = useState("viewRegisteredEvents");

  const renderContent = () => {
    switch (selectedView) {
      case "viewRegisteredEvents":
        return <ViewRegisteredEvents />;
      case "manageBookings":
        return <ManageBookings />;
      case "paymentHistory":
        return <PaymentHistory/>;
      case "profileManagement":
        return <ProfileManagement />;
      case "refundRequests":
        return <RefundRequests />;
      case "supportHelp":
        return <SupportHelp />;
      case "feedback":
        return <Feedback />;
      default:
        return <div>Welcome to the Customer Dashboard</div>;
    }
  };

  return (
    <div className="d-flex customer-dashboard">
      {/* Left Side Navigation */}
      <div className="nav flex-column col-3 bg-light p-3">
        <button
          className="btn btn-link text-start"
          onClick={() => setSelectedView("viewRegisteredEvents")}
        >
          View Registered Events
        </button>
        <button
          className="btn btn-link text-start"
          onClick={() => setSelectedView("manageBookings")}
        >
          Manage Bookings
        </button>
        <button
          className="btn btn-link text-start"
          onClick={() => setSelectedView("paymentHistory")}
        >
          Payment History
        </button>
        <button
          className="btn btn-link text-start"
          onClick={() => setSelectedView("profileManagement")}
        >
          Profile Management
        </button>
        <button
          className="btn btn-link text-start"
          onClick={() => setSelectedView("refundRequests")}
        >
          Refund Requests
        </button>
        <button
          className="btn btn-link text-start"
          onClick={() => setSelectedView("supportHelp")}
        >
          Support/Help
        </button>
        <button
          className="btn btn-link text-start"
          onClick={() => setSelectedView("feedback")}
        >
          Feedback
        </button>
      </div>

      {/* Right Side Content */}
      <div className="col-9 p-4">{renderContent()}</div>
    </div>
  );
}

export default CustomerDashboard;
