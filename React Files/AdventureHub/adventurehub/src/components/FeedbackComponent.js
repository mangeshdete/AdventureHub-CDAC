import React from "react";

function Feedback() {
  return (
    <div>
      <h3>Feedback</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="feedback" className="form-label">
            Your Feedback
          </label>
          <textarea className="form-control" id="feedback" rows="4"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Feedback
        </button>
      </form>
    </div>
  );
}

export default Feedback;
