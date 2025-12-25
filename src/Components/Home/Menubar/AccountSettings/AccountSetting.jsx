// import { useEffect, useState } from "react";
// import Navbar from "../../Navbar/Navbar";
// import "./AccountSetting.css";

// const AccountSetting = () => {
//     const [bank, setBank] = useState({
//         accountHolderName: "",
//         bankName: "",
//         ifscCode: "",
//         accountNumber: "",
//         confirmAccountNumber: "",
//         status: "",
//         rejectionReason: "",
//     });

//     const [loading, setLoading] = useState(true);
//     const [message, setMessage] = useState("");
//     const [ifscLoading, setIfscLoading] = useState(false);
//     const [ifscError, setIfscError] = useState("");

//     // ================= FETCH BANK =================
//     useEffect(() => {
//         const fetchBank = async () => {
//             try {
//                 const res = await fetch(
//                     `${process.env.REACT_APP_API_BASE}/api/bankhost/status`,
//                     { credentials: "include" }
//                 );

//                 if (res.ok) {
//                     const data = await res.json();
//                     if (data) setBank(data);
//                 }
//             } catch (err) {
//                 console.error("Bank fetch error:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchBank();
//     }, []);

//     // ================= IFSC =================
//     const isValidIFSC = (ifsc) =>
//         /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc);

//     const fetchIFSCDetails = async (ifsc) => {
//         try {
//             setIfscLoading(true);
//             setIfscError("");

//             const res = await fetch(
//                 `${process.env.REACT_APP_API_BASE}/api/hostaccount/ifsc/${ifsc}`,
//                 { credentials: "include" }
//             );

//             if (!res.ok) throw new Error();

//             const data = await res.json();

//             setBank((prev) => ({
//                 ...prev,
//                 bankName: data.bankName || "",
//             }));
//         } catch {
//             setIfscError("Invalid IFSC code");
//             setBank((prev) => ({ ...prev, bankName: "" }));
//         } finally {
//             setIfscLoading(false);
//         }
//     };

//     // ================= SUBMIT =================
//     const handleBankSubmit = async (e) => {
//         e.preventDefault();
//         setMessage("");

//         if (!bank.bankName) {
//             setMessage("Please verify IFSC code");
//             return;
//         }

//         if (bank.accountNumber !== bank.confirmAccountNumber) {
//             setMessage("Account numbers do not match");
//             return;
//         }

//         try {
//             const res = await fetch(
//                 `${process.env.REACT_APP_API_BASE}/api/bankhost/submit`,
//                 {
//                     method: "POST",
//                     credentials: "include",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(bank),
//                 }
//             );

//             const data = await res.json();
//             if (!res.ok) throw new Error(data.message);

//             setBank(data.bank);
//             setMessage("Bank details submitted successfully");
//         } catch (err) {
//             setMessage(err.message);
//         }
//     };

//     if (loading) return <div className="content-box">Loading...</div>;

//     return (
//         <>
//             <Navbar />

//             <div className="account-container">
//                 <div className="content-box">
//                     <h2>Bank Account Details</h2>

//                     {/* STATUS */}
//                     {bank.status && (
//                         <div className="section-box">
//                             {bank.status === "pending" && "Pending ⏳"}
//                             {bank.status === "verified" && "Verified ✅"}
//                             {bank.status === "rejected" && (
//                                 <>
//                                     Rejected ❌ <br />
//                                     Reason: {bank.rejectionReason}
//                                 </>
//                             )}
//                         </div>
//                     )}

//                     {/* FORM */}
//                     <form className="section" onSubmit={handleBankSubmit}>
//                         <input
//                             placeholder="Account Holder Name"
//                             value={bank.accountHolderName}
//                             onChange={(e) =>
//                                 setBank({ ...bank, accountHolderName: e.target.value })
//                             }
//                             required
//                         />

//                         <input
//                             placeholder="Bank Name"
//                             value={bank.bankName}
//                             disabled
//                         />

//                         <input
//                             placeholder="IFSC Code"
//                             value={bank.ifscCode}
//                             maxLength={11}
//                             onChange={(e) => {
//                                 const val = e.target.value.toUpperCase();
//                                 setBank({ ...bank, ifscCode: val, bankName: "" });
//                                 setIfscError("");

//                                 if (val.length === 11 && isValidIFSC(val)) {
//                                     fetchIFSCDetails(val);
//                                 }
//                             }}
//                             required
//                         />

//                         {ifscLoading && <p className="info">Verifying IFSC…</p>}
//                         {ifscError && <p className="error">{ifscError}</p>}

//                         <input
//                             placeholder="Account Number"
//                             value={bank.accountNumber}
//                             onChange={(e) =>
//                                 setBank({
//                                     ...bank,
//                                     accountNumber: e.target.value.replace(/\D/g, ""),
//                                 })
//                             }
//                             required
//                         />

//                         <input
//                             placeholder="Confirm Account Number"
//                             value={bank.confirmAccountNumber}
//                             onChange={(e) =>
//                                 setBank({
//                                     ...bank,
//                                     confirmAccountNumber: e.target.value.replace(/\D/g, ""),
//                                 })
//                             }
//                             required
//                         />

//                         <button
//                             className="btn"
//                             disabled={ifscLoading || !!ifscError || !bank.bankName}
//                         >
//                             Submit Bank Details
//                         </button>

//                         {message && <p className="message">{message}</p>}
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default AccountSetting;



import { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import "./AccountSetting.css";

const AccountSetting = () => {
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
    const [showForm, setShowForm] = useState(false);

    // ================= FETCH BANK =================
    useEffect(() => {
        const fetchBank = async () => {
            try {
                const res = await fetch(
                    `${process.env.REACT_APP_API_BASE}/api/bankhost/status`,
                    { credentials: "include" }
                );

                if (res.ok) {
                    const data = await res.json();

                    if (data && data.accountNumber) {
                        setBank(data);
                        setShowForm(false); // show table
                    } else {
                        setShowForm(true); // show form
                    }
                }
            } catch (err) {
                console.error("Bank fetch error:", err);
                setShowForm(true);
            } finally {
                setLoading(false);
            }
        };

        fetchBank();
    }, []);

    // ================= IFSC =================
    const isValidIFSC = (ifsc) =>
        /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc);

    const fetchIFSCDetails = async (ifsc) => {
        try {
            setIfscLoading(true);
            setIfscError("");

            const res = await fetch(
                `${process.env.REACT_APP_API_BASE}/api/hostaccount/ifsc/${ifsc}`,
                { credentials: "include" }
            );

            if (!res.ok) throw new Error();

            const data = await res.json();

            setBank((prev) => ({
                ...prev,
                bankName: data.bankName || "",
            }));
        } catch {
            setIfscError("Invalid IFSC code");
            setBank((prev) => ({ ...prev, bankName: "" }));
        } finally {
            setIfscLoading(false);
        }
    };

    // ================= SUBMIT =================
    const handleBankSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!bank.bankName) {
            setMessage("Please verify IFSC code");
            return;
        }

        if (bank.accountNumber !== bank.confirmAccountNumber) {
            setMessage("Account numbers do not match");
            return;
        }

        try {
            const res = await fetch(
                `${process.env.REACT_APP_API_BASE}/api/bankhost/submit`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(bank),
                }
            );

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            setBank(data.bank);
            setMessage("Bank details submitted successfully");
            setShowForm(false); // hide form, show table
        } catch (err) {
            setMessage(err.message);
        }
    };

    if (loading) return <div className="content-box">Loading...</div>;

    return (
        <>
            <Navbar />

            <div className="account-container">
                <div className="content-box">
                    <h2>Bank Account Details</h2>

                    {/* ===== BANK TABLE ===== */}
                    {bank.accountNumber && !showForm && (
                        <div className="section-box">
                            <div className="table-header">
                                <h3>Saved Bank Account</h3>

                                <button
                                    className="add-btn"
                                    onClick={() => setShowForm(true)}
                                >
                                    + Add / Edit Bank
                                </button>
                            </div>

                            <table className="bank-table">
                                <thead>
                                    <tr>
                                        <th>Account Holder</th>
                                        <th>Bank</th>
                                        <th>IFSC</th>
                                        <th>Account No</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{bank.accountHolderName}</td>
                                        <td>{bank.bankName}</td>
                                        <td>{bank.ifscCode}</td>
                                        <td>XXXX{bank.accountNumber.slice(-4)}</td>
                                        <td>
                                            {bank.status === "pending" && "⏳ Pending"}
                                            {bank.status === "verified" && "✅ Verified"}
                                            {bank.status === "rejected" && "❌ Rejected"}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            {bank.status === "rejected" && (
                                <p className="error">
                                    Reason: {bank.rejectionReason}
                                </p>
                            )}
                        </div>
                    )}

                    {/* ===== FORM ===== */}
                    {showForm && (
                        <form className="section" onSubmit={handleBankSubmit}>
                            <input
                                placeholder="Account Holder Name"
                                value={bank.accountHolderName}
                                onChange={(e) =>
                                    setBank({ ...bank, accountHolderName: e.target.value })
                                }
                                required
                            />

                            <input
                                placeholder="Bank Name"
                                value={bank.bankName}
                                disabled
                            />

                            <input
                                placeholder="IFSC Code"
                                value={bank.ifscCode}
                                maxLength={11}
                                onChange={(e) => {
                                    const val = e.target.value.toUpperCase();
                                    setBank({ ...bank, ifscCode: val, bankName: "" });
                                    setIfscError("");

                                    if (val.length === 11 && isValidIFSC(val)) {
                                        fetchIFSCDetails(val);
                                    }
                                }}
                                required
                            />

                            {ifscLoading && <p className="info">Verifying IFSC…</p>}
                            {ifscError && <p className="error">{ifscError}</p>}

                            <input
                                placeholder="Account Number"
                                value={bank.accountNumber}
                                onChange={(e) =>
                                    setBank({
                                        ...bank,
                                        accountNumber: e.target.value.replace(/\D/g, ""),
                                    })
                                }
                                required
                            />

                            <input
                                placeholder="Confirm Account Number"
                                value={bank.confirmAccountNumber}
                                onChange={(e) =>
                                    setBank({
                                        ...bank,
                                        confirmAccountNumber: e.target.value.replace(/\D/g, ""),
                                    })
                                }
                                required
                            />

                            <button
                                className="btn"
                                disabled={ifscLoading || !!ifscError || !bank.bankName}
                            >
                                Submit Bank Details
                            </button>

                            {message && <p className="message">{message}</p>}
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};

export default AccountSetting;
