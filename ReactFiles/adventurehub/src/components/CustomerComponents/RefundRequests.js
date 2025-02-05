// RefundRequests.js
import React from "react";
import "../../styles/CustomerStyles/RefundRequests.css";

function RefundRequests() {
  return (
    <div className="refund-requests-container">
      <h3 className="refund-requests-title">Refund Requests</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="eventName" className="form-label">
            Event Name
          </label>
          <input type="text" className="form-control" id="eventName" />
        </div>
        <div className="mb-3">
          <label htmlFor="reason" className="form-label">
            Cancellation Reason (optional)
          </label>
          <textarea className="form-control" id="reason" rows="3"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Refund Request
        </button>
      </form>
    </div>
  );
}

export default RefundRequests;