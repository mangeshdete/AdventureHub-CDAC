import React from "react";

function RefundRequests() {
  return (
    <div>
      <h3>Refund Requests</h3>
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
