import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/CustomerStyles/CustomerDashboard.css";
import { FaList, FaEdit, FaMoneyBill, FaUser , FaRegMoneyBillAlt, FaQuestionCircle, FaComment } from "react-icons/fa";
// Importing all components
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
        return <PaymentHistory />;
      case "profileManagement":
        return <ProfileManagement />;
      case "refundRequests":
        return <RefundRequests />;
      case "supportHelp":
        return <SupportHelp />;
      case "feedback":
        return <Feedback />;
      default:
        return <div className="welcome-text">Welcome to the Customer Dashboard</div>;
    }
  };

  return (
    <div className="customer-dashboard">
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <div className="sidebar-title">Customer Dashboard</div>
        <div className="sidebar-buttons">
          <button
            className={`nav-button ${selectedView === "viewRegisteredEvents" ? "active" : ""}`}
            onClick={() => setSelectedView("viewRegisteredEvents")}
          >
            <FaList className="icon" /> View Registered Events
          </button>
          <button
            className={`nav-button ${selectedView === "manageBookings" ? "active" : ""}`}
            onClick={() => setSelectedView("manageBookings")}
          >
            <FaEdit className="icon" /> Manage Bookings
          </button>
          <button
            className={`nav-button ${selectedView === "paymentHistory" ? "active" : ""}`}
            onClick={() => setSelectedView("paymentHistory")}
          >
            <FaMoneyBill className="icon" /> Payment History
          </button>
          <button
            className={`nav-button ${selectedView === "profileManagement" ? "active" : ""}`}
            onClick={() => setSelectedView("profileManagement")}
          >
            <FaUser  className="icon" /> Profile Management
          </button>
          <button
            className={`nav-button ${selectedView === "refundRequests" ? "active" : ""}`}
            onClick={() => setSelectedView("refundRequests")}
          >
            <FaRegMoneyBillAlt className="icon" /> Refund Requests
          </button>
          <button
            className={`nav-button ${selectedView === "supportHelp" ? "active" : ""}`}
            onClick={() => setSelectedView("supportHelp")}
          >
            <FaQuestionCircle className="icon" /> Support/Help
          </button>
          <button
            className={`nav-button ${selectedView === "feedback" ? "active" : ""}`}
            onClick={() => setSelectedView("feedback")}
          >
            <FaComment className="icon" /> Feedback
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">{renderContent()}</div>
    </div>
  );
}

export default CustomerDashboard;