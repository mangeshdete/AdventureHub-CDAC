import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

function CustomerBookingsComponent() {
  const [activeTab, setActiveTab] = useState("view");
  const [bookings, setBookings] = useState([]);
  const [selectedRegId, setSelectedRegId] = useState(0);
  const [cancellationReason, setCancellationReason] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });

  const customer = useSelector((state) => state.user?.user);

  // Fetch bookings
  useEffect(() => {
    if (customer?.custid) {
      fetch(`https://localhost:9145/EventRegistration/GetEventRegistrationsByCustId?cid=${customer.custid}`)
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch bookings");
          return response.json();
        })
        .then((data) => setBookings(data))
        .catch((error) => {
          console.error("Error fetching bookings:", error);
          showNotification("Failed to fetch bookings. Please try again later.", "error");
        });
    }
  }, [customer?.custid]);

  // Handle cancellation
  const handleCancleRedirect = (regId) => {
    setSelectedRegId(regId);
    setActiveTab("cancel");
  };

  const handleCancleEvent = () => {
    if (!cancellationReason.trim()) {
      showNotification("Please provide a reason for cancellation.", "error");
      return;
    }

    if (customer?.custid) {
      fetch(`https://localhost:9145/EventRegistration/CancelEventRegistrationByRegistrationId?rid=${selectedRegId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: cancellationReason }),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to cancel registration");
          return response.text();
        })
        .then((data) => {
          if (data === "success") {
            showNotification("Cancellation successful!", "success");
            setActiveTab("view");
            // Refresh bookings after cancellation
            fetch(`https://localhost:9145/EventRegistration/GetEventRegistrationsByCustId?cid=${customer.custid}`)
              .then((response) => response.json())
              .then((data) => setBookings(data))
              .catch((error) => console.error("Error refreshing bookings:", error));
          } else {
            throw new Error("Cancellation failed");
          }
        })
        .catch((error) => {
          console.error("Error cancelling registration:", error);
          showNotification("Failed to cancel registration. Please try again later.", "error");
        });
    }
  };

  // Show notification popup
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 2000); // Hide after 2 seconds
  };

  return (
    <div className="container-fluid d-flex flex-column align-items-center vh-100 bg-light p-4">
      {/* Notification Popup */}
      {notification.message && (
        <div
          className={`position-fixed top-0 end-0 p-3 ${notification.type === "success" ? "bg-success" : "bg-danger"}`}
          style={{ zIndex: 1000 }}
        >
          <div className="text-white">{notification.message}</div>
        </div>
      )}

      <h3 className="mb-4"></h3>
      <div className="w-75">
        {activeTab === "view" && (
          <>
            {bookings.length === 0 ? (
              <div className="alert alert-info text-center">No Registered Events</div> // Display if no bookings
            ) : (
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
                        <span
                          className={`badge ${
                            booking.status === "ACTIVE"
                              ? "bg-success"
                              : booking.status === "CANCELLED"
                              ? "bg-danger"
                              : booking.status === "TO_BE_CANCELLED"
                              ? "bg-warning text-dark"
                              : booking.status === "PROCESSING"
                              ? "bg-warning"
                              : "bg-secondary"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleCancleRedirect(booking.registrationid)}
                        >
                          Cancel Registration
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}

        {activeTab === "cancel" && (
          <div>
            <h3>Cancel Booking</h3>
            <form>
              <div className="form-group mb-3">
                <label>
                  Reason for Cancellation<span style={{ color: "red" }}>*</span>
                </label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Enter Cancellation Reason Here"
                  required
                  onChange={(e) => setCancellationReason(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group mb-3">
                <input type="checkbox" id="refund" className="form-check-input" />
                <label htmlFor="refund" className="form-check-label ms-2">
                  Request Refund
                </label>
              </div>
              <button type="button" className="btn btn-danger" onClick={handleCancleEvent}>
                Cancel Booking
              </button>
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
