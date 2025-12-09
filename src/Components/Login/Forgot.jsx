import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginStyle.css";

const Forgot = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);

    const navigate = useNavigate();

    // ✅ Step 1: Send OTP
    const handleSendOtp = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE}/api/auth/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();

            if (res.ok) {
                alert("OTP sent to your email!");
                setOtpSent(true);
            } else {
                alert(data.message || "Failed to send OTP");
            }
        } catch (err) {
            console.error("Error sending OTP:", err);
        }
    };

    // ✅ Step 2: Verify OTP
    const handleVerifyOtp = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE}/api/auth/verify-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });

            const data = await res.json();
            if (res.ok) {
                alert("OTP verified successfully!");
                setOtpVerified(true);
            } else {
                alert(data.message || "Invalid OTP");
            }
        } catch (err) {
            console.error("Error verifying OTP:", err);
        }
    };

    // ✅ Step 3: Reset Password
    const handleResetPassword = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE}/api/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp, newPassword }),
            });

            const data = await res.json();

            if (res.ok) {
                alert("Password reset successful!");
                navigate("/login");
            } else {
                alert(data.message || "Failed to reset password");
            }
        } catch (err) {
            console.error("Reset password error:", err);
        }
    };

    return (
        <div className="auth-container">
            <h2>Forgot Password</h2>

            {!otpSent && (
                <>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button onClick={handleSendOtp}>Send OTP</button>
                </>
            )}

            {otpSent && !otpVerified && (
                <>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                    <button onClick={handleVerifyOtp}>Verify OTP</button>
                </>
            )}

            {otpVerified && (
                <>
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <button onClick={handleResetPassword}>Reset Password</button>
                </>
            )}

            <p style={{ marginTop: "15px" }}>
                <Link to="/login">Back to Login</Link>
            </p>
        </div>
    );
};

export default Forgot;
