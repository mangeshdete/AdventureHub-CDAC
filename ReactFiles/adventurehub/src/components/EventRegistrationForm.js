import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Form, Modal, Alert } from "react-bootstrap";

const EventRegistrationForm = ({ publishId, onClose, eventDetails }) => {
  const [participants, setParticipants] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentModes, setPaymentModes] = useState([]);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState("");
  const [eventPrice, setEventPrice] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const customer = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchPaymentModes = async () => {
      try {
        const response = await fetch("https://localhost:9145/Payment/GetPaymentModes");
        const data = await response.json();
        setPaymentModes(data);
      } catch (error) {
        setError("Failed to fetch payment modes.");
      }
    };
    fetchPaymentModes();
  }, []);

  useEffect(() => {
    const fetchEventPrice = async () => {
      try {
        const response = await fetch(
          `https://localhost:9145/PublishEvents/getAllPublishedEventsByStateId?stateid=1`
        );
        const data = await response.json();
        const event = data.find((event) => event.publishid === publishId);
        if (event) setEventPrice(event.price);
        else setError("Event price not found.");
      } catch (error) {
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
    setLoading(true);
    setError(null);
    setSuccessMessage("");

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
          paymentstatus: "SUCCESSFULL",
        },
      ],
    };

    try {
      const response = await fetch("https://localhost:9145/EventRegistration/CustomerRegistrationForAnEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        setSuccessMessage("Payment successful! You are registered for the event.");
        setShowPaymentModal(false);
        setTimeout(onClose, 2000);
      } else if (response.status === 400) {
        setError("Invalid data provided. Please check your inputs.");
      } else {
        setError("An internal server error occurred. Please try again later.");
      }
    } catch (error) {
      setError("Payment submission failed. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal show onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Register for Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          <h4>{eventDetails?.name}</h4>
          <p>{eventDetails?.description}</p>
          <Form>
            <Form.Group controlId="participants">
              <Form.Label>Number of Participants</Form.Label>
              <Form.Control
                type="number"
                value={participants}
                onChange={(e) => setParticipants(Number(e.target.value))}
                min="1"
              />
            </Form.Group>
            <div className="d-flex justify-content-between mt-4">
              <Button variant="secondary" onClick={onClose}>Cancel</Button>
              <Button variant="primary" onClick={handlePayNowClick} disabled={!eventPrice}>
                {eventPrice ? "Pay Now" : "Loading Price..."}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Complete Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Price to Pay:</strong> ₹{(eventPrice * participants).toFixed(2)}</p>
          <p><strong>GST (18%):</strong> ₹{(eventPrice * participants * 0.18).toFixed(2)}</p>
          <p><strong>Total Price:</strong> ₹{(eventPrice * participants * 1.18).toFixed(2)}</p>
          <Form.Group>
            <Form.Label>Select Payment Mode</Form.Label>
            <Form.Control
              as="select"
              value={selectedPaymentMode}
              onChange={(e) => setSelectedPaymentMode(e.target.value)}
            >
              <option value="">Select</option>
              {paymentModes.length > 0 ? paymentModes.map((mode) => (
                <option key={mode.paymentmodeid} value={mode.paymentmodeid}>{mode.paymentmodename}</option>
              )) : <option disabled>No payment modes available</option>}
            </Form.Control>
          </Form.Group>
          <div className="d-flex justify-content-between mt-4">
            <Button variant="secondary" onClick={() => setShowPaymentModal(false)}>Cancel</Button>
            <Button variant="success" onClick={handlePaymentSubmit} disabled={!selectedPaymentMode || loading}>
              {loading ? "Processing..." : "Pay Now"}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EventRegistrationForm;
