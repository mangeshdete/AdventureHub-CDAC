import React from "react";

function ManageBookings() {
  return (
    <div>
      <h3>Manage Bookings</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="bookingId" className="form-label">
            Booking ID
          </label>
          <input type="text" className="form-control" id="bookingId" />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Booking
        </button>
        <br/>
        <button type="button" className="btn btn-danger mt-2">
          Cancel Booking
        </button>
      </form>
    </div>
  );
}

export default ManageBookings;
