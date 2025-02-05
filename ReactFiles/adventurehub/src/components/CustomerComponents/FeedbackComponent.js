// Feedback.js
import React from "react";
import "../../styles/CustomerStyles/FeedbackComponent.css";

function Feedback() {
  return (
    <div className="feedback-container">
      <h3 className="feedback-title">Feedback</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="feedback" className="form-label">
            Your Feedback
          </label>
          <textarea className="form-control" id="feedback" rows="4" placeholder="Enter your feedback here..."></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Feedback
        </button>
      </form>
    </div>
  );
}

export default Feedback;