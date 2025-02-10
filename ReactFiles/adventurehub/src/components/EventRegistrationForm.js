// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { Button, Form, Modal } from "react-bootstrap"; // Importing React-Bootstrap components

// const EventRegistrationForm = ({ publishId, onClose, eventDetails }) => {
//   const [participants, setParticipants] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [paymentModes, setPaymentModes] = useState([]);
//   const [selectedPaymentMode, setSelectedPaymentMode] = useState("");
//   const [eventPrice, setEventPrice] = useState(null);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const customer = useSelector((state) => state.user.user);

//   // Fetch available payment modes
//   useEffect(() => {
//     const fetchPaymentModes = async () => {
//       try {
//         const response = await fetch("http://localhost:8140/customer/Payment/GetPaymentModes");
//         const data = await response.json();
//         console.log("Payment Modes API Response:", data); // Debugging
//         setPaymentModes(data);
//       } catch (error) {
//         console.error("Error fetching payment modes:", error);
//         setError("Failed to fetch payment modes.");
//       }
//     };

//     fetchPaymentModes();
//   }, []);

//   // Fetch Event Price by publishId
//   useEffect(() => {
//     const fetchEventPrice = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:8140/customer/PublishEvents/getAllPublishedEventsByStateId?stateid=${eventDetails.stateid}`
//         );
//         const data = await response.json();
//         const event = data.find((event) => event.publishid === publishId);
//         if (event) {
//           setEventPrice(event.price);
//         } else {
//           setError("Event price not found.");
//         }
//       } catch (error) {
//         console.error("Error fetching event price:", error);
//         setError("Failed to fetch event price.");
//       }
//     };

//     fetchEventPrice();
//   }, [publishId]);

//   const handlePayNowClick = () => {
//     if (!eventPrice) {
//       setError("Event price is not available. Try again later.");
//       return;
//     }
//     setShowPaymentModal(true);
//   };

//   const handlePaymentSubmit = async () => {
//     if (!selectedPaymentMode) {
//       setError("Please select a payment mode.");
//       return;
//     }

//     const priceToPay = eventPrice * participants;
//     const gstAmount = priceToPay * 0.18;
//     const totalAmount = priceToPay + gstAmount;

//     const paymentData = {
//       custid: customer.custid,
//       publishid: publishId,
//       participants: participants,
//       status: "ACTIVE",
//       cancellationreason: null, 
//       payments: [
//         {
//           paymentmodeid: selectedPaymentMode, 
//           date: new Date().toISOString(), 
//           amount: totalAmount, 
//           paymentstatus: "SUCCESSFULL"
//         } 
//       ] 
//     };
//     // {
//     //   "custid": 1, 
//     //   "publishid": 2, 
//     //   "participants": 5, 
//     //   "status": "ACTIVE", 
//     //   "cancellationreason": null, 
//     //   "payments": [
//     //     {
//     //       "paymentmodeid": 1, 
//     //       "date": "2025-02-06T15:25:49.183Z", 
//     //       "amount": 1000, 
//     //       "paymentstatus": "SUCCESSFULL" 
//     //     }
//     //   ]
//     // }
    

//     try {
//       const response = await fetch("http://localhost:8140/customer/PublishEvents/CustomerRegistrationForAnEvent", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(paymentData),
//       });

//       if (!response.ok) {
//         throw new Error("Payment failed!");
//       }

//       alert("Payment successful!");
//       setShowPaymentModal(false);
//       onClose();
//     } catch (error) {
//       console.error("Error submitting payment:", error);
//       setError("Payment submission failed.");
//     }
//   };

//   return (
//     <>
//       <Modal show onHide={onClose} animation={true} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Register for Event</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="event-details mb-3">
//             <h4>{eventDetails?.eventname}</h4>
//             <p><span style={{color : "gray"}}>{eventDetails?.cityname}, {eventDetails?.statename}</span></p>
//           </div>
//           <Form>
//             <Form.Group controlId="firstName">
//               <Form.Label>First Name</Form.Label>
//               <Form.Control type="text" value={customer.fname} readOnly />
//             </Form.Group>

//             <Form.Group controlId="lastName">
//               <Form.Label>Last Name</Form.Label>
//               <Form.Control type="text" value={customer.lname} readOnly />
//             </Form.Group>

//             <Form.Group controlId="address">
//               <Form.Label>Address</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={`${customer.street}, ${customer.cities.cityname}, ${customer.cities.states.statename}`}
//                 readOnly
//               />
//             </Form.Group>

//             <Form.Group controlId="contactNo">
//               <Form.Label>Contact No</Form.Label>
//               <Form.Control type="text" value={customer.user.contact} readOnly />
//             </Form.Group>

//             <Form.Group controlId="participants">
//               <Form.Label>Number of Participants</Form.Label>
//               <Form.Control
//                 type="number"
//                 value={participants}
//                 onChange={(e) => setParticipants(Number(e.target.value))}
//                 min="1"
//               />
//             </Form.Group>

//             {error && <div className="alert alert-danger">{error}</div>}

//             <div className="d-flex justify-content-between mt-4">
//               <Button variant="secondary" onClick={onClose}>
//                 Cancel
//               </Button>
//               <Button variant="primary" onClick={handlePayNowClick} disabled={eventPrice === null}>
//                 {eventPrice === null ? "Loading Price..." : "Pay Now"}
//               </Button>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       {/* Payment Modal */}
//       <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Complete Payment</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>
//             <strong>Username:</strong> {customer.fname} {customer.lname}
//           </p>
//           <p>
//             <strong>No. of Participants:</strong> {participants}
//           </p>
//           <p>
//             <strong>Price per Participant:</strong> ₹{eventPrice}
//           </p>
//           <p>
//             <strong>Price to Pay:</strong> ₹{eventPrice * participants}
//           </p>
//           <p>
//             <strong>GST (18%):</strong> ₹{(eventPrice * participants * 0.18).toFixed(2)}
//           </p>
//           <p>
//             <strong>Total Price:</strong> ₹{(eventPrice * participants * 1.18).toFixed(2)}
//           </p>

//           <Form.Group>
//             <Form.Label>Select Payment Mode</Form.Label>
//             <Form.Control
//               as="select"
//               value={selectedPaymentMode}
//               onChange={(e) => setSelectedPaymentMode(e.target.value)}
//             >
//               <option value="">Select</option>
//               {paymentModes && paymentModes.length > 0 ? (
//                 paymentModes.map((mode) => (
//                   <option key={mode.paymentmodeid} value={mode.paymentmodeid}>
//                     {mode.paymentmodename}
//                   </option>
//                 ))
//               ) : (
//                 <option disabled>No payment modes available</option>
//               )}
//             </Form.Control>
//           </Form.Group>

//           <div className="d-flex justify-content-between mt-4">
//             <Button variant="secondary" onClick={() => setShowPaymentModal(false)}>
//               Cancel
//             </Button>
//             <Button variant="success" onClick={handlePaymentSubmit} disabled={!selectedPaymentMode}>
//               Pay Now
//             </Button>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export default EventRegistrationForm;

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Form, Modal } from "react-bootstrap"; // Importing React-Bootstrap components
import { FaCheckCircle} from 'react-icons/fa'; 

const EventRegistrationForm = ({ publishId, onClose, eventDetails }) => {
  const [participants, setParticipants] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentModes, setPaymentModes] = useState([]);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState("");
  const [eventPrice, setEventPrice] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const customer = useSelector((state) => state.user.user);

  // Fetch available payment modes
  useEffect(() => {
    const fetchPaymentModes = async () => {
      try {
        const response = await fetch("http://localhost:8140/customer/Payment/GetPaymentModes");
        const data = await response.json();
        console.log("Payment Modes API Response:", data); // Debugging
        setPaymentModes(data);
      } catch (error) {
        console.error("Error fetching payment modes:", error);
        setError("Failed to fetch payment modes.");
      }
    };

    fetchPaymentModes();
  }, []);

  // Fetch Event Price by publishId
  useEffect(() => {
    const fetchEventPrice = async () => {
      try {
        const response = await fetch(
          `http://localhost:8140/customer/PublishEvents/getAllPublishedEventsByStateId?stateid=${eventDetails.stateid}`
        );
        const data = await response.json();
        const event = data.find((event) => event.publishid === publishId);
        if (event) {
          setEventPrice(event.price);
        } else {
          setError("Event price not found.");
        }
      } catch (error) {
        console.error("Error fetching event price:", error);
        setError("Failed to fetch event price.");
      }
    };

    fetchEventPrice();
  }, [publishId]);

  const handlePayNowClick = () => {
    if (!eventPrice) {
      setError("Event price is not available. Try again later.");
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = async () => {
    if (!selectedPaymentMode) {
      setError("Please select a payment mode.");
      return;
    }

    const priceToPay = eventPrice * participants;
    const gstAmount = priceToPay * 0.18;
    const totalAmount = priceToPay + gstAmount;

    const paymentData = {
      custid: customer.custid,
      publishid: publishId,
      participants: participants,
      status: "ACTIVE",
      cancellationreason: null, 
      payments: [
        {
          paymentmodeid: selectedPaymentMode, 
          date: new Date().toISOString(), 
          amount: totalAmount, 
          paymentstatus: "SUCCESSFULL"
        } 
      ] 
    };
    // {
    //   "custid": 1, 
    //   "publishid": 2, 
    //   "participants": 5, 
    //   "status": "ACTIVE", 
    //   "cancellationreason": null, 
    //   "payments": [
    //     {
    //       "paymentmodeid": 1, 
    //       "date": "2025-02-06T15:25:49.183Z", 
    //       "amount": 1000, 
    //       "paymentstatus": "SUCCESSFULL" 
    //     }
    //   ]
    // }
    

    try {
      const response = await fetch("http://localhost:8140/customer/PublishEvents/CustomerRegistrationForAnEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error("Payment failed!");
      }

      setShowSuccessModal(true);
      setShowPaymentModal(false);
      setTimeout(()=> {
        setShowSuccessModal(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Error submitting payment:", error);
      setError("Payment submission failed.");
    }
  };

  return (
    <>
      <Modal show onHide={onClose} animation={true} centered>
        <Modal.Header closeButton>
          <Modal.Title>Register for Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="event-details mb-3">
            <h4>{eventDetails?.eventname}</h4>
            <p><span style={{color : "gray"}}>{eventDetails?.cityname}, {eventDetails?.statename}</span></p>
          </div>
          <Form>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" value={customer.fname} readOnly />
            </Form.Group>

            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" value={customer.lname} readOnly />
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={`${customer.street}, ${customer.cities.cityname}, ${customer.cities.states.statename}`}
                readOnly
              />
            </Form.Group>

            <Form.Group controlId="contactNo">
              <Form.Label>Contact No</Form.Label>
              <Form.Control type="text" value={customer.user.contact} readOnly />
            </Form.Group>

            <Form.Group controlId="participants">
              <Form.Label>Number of Participants</Form.Label>
              <Form.Control
                type="number"
                value={participants}
                onChange={(e) => setParticipants(Number(e.target.value))}
                min="1"
              />
            </Form.Group>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="d-flex justify-content-between mt-4">
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handlePayNowClick} disabled={eventPrice === null}>
                {eventPrice === null ? "Loading Price..." : "Pay Now"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Payment Modal */}
      <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Complete Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Username:</strong> {customer.fname} {customer.lname}
          </p>
          <p>
            <strong>No. of Participants:</strong> {participants}
          </p>
          <p>
            <strong>Price per Participant:</strong> ₹{eventPrice}
          </p>
          <p>
            <strong>Price to Pay:</strong> ₹{eventPrice * participants}
          </p>
          <p>
            <strong>GST (18%):</strong> ₹{(eventPrice * participants * 0.18).toFixed(2)}
          </p>
          <p>
            <strong>Total Price:</strong> ₹{(eventPrice * participants * 1.18).toFixed(2)}
          </p>

          <Form.Group>
            <Form.Label>Select Payment Mode</Form.Label>
            <Form.Control
              as="select"
              value={selectedPaymentMode}
              onChange={(e) => setSelectedPaymentMode(e.target.value)}
            >
              <option value="">Select</option>
              {paymentModes && paymentModes.length > 0 ? (
                paymentModes.map((mode) => (
                  <option key={mode.paymentmodeid} value={mode.paymentmodeid}>
                    {mode.paymentmodename}
                  </option>
                ))
              ) : (
                <option disabled>No payment modes available</option>
              )}
            </Form.Control>
          </Form.Group>

          <div className="d-flex justify-content-between mt-4">
            <Button variant="secondary" onClick={() => setShowPaymentModal(false)}>
              Cancel
            </Button>
            <Button variant="success" onClick={handlePaymentSubmit} disabled={!selectedPaymentMode}>
              Pay Now
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Payment Successful!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <FaCheckCircle size={50} color="green" />
          <p className="mt-3">Your payment has been successfully processed.</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EventRegistrationForm;