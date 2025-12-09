import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import "./HostListingFormcss/Step2Price.css";

const Step2Price = () => {
    const { formData, setFormData } = useOutletContext();

    // ✅ Load existing form data
    const [monthlyPrice, setMonthlyPrice] = useState(formData.price?.monthly || 0);
    const [hostName, setHostName] = useState(formData.hostDetails?.name || "");
    const [hostContact, setHostContact] = useState(formData.hostDetails?.contact || "");
    const [showGuestBreakdown, setShowGuestBreakdown] = useState(false);

    // ✅ Fixed deposit info (read-only from backend model)
    const depositInfo = {
        pgDeposit: "Fixed — you’ll get half back when leaving.",
        houseDeposit: {
            "1BHK": 50000,
            "2BHK": 60000,
            "3BHK": 80000,
            "4BHK": 120000,
        },
        flatDeposit: {
            "1BHK": 70000,
            "2BHK": 80000,
            "3BHK": 90000,
            "4BHK": 150000,
        },
    };

    // ✅ Fixed service fee
    const serviceFee = 100;
    const guestPriceBeforeTaxes = monthlyPrice + serviceFee;
    const youEarn = monthlyPrice - serviceFee;

    // ✅ Sync data with formData (to pass to backend)
    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            price: {
                monthly: monthlyPrice,
                serviceFee,
                deposit: depositInfo, // from backend model (fixed)
            },
            hostDetails: {
                name: hostName,
                contact: hostContact,
            },
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [monthlyPrice, hostName, hostContact, setFormData]);

    // ✅ Handle monthly price input
    const handleMonthlyPriceChange = (e) => {
        const value = Math.min(Math.max(Number(e.target.value), 0), 1000000);
        setMonthlyPrice(value);
    };

    return (
        <div className="step2price-container">
            {/* 💰 Monthly Price Section */}
            <div className="card">
                <h2>Set your monthly base price</h2>
                <p>Tip: ₹7,000 is a good starting price.</p>

                <div className="input-group">
                    <span>₹</span>
                    <input
                        type="number"
                        value={monthlyPrice}
                        onChange={handleMonthlyPriceChange}
                        min="0"
                        max="1000000"
                    />
                </div>

                {/* 💡 Price Breakdown */}
                <div className="guest-price-dropdown">
                    <div
                        className="guest-price-summary"
                        onClick={() => setShowGuestBreakdown(!showGuestBreakdown)}
                    >
                        Guest price before taxes: ₹{guestPriceBeforeTaxes}{" "}
                        <span className="arrow">{showGuestBreakdown ? "▲" : "▼"}</span>
                    </div>

                    {showGuestBreakdown && (
                        <div className="guest-breakdown">
                            <p>Base price: ₹{monthlyPrice}</p>
                            <p>Service fee: ₹{serviceFee}</p>
                            <p>You earn: ₹{youEarn}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* 🏦 Deposit Information (Fixed / Read-only) */}
            <div className="card">
                <h2>Deposit Information (Fixed)</h2>

                <div className="premium-details">
                    <h3>PG Deposit</h3>
                    <p>{depositInfo.pgDeposit}</p>

                    <h3>House Deposit</h3>
                    <ul>
                        {Object.entries(depositInfo.houseDeposit).map(([type, amount]) => (
                            <li key={type}>
                                {type}: ₹{amount.toLocaleString()}
                            </li>
                        ))}
                    </ul>

                    <h3>Flat Deposit</h3>
                    <ul>
                        {Object.entries(depositInfo.flatDeposit).map(([type, amount]) => (
                            <li key={type}>
                                {type}: ₹{amount.toLocaleString()}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* 👤 Host Details */}
            <div className="card">
                <h2>Host Details</h2>

                <div className="input-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={hostName}
                        onChange={(e) => setHostName(e.target.value)}
                        placeholder="Enter your name"
                    />
                </div>

                <div className="input-group">
                    <label>Contact number</label>
                    <input
                        type="text"
                        value={hostContact}
                        onChange={(e) => setHostContact(e.target.value)}
                        placeholder="Enter contact number"
                    />
                </div>
            </div>
        </div>
    );
};

export default Step2Price;
