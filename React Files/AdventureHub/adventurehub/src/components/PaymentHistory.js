import React from "react";

function PaymentHistory() {
  return (
    <div>
      <h3>Payment History</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Event Name</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {/* Example payment data */}
          <tr>
            <td>12345</td>
            <td>Sample Event 1</td>
            <td>$100</td>
            <td>2025-01-10</td>
          </tr>
          <tr>
            <td>67890</td>
            <td>Sample Event 2</td>
            <td>$150</td>
            <td>2025-02-15</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PaymentHistory;
