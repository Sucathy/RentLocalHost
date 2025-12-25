import { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import "./Payout.css";

const Payout = () => {
    const [stats, setStats] = useState({
        today: 0,
        week: 0,
        month: 0,
        year: 0,
        total: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayoutStats = async () => {
            try {
                const res = await fetch(
                    `${process.env.REACT_APP_API_BASE}/api/payouts/summary`
                );
                const data = await res.json();
                setStats(data);
            } catch (err) {
                console.error("Payout fetch error", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPayoutStats();
    }, []);

    if (loading) return <div className="content-box">Loading payouts…</div>;

    return (
        <>
            <Navbar />

            <div className="payout-container">
                <h2>Payouts & Earnings</h2>

                <div className="card-grid">
                    <PayoutCard title="Today" value={stats.today} />
                    <PayoutCard title="Last 7 Days" value={stats.week} />
                    <PayoutCard title="This Month" value={stats.month} />
                    <PayoutCard title="This Year" value={stats.year} />
                    <PayoutCard title="Total Earnings" value={stats.total} highlight />
                </div>
            </div>
        </>
    );
};

const PayoutCard = ({ title, value, highlight }) => (
    <div className={`payout-card ${highlight ? "highlight" : ""}`}>
        <p className="card-title">{title}</p>
        <h3>₹ {value.toLocaleString("en-IN")}</h3>
    </div>
);

export default Payout;
