import { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import "./AccountSetting.css";
// ⬆️ adjust the path based on your project structure

const menuItems = [
    { key: "personal", label: "Personal Info" },
    { key: "payments", label: "Bank Details" },
];

const AccountSetting = () => {
    const [active, setActive] = useState("personal");
    const [user, setUser] = useState({});
    const [bank, setBank] = useState({
        accountHolderName: "",
        bankName: "",
        ifscCode: "",
        accountNumber: "",
        confirmAccountNumber: "",
        status: "",
        rejectionReason: "",
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [ifscLoading, setIfscLoading] = useState(false);
    const [ifscError, setIfscError] = useState("");


    // Fetch user and bank details via cookies
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch host profile
                const userRes = await fetch(
                    `${process.env.REACT_APP_API_BASE}/api/hostaccount/profile`,
                    {
                        method: "GET",
                        credentials: "include", // HttpOnly cookie
                    }
                );


                if (userRes.ok) {
                    const data = await userRes.json();
                    setUser(data);
                }

                // Fetch bank details
                const bankRes = await fetch(`${process.env.REACT_APP_API_BASE}/api/bankhost/status`, {
                    method: "GET",
                    credentials: "include",
                });

                if (bankRes.ok) {
                    const bankData = await bankRes.json();
                    if (bankData) setBank(bankData);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Validate IFSC code format (alphanumeric, 11 chars)
    const isValidIFSC = (ifsc) => /^[A-Z]{4}0[A-Z0-9]{6}$/i.test(ifsc);

    const fetchIFSCDetails = async (ifsc) => {
        if (!isValidIFSC(ifsc)) {
            setIfscError("Invalid IFSC format");
            return;
        }

        try {
            setIfscLoading(true);
            setIfscError("");

            const res = await fetch(
                `${process.env.REACT_APP_API_BASE}/api/hostaccount/ifsc/${ifsc}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            if (!res.ok) {
                setIfscError("IFSC not found");
                return;
            }

            const data = await res.json();

            setBank((prev) => ({
                ...prev,
                bankName: data.bankName, // auto fill
            }));
        } catch (err) {
            setIfscError("Failed to verify IFSC");
        } finally {
            setIfscLoading(false);
        }
    };


    const handleBankSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (bank.accountNumber !== bank.confirmAccountNumber) {
            setMessage("Account numbers do not match");
            return;
        }

        if (!isValidIFSC(bank.ifscCode)) {
            setMessage("Invalid IFSC code format");
            return;
        }

        if (!/^\d+$/.test(bank.accountNumber)) {
            setMessage("Account number must be numeric");
            return;
        }

        if (!bank.accountHolderName.trim()) {
            setMessage("Account holder name cannot be empty");
            return;
        }

        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE}/api/bankhost/submit`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bank),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Error submitting bank details");

            setBank(data.bank);
            setMessage(data.message);
        } catch (err) {
            console.error(err);
            setMessage(err.message);
        }
    };

    if (loading) return <div className="content-box">Loading...</div>;

    return (
        <div>
            <Navbar />
            <div className="account-container">
                <div className="left-menu">
                    <h3 className="menu-title">Account Settings</h3>
                    <ul className="menu-list">
                        {menuItems.map((item) => (
                            <li
                                key={item.key}
                                className={`menu-item ${active === item.key ? "active" : ""}`}
                                onClick={() => setActive(item.key)}
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="right-content">
                    {active === "personal" && (
                        <div className="content-box">
                            <h2>Personal Info</h2>
                            <div className="section">
                                <h4>Name</h4>
                                <div className="section-box">{user.fullName || "Not set"}</div>
                            </div>
                            <div className="section">
                                <h4>Email</h4>
                                <div className="section-box">{user.email || "Not set"}</div>
                            </div>
                            <div className="section">
                                <h4>Phone Number</h4>
                                <div className="section-box">{user.phoneNumber || "Not set"}</div>
                            </div>
                        </div>
                    )}



                    {active === "payments" && (
                        <div className="content-box">
                            <h2>Bank account</h2>

                            {bank.status && (
                                <div className="section">
                                    <h4>Bank Verification Status</h4>
                                    <div className="section-box">
                                        {bank.status === "pending" && "Pending Verification ⏳"}
                                        {bank.status === "verified" && "Verified ✅"}
                                        {bank.status === "rejected" && (
                                            <>
                                                Rejected ❌<br />
                                                Reason: {bank.rejectionReason || "Not specified"}
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}

                            <form className="section" onSubmit={handleBankSubmit}>
                                <h4>Bank Details</h4>
                                <input
                                    type="text"
                                    placeholder="Account Holder Name"
                                    value={bank.accountHolderName}
                                    onChange={(e) => setBank({ ...bank, accountHolderName: e.target.value })}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Bank Name (auto-filled from IFSC)"
                                    value={bank.bankName}
                                    disabled
                                />

                                <input
                                    type="text"
                                    placeholder="IFSC Code"
                                    value={bank.ifscCode}
                                    onChange={(e) => {
                                        const ifsc = e.target.value.toUpperCase();
                                        setBank({ ...bank, ifscCode: ifsc });

                                        if (ifsc.length === 11) {
                                            fetchIFSCDetails(ifsc);
                                        }
                                    }}
                                    required
                                />

                                {ifscLoading && <p className="info">Verifying IFSC code…</p>}
                                {ifscError && <p className="error">{ifscError}</p>}


                                <input
                                    type="text"
                                    placeholder="Account Number"
                                    value={bank.accountNumber}
                                    onChange={(e) => setBank({ ...bank, accountNumber: e.target.value.replace(/\D/, "") })}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Confirm Account Number"
                                    value={bank.confirmAccountNumber}
                                    onChange={(e) => setBank({ ...bank, confirmAccountNumber: e.target.value.replace(/\D/, "") })}
                                    required
                                />
                                <button className="btn" type="submit">
                                    Submit Bank Details
                                </button>
                                {message && <p className="message">{message}</p>}
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AccountSetting;
