import axios from "axios";
import { useEffect, useState } from "react";
import "./HostBookingStatus.css";

const HostBookingStatus = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    // const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_API_BASE}/api/hostListingDetails/bookings`,
                    { withCredentials: true }
                );
                setBookings(res.data.bookings || []);
            } catch (err) {
                console.error("Error fetching trips:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    if (loading) return <p className="loading-text">Loading bookings...</p>;

    if (bookings.length === 0)
        return (
            <div className="trip-nobooking-style">
                <p className="empty-text">No bookings found for your properties.</p>
            </div>
        );

    // const handleBack = () => navigate("/");

    return (
        <div >
            {/* <button className="back-btn" onClick={handleBack}>
                Back
            </button> */}

            <h2 className="trips-title">Host Bookings</h2>

            <div className="trips-grid">
                {bookings.map((b) => {
                    const imageUrl =
                        b.pgId?.images?.[0]
                            ? b.pgId.images[0].startsWith("http")
                                ? b.pgId.images[0]
                                : `${process.env.REACT_APP_API_BASE}/${b.pgId.images[0]}`
                            : "/fallback.jpg";

                    return (
                        <div key={b._id} className="trip-card">
                            <img src={imageUrl} alt="PG" className="trip-image" />

                            <div className="trip-content">
                                <h3 className="trip-name">{b.pgId?.title || "PG Name"}</h3>

                                <p className="trip-location">
                                    {b.pgId?.location
                                        ? `${b.pgId.location.street}, ${b.pgId.location.locality}, ${b.pgId.location.city}, ${b.pgId.location.state}`
                                        : "Location not available"}
                                </p>

                                <div className="trip-dates">
                                    <p><strong>Check-in:</strong> {new Date(b.checkIn).toLocaleDateString()}</p>
                                    <p><strong>Check-out:</strong> {new Date(b.checkOut).toLocaleDateString()}</p>
                                </div>

                                <div className="trip-payment-box">
                                    <p><strong>Payment ID:</strong> {b.receipt || "N/A"}</p>
                                    <p><strong>Amount:</strong> ₹{b.totalAmount}</p>

                                    <span className={`trip-status ${b.paymentStatus === "Paid" ? "paid" : "pending"}`}>
                                        {b.paymentStatus}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HostBookingStatus;


// const HostBookingStatus = () => {
//     return (
//         <div className="booking-status">
//             <h2>Booking Status</h2>
//             <p style={{ textAlign: "center", marginTop: "20px", fontSize: "16px", color: "#777" }}>
//                 🚧 Coming Soon 🚧
//             </p>
//         </div>
//     );
// };

// export default HostBookingStatus;
