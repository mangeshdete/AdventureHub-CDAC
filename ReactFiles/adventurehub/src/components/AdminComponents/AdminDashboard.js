import React, { useState } from "react";
import { FaClipboardList, FaTimes, FaChartBar, FaCalendarAlt, FaMoneyBill } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import UpdateRequests from "./UpdateRequests";
import CancelRequests from "./CancelRequests";
import GenerateReports from "./GenerateReports";
import ViewCurrentEvents from "./ViewCurrentEvents";
import Payments from "./Payments";

function AdminDashboard() {
  const [selectedView, setSelectedView] = useState("dashboard");

  const renderContent = () => {
    switch (selectedView) {
      case "updateRequests":
        return <UpdateRequests />;
      case "cancelRequests":
        return <CancelRequests />;
      case "generateReports":
        return <GenerateReports />;
      case "viewCurrentEvents":
        return <ViewCurrentEvents />;
      case "payments":
        return <Payments />;
      default:
        return <div className="text-center p-5 fs-4">Welcome to the Admin Dashboard</div>;
    }
  };

  return (
    <div className="d-flex vh-100">
      {/* Sidebar Navigation */}
      <div className="bg-dark text-light p-3 d-flex flex-column" style={{ width: "250px" }}>
        <h3 className="text-center mb-4">Admin Panel</h3>
        <button
          className={`btn btn-secondary mb-2 text-start ${selectedView === "updateRequests" ? "btn-primary" : ""}`}
          onClick={() => setSelectedView("updateRequests")}
        >
          <FaClipboardList className="me-2" /> Update Requests
        </button>
        <button
          className={`btn btn-secondary mb-2 text-start ${selectedView === "cancelRequests" ? "btn-primary" : ""}`}
          onClick={() => setSelectedView("cancelRequests")}
        >
          <FaTimes className="me-2" /> Cancel Requests
        </button>
        <button
          className={`btn btn-secondary mb-2 text-start ${selectedView === "generateReports" ? "btn-primary" : ""}`}
          onClick={() => setSelectedView("generateReports")}
        >
          <FaChartBar className="me-2" /> Generate Reports
        </button>
        <button
          className={`btn btn-secondary mb-2 text-start ${selectedView === "viewCurrentEvents" ? "btn-primary" : ""}`}
          onClick={() => setSelectedView("viewCurrentEvents")}
        >
          <FaCalendarAlt className="me-2" /> View Current Events
        </button>
        <button
          className={`btn btn-secondary text-start ${selectedView === "payments" ? "btn-primary" : ""}`}
          onClick={() => setSelectedView("payments")}
        >
          <FaMoneyBill className="me-2" /> Payments
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4 bg-light">{renderContent()}</div>
    </div>
  );
}

export default AdminDashboard;
