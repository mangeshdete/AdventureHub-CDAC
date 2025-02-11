import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const RefundRequests = () => {
    const cid = useSelector((state) => state?.user?.user?.custid); // Get cid from Redux store
    const [refundRequests, setRefundRequests] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRefundRequests = async () => {
            try {
                const response = await fetch(`http://localhost:8140/customer/EventRegistration/GetAllRefundRequestsByCustomerId?cid=${cid}`);
                const data = await response.json();

                if (response.ok) {
                    setRefundRequests(data);
                } else {
                    console.error("Failed to fetch refund requests");
                    setRefundRequests(null);
                }
            } catch (error) {
                console.error("Error fetching refund requests:", error);
                setRefundRequests(null);
            } finally {
                setLoading(false);
            }
        };

        fetchRefundRequests();
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

    if (!refundRequests || refundRequests.length === 0) {
        return (
            <div className="card text-center mx-auto mt-5" style={{ maxWidth: "400px" }}>
                <div className="card-body">
                    <h5 className="card-title">No Refund Requests</h5>
                    <p className="card-text">There are no refund requests available at this time.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="mb-4 text-center">
                <h2>Refund Requests</h2>
            </div>
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>Event Name</th>
                        <th>Refund Status</th>
                        <th>Participants</th>
                        <th>Price per Person</th>
                        <th>Refund Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {refundRequests.map((request, index) => (
                        <tr key={index}>
                            <td>{request.eventName}</td>
                            <td><span className={`badge ${
                            request.refundstatus === "APPROVED"
                                ? "bg-success"
                                : request.refundStatus === "REJECTED"
                                ? "bg-danger"
                                : request.refundStatus === "PENDING"
                                ? "bg-warning text-dark"
                                : "bg-secondary"
                            }`}>
                            {request.refundStatus}
                            </span></td>
                            <td>{request.participants}</td>
                            <td>{request.pricePerPerson}.00 Rs</td>
                            <td className="fw-bold text-success">{request.refundAmount}.00 Rs</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RefundRequests;
