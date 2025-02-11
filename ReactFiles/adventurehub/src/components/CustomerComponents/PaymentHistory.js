import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const PaymentHistory = () => {
    const cid = useSelector((state) => state?.user?.user?.custid); // Get cid from Redux store
    const [paymentHistory, setPaymentHistory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPaymentHistory = async () => {
            try {
                const response = await fetch(`http://localhost:8140/customer/Payment/getPaymentHistoryByCustId?cid=${cid}`);
                const data = await response.json();

                if (response.ok) {
                    setPaymentHistory(data);
                } else {
                    console.error("Failed to fetch payment history");
                    setPaymentHistory(null);
                }
            } catch (error) {
                console.error("Error fetching payment history:", error);
                setPaymentHistory(null);
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentHistory();
    }, [cid]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!paymentHistory || paymentHistory.length === 0) {
        return (
            <div className="card text-center mx-auto mt-5" style={{ maxWidth: "400px" }}>
                <div className="card-body">
                    <h5 className="card-title">No Payments Found</h5>
                    <p className="card-text">You have not made any payments yet.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="mb-4 text-center">
                <h2>Payment History</h2>
            </div>
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>Event Name</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Payment Status</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentHistory.map((payment, index) => (
                        <tr key={index}>
                            <td>{payment.eventname}</td>
                            <td>{payment.amount}.00 Rs</td>
                            <td>{new Date(payment.date).toLocaleDateString()}</td>
                            <td className={payment.paymentstatus === "SUCCESSFULL" ? "text-success fw-bold" : "text-danger fw-bold"}>
                                {payment.paymentstatus}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;
