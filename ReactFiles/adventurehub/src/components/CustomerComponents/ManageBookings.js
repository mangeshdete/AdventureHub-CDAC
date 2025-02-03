//Manage Bookings
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

function CustomerBookingsComponent() {
  const [activeTab, setActiveTab] = useState("view");
  const [bookings, setBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);

  const customer = useSelector((state) => state.user?.user);

  // Sample Data
  const sampleBookings = [
    {
      bookingid: 1,
      eventname: "Music Concert",
      bookingdate: "2024-06-20T00:00:00Z",
      status: "Confirmed",
      tickets: 2,
      totalprice: 100,
    }
  ];

  // Fetch bookings or use sample data
  useEffect(() => {
    if (customer?.custid) {
      fetch(`https://localhost:9145/EventRegistration/GetEventRegistrationsByCustId?cid=${customer.custid}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBookings(data)})
      .catch((error) => console.error("Error fetching bookings:", error));
    } else {
      setBookings(sampleBookings);
    }
  }, [customer?.custid]);

  // Handle Update Click
  const handleUpdateClick = (bookingId) => {
    setSelectedBookingId(bookingId);
    setActiveTab("update");
    const booking = bookings.find((b) => b.bookingid === bookingId);
    setBookingDetails(booking);
  };

  return (
    <div className="container-fluid d-flex flex-column align-items-center vh-100 bg-light p-4">
      <h3 className="mb-4">My Bookings</h3>
      <div className="w-75">
        {activeTab === "view" && (
          <table className="table table-hover table-bordered text-center align-middle">
            <thead className="table-primary">
              <tr>
                <th>Sr No</th>
                <th>Event Name</th>
                <th>Booking Date and Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking.eventid} className="fw-bold">
                  <td>{index + 1}</td>
                  <td>{booking.eventname}</td>
                  <td>{new Date(booking.eventdate).toLocaleDateString()}, {booking.eventtime}</td>
                  <td>
                    <span className={`badge ${
                      booking.status === "ACTIVE"
                        ? "bg-success"
                        : booking.status === "CANCELLED"
                        ? "bg-danger"
                        : booking.status === "TO_BE_CANCELLED"
                        ? "bg-warning text-dark"
                        : booking.status === "PROCESSING"
                        ? "bg-warning"
                        : "bg-secondary"
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-primary btn-sm me-2"
                      onClick={() => handleUpdateClick(booking.bookingid)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => setActiveTab("cancel")}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === "update" && bookingDetails && (
          <div>
            <h3>Update Booking Details</h3>
            <form>
              <div className="form-group mb-3">
                <label>Event Name</label>
                <input type="text" className="form-control" value={bookingDetails.eventname} readOnly />
              </div>
              <div className="form-group mb-3">
                <label>Booking Date</label>
                <input type="text" className="form-control" value={new Date(bookingDetails.eventdate).toLocaleDateString()} readOnly />
              </div>
              <div className="form-group mb-3">
                <label>Number of Tickets</label>
                <input
                  type="number"
                  className="form-control"
                  value={bookingDetails.tickets}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, tickets: e.target.value })}
                />
              </div>
              <div className="form-group mb-3">
                <label>Total Price</label>
                <input type="text" className="form-control" value={`$${bookingDetails.totalprice}`} readOnly />
              </div>
              <button type="submit" className="btn btn-success me-2">
                Update Booking
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setActiveTab("view")}>
                Cancel
              </button>
            </form>
          </div>
        )}

        {activeTab === "cancel" && (
          <div>
            <h3>Cancel Booking</h3>
            <form>
              <div className="form-group mb-3">
                <label>Reason for Cancellation (Optional)</label>
                <textarea className="form-control" rows="4" placeholder="Enter reason (if any)"></textarea>
              </div>
              <div className="form-group mb-3">
                <input type="checkbox" id="refund" className="form-check-input" />
                <label htmlFor="refund" className="form-check-label ms-2">Request Refund</label>
              </div>
              <button type="submit" className="btn btn-danger">Cancel Booking</button>
              <button type="button" className="btn btn-secondary ms-2" onClick={() => setActiveTab("view")}>
                Back
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerBookingsComponent;