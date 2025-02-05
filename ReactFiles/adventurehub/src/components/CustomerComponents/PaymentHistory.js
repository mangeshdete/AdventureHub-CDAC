// PaymentHistory.js
import React from "react";
import "../../styles/CustomerStyles/PaymentHistory.css";

function PaymentHistory() {
  return (
    <div className="payment-history-container">
      <h3 className="payment-history-title">Payment History</h3>
      <div className="payment-history-table-wrapper">
        <table className="payment-history-table table table-hover table-bordered text-center align-middle">
          <thead className="payment-history-table-header">
            <tr>
              <th>Payment ID</th>
              <th>Event Name</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {/* Example payment data */}
            <tr className="payment-history-table-row">
              <td>12345</td>
              <td>Sample Event 1</td>
              <td>$100</td>
              <td>2025-01-10</td>
            </tr>
            <tr className="payment-history-table-row">
              <td>67890</td>
              <td>Sample Event 2</td>
              <td>$150</td>
              <td>2025-02-15</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentHistory;