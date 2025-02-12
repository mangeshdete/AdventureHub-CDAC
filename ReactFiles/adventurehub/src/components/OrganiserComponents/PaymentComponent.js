// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// // import "../../styles/PaymentComponent.css";
// import { useSelector } from "react-redux";

// function PaymentComponent() {
//   const [publishedEvents, setPublishedEvents] = useState([]);
//   const [refundRequests, setRefundRequests] = useState([]);
//   const [selectedPublishId, setSelectedPublishId] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupMessage, setPopupMessage] = useState("");
//   const [totalAmount, setTotalAmount] = useState(0);
//   const orgId = useSelector((state)=>state.user.user.organiserid)
//   console.log(orgId)
//   // Fetch published events by organiser ID
//   useEffect(() => {
//     const fetchPublishedEvents = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(
//           `http://localhost:8140/organiser/PublishEvent/GetPublishedEventsByOrganiserId?orgId=${orgId}`
//         );
//         const data = await response.json();
//         setPublishedEvents(data);
//       } catch (error) {
//         console.error("Error fetching published events:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPublishedEvents();
//   }, [orgId]);

//   // Fetch refund requests by publish ID
//   const fetchRefundRequests = async (publishId) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(
//         `http://localhost:8140/organiser/Payments/GetAllRefundRequestsByPublishId?pid=${publishId}`
//       );
//       const data = await response.json();
//       setRefundRequests(data);
//       setSelectedPublishId(publishId);

//       // Calculate total amount
//       const total = data.reduce((sum, request) => sum + request.amount, 0);
//       setTotalAmount(total);
//     } catch (error) {
//       console.error("Error fetching refund requests:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle approve refund request
//   const handleApproveRefund = async (registrationId) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(
//         `http://localhost:8140/organiser/Payments/ApproveRefundRequestByRegistrationId?rid=${registrationId}`,
//         { method: "PUT" }
//       );
//       const result = await response.text();

//       if (response.status === 200) {
//         if (result === "success") {
//           setPopupMessage("Refund approved successfully!");
//           setShowPopup(true);
//           // Remove the approved request from the list
//           setRefundRequests((prev) =>
//             prev.filter((req) => req.registrationid !== registrationId)
//           );
//         } else {
//           setPopupMessage("Refund request not found.");
//           setShowPopup(true);
//         }
//       } else {
//         setPopupMessage("Failed to approve refund. Please try again.");
//         setShowPopup(true);
//       }
//     } catch (error) {
//       console.error("Error approving refund:", error);
//       setPopupMessage("An error occurred. Please try again.");
//       setShowPopup(true);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle reject refund request
//   const handleRejectRefund = async (registrationId) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(
//         `http://localhost:8140/organiser/Payments/RejectRefundRequestByRegistrationId?rid=${registrationId}`,
//         { method: "PUT" }
//       );
//       const result = await response.text();

//       if (response.status === 200) {
//         if (result === "success") {
//           setPopupMessage("Refund rejected successfully!");
//           setShowPopup(true);
//           // Remove the rejected request from the list
//           setRefundRequests((prev) =>
//             prev.filter((req) => req.registrationid !== registrationId)
//           );
//         } else {
//           setPopupMessage("Refund request not found.");
//           setShowPopup(true);
//         }
//       } else {
//         setPopupMessage("Failed to reject refund. Please try again.");
//         setShowPopup(true);
//       }
//     } catch (error) {
//       console.error("Error rejecting refund:", error);
//       setPopupMessage("An error occurred. Please try again.");
//       setShowPopup(true);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Close popup after 2 seconds
//   useEffect(() => {
//     if (showPopup) {
//       const timer = setTimeout(() => {
//         setShowPopup(false);
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [showPopup]);

//   return (
//     <div className="payment-component">
//       <h2>Published Events</h2>
//       {isLoading ? (
//         <div className="spinner-border" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       ) : (
//         <table className="table table-striped table-bordered">
//           <thead>
//             <tr>
//               <th>Event Name</th>
//               <th>City</th>
//               <th>Event Date</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {publishedEvents.map((event) => (
//               <tr key={event.publishid}>
//                 <td>{event.eventname}</td>
//                 <td>{event.cityname}</td>
//                 <td>{event.eventdate}</td>
//                 <td><span className={`badge ${
//                   event.status === "ACTIVE"
//                     ? "bg-success"
//                     : event.status === "CANCELLED"
//                     ? "bg-danger"
//                     : event.status === "TO_BE_CANCELLED"
//                     ? "bg-warning text-dark"
//                     : event.status === "PROCESSING"
//                     ? "bg-warning"
//                     : event.status === "COMPLETED"
//                     ? "bg-primary"  // Blue color for COMPLETED
//                     : "bg-secondary"
//                 }`}>
//                   {event.status}
//                 </span>
//                 </td>
//                 <td>
//                   <button
//                     className="btn btn-primary"
//                     onClick={() => fetchRefundRequests(event.publishid)}
//                   >
//                     See Refund Requests
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {selectedPublishId && (
//         <>
//           <h2>Refund Requests for Event ID: {selectedPublishId}</h2>
//           {isLoading ? (
//             <div className="spinner-border" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//           ) : (
//             <table className="table table-striped table-bordered">
//               <thead>
//                 <tr>
//                   <th>Event Name</th>
//                   <th>Event Date</th>
//                   <th>Participant Name</th>
//                   <th>Amount</th>
//                   <th>Approve</th>
//                   <th>Reject</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {refundRequests.map((request) => (
//                   <tr key={request.registrationid}>
//                     <td>{request.eventname}</td>
//                     <td>{request.eventdate}</td>
//                     <td>{`${request.fname} ${request.lname}`}</td>
//                     <td>{request.amount}</td>
//                     <td>
//                       <button
//                         className="btn btn-success"
//                         onClick={() =>
//                           handleApproveRefund(request.registrationid)
//                         }
//                       >
//                         Approve
//                       </button>
//                     </td>
//                     <td>
//                       <button
//                         className="btn btn-danger"
//                         onClick={() =>
//                           handleRejectRefund(request.registrationid)
//                         }
//                       >
//                         Reject
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//                 <tr>
//                   <td colSpan="3" className="text-end">
//                     <strong>Total Amount:</strong>
//                   </td>
//                   <td colSpan="3">
//                     <strong>{totalAmount}</strong>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           )}
//         </>
//       )}

//       {/* Popup Modal */}
//       {showPopup && (
//         <div className="popup">
//           <div className="popup-content">
//             <p>{popupMessage}</p>
//           </div>
//         </div>
//       )}
//     </div>

   

//   );
// }

// export default PaymentComponent;

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

function PaymentComponent() {
  const [publishedEvents, setPublishedEvents] = useState([]);
  const [refundRequests, setRefundRequests] = useState([]);
  const [selectedPublishId, setSelectedPublishId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const orgId = useSelector((state) => state?.user?.user?.organiserid);

  // Fetch published events by organiser ID
  useEffect(() => {
    const fetchPublishedEvents = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8140/organiser/PublishEvent/GetPublishedEventsByOrganiserId?orgId=${orgId}`
        );
        const data = await response.json();
    
        // Ensure data is always an array
        setPublishedEvents(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching published events:", error);
        setPublishedEvents([]); // Ensure state remains an array even on error
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPublishedEvents();
  }, [orgId]);

  // Fetch refund requests by publish ID
  const fetchRefundRequests = async (publishId) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8140/organiser/Payments/GetAllRefundRequestsByPublishId?pid=${publishId}`
      );
      const data = await response.json();
      setRefundRequests(data);
      setSelectedPublishId(publishId);

      // Calculate total amount
      const total = data.reduce((sum, request) => sum + request.amount, 0);
      setTotalAmount(total);
    } catch (error) {
      console.error("Error fetching refund requests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle approve refund request
  const handleApproveRefund = async (registrationId) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8140/organiser/Payments/ApproveRefundRequestByRegistrationId?rid=${registrationId}`,
        { method: "PUT" }
      );
      const result = await response.text();

      if (response.status === 200) {
        if (result === "success") {
          setPopupMessage("Refund approved successfully!");
          setShowPopup(true);
          // Remove the approved request from the list
          setRefundRequests((prev) =>
            prev.filter((req) => req.registrationid !== registrationId)
          );
        } else {
          setPopupMessage("Refund request not found.");
          setShowPopup(true);
        }
      } else {
        setPopupMessage("Failed to approve refund. Please try again.");
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Error approving refund:", error);
      setPopupMessage("An error occurred. Please try again.");
      setShowPopup(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle reject refund request
  const handleRejectRefund = async (registrationId) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8140/organiser/Payments/RejectRefundRequestByRegistrationId?rid=${registrationId}`,
        { method: "PUT" }
      );
      const result = await response.text();

      if (response.status === 200) {
        if (result === "success") {
          setPopupMessage("Refund rejected successfully!");
          setShowPopup(true);
          // Remove the rejected request from the list
          setRefundRequests((prev) =>
            prev.filter((req) => req.registrationid !== registrationId)
          );
        } else {
          setPopupMessage("Refund request not found.");
          setShowPopup(true);
        }
      } else {
        setPopupMessage("Failed to reject refund. Please try again.");
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Error rejecting refund:", error);
      setPopupMessage("An error occurred. Please try again.");
      setShowPopup(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Close popup after 2 seconds
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <div className="payment-component">
      <h2>Published Events</h2>
      {isLoading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>City</th>
              <th>Event Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {publishedEvents.map((event) => (
              <tr key={event.publishid}>
                <td>{event.eventname}</td>
                <td>{event.cityname}</td>
                <td>{event.eventdate}</td>
                <td>
                  <span
                    className={`badge ${
                      event.status === "ACTIVE"
                        ? "bg-success"
                        : event.status === "CANCELLED"
                        ? "bg-danger"
                        : event.status === "TO_BE_CANCELLED"
                        ? "bg-warning text-dark"
                        : event.status === "PROCESSING"
                        ? "bg-warning"
                        : event.status === "COMPLETED"
                        ? "bg-primary" // Blue color for COMPLETED
                        : "bg-secondary"
                    }`}
                  >
                    {event.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => fetchRefundRequests(event.publishid)}
                  >
                    See Refund Requests
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedPublishId && (
        <>
          <h2>Refund Requests for Event ID: {selectedPublishId}</h2>
          {isLoading ? (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <div className="table-container">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Event Date</th>
                    <th>Participant Name</th>
                    <th>Amount</th>
                    <th>Approve</th>
                    <th>Reject</th>
                  </tr>
                </thead>
                <tbody>
                  {refundRequests.map((request) => (
                    <tr key={request.registrationid}>
                      <td>{request.eventname}</td>
                      <td>{request.eventdate}</td>
                      <td>{`${request.fname} ${request.lname}`}</td>
                      <td>{request.amount}</td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            handleApproveRefund(request.registrationid)
                          }
                        >
                          Approve
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            handleRejectRefund(request.registrationid)
                          }
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="3" className="text-end">
                      <strong>Total Amount:</strong>
                    </td>
                    <td colSpan="3">
                      <strong>{totalAmount}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Popup Modal */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>{popupMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentComponent;