import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/PaymentComponent.css";

function PaymentComponent() {
  const [refundRequests, setRefundRequests] = useState([]);

  // Fetch refund requests from the server or database
  useEffect(() => {
    const fetchRefundRequests = async () => {
      try {
        const response = await fetch("/api/refund-requests"); // Replace with your API endpoint
        const data = await response.json();
        setRefundRequests(data);
      } catch (error) {
        console.error("Error fetching refund requests:", error);
      }
    };

    fetchRefundRequests();
  }, []);

  const handleRefundProcess = async (id) => {
    try {
      await fetch(`/api/refund-requests/${id}/process`, {
        method: "POST",
      });
      const updatedRequests = refundRequests.filter(
        (request) => request.id !== id
      );
      setRefundRequests(updatedRequests);
      alert("Refund processed successfully!");
    } catch (error) {
      console.error("Error processing refund:", error);
      alert("Failed to process refund. Please try again.");
    }
  };

  return (
    <div className="payment-component">
      <h3>Manage Refund Requests</h3>
      <table className="table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Contact</th>
            <th>Members</th>
            <th>Event</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {refundRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.userName}</td>
              <td>{request.contact}</td>
              <td>{request.members}</td>
              <td>{request.event}</td>
              <td>{request.date}</td>
              <td>${request.amount}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRefundProcess(request.id)}
                >
                  Process Refund
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentComponent;
