import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginStyle.css";

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        otp: "",
    });
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSendOtp = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE}/api/hostauth1/send-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.email }),
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
            alert("Error sending OTP");
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE}/api/hostauth1/verify-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.email, otp: formData.otp }),
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

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!otpVerified) {
            alert("Please verify OTP before signing up.");
            return;
        }

        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE}/api/hostauth1/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                alert("Signup successful!");
                navigate("/login");
            } else {
                alert(data.message || "Signup failed");
            }
        } catch (err) {
            console.error("Signup error:", err);
            alert("Something went wrong.");
        }
    };

    return (
        <div className="auth-container">
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    required
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    required
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    required
                    onChange={handleChange}
                />

                {/* ✅ Button Section */}
                {!otpSent && (
                    <button type="button" onClick={handleSendOtp}>
                        Send OTP
                    </button>
                )}

                {otpSent && !otpVerified && (
                    <>
                        <input
                            type="text"
                            name="otp"
                            placeholder="Enter OTP"
                            value={formData.otp}
                            onChange={handleChange}
                            required
                        />
                        <button type="button" onClick={handleVerifyOtp}>
                            Verify OTP
                        </button>
                    </>
                )}

                {otpVerified && (
                    <>
                        <p style={{ color: "green" }}>✅ OTP Verified</p>
                        <button type="submit">Signup</button>
                    </>
                )}
            </form>

            <p style={{ marginTop: "10px" }}>
                Already have an account? <Link to="/login">Login</Link>
            </p>

            <p style={{ marginTop: "10px" }}>
                <Link to="/forgot" style={{ color: "blue", textDecoration: "underline" }}>
                    Forgot Password?
                </Link>
            </p>
        </div>
    );
};

export default SignUp;
