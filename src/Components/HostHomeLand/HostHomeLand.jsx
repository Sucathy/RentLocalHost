import { useState } from "react";
import HostBookingStatus from "./HostBooking/HostBookingStatus";
import "./HostHomeLand.css";
import HostListing from "./HostListing/HostListing";
import HostMessageSection from "./HostMessage/HostMessageSection";

const HostHomeLand = () => {
    const [activeTab, setActiveTab] = useState("listing");
    // const navigate = useNavigate();

    // const handleBack = () => {
    //     navigate("/"); // 👈 Goes back to the previous page
    // };

    return (
        <div className="host-home-container">
            {/* 🔙 Back Button */}
            {/* <button className="back-btn" onClick={handleBack}>
                Back
            </button> */}

            <h1 className="page-title">Host Dashboard</h1>

            {/* Tab Buttons */}
            <div className="host-tabs">
                <button
                    className={activeTab === "listing" ? "active" : ""}
                    onClick={() => setActiveTab("listing")}
                >
                    Listings
                </button>
                <button
                    className={activeTab === "booking" ? "active" : ""}
                    onClick={() => setActiveTab("booking")}
                >
                    Bookings
                </button>
                <button
                    className={activeTab === "messages" ? "active" : ""}
                    onClick={() => setActiveTab("messages")}
                >
                    Messages
                </button>
            </div>

            {/* Content Section */}
            <div className="host-content">
                {activeTab === "listing" && <HostListing />}
                {activeTab === "booking" && <HostBookingStatus />}
                {activeTab === "messages" && <HostMessageSection />}
            </div>
        </div>
    );
};

export default HostHomeLand;
