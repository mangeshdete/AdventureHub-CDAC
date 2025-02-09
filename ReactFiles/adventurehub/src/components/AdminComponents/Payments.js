import React, { useState, useEffect } from "react";
import { Table, Container, Badge } from "react-bootstrap";

function Payments() {
  const [payments, setPayments] = useState([]);

  // Fetch Payments Data
  const fetchPayments = async () => {
    try {
      const response = await fetch("http://localhost:8140/admin/Admin/GetAllPaymentsForAdmin");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-3 text-center">Payments</h2>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Full Name</th>
            <th>Payment Mode</th>
            <th>Date</th>
            <th>Amount (₹)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.length > 0 ? (
            payments.map((payment) => (
              <tr key={payment.transactionId}>
                <td>{payment.transactionId}</td>
                <td>{`${payment.fname} ${payment.lname}`}</td>
                <td>{payment.paymentmodename}</td>
                <td>{new Date(payment.date).toLocaleString()}</td>
                <td>₹{payment.amount}</td>
                <td>
                  <Badge
                    bg={payment.paymentstatus === "SUCCESSFULL" ? "success" : "danger"}
                  >
                    {payment.paymentstatus}
                  </Badge>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No payments found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default Payments;
