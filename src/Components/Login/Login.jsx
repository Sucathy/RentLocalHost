// src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginStyle.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE}/api/hostauth1/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // Important for cookies
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                alert("Login successful!");
                navigate("/profile"); // Redirect to profile page
            } else {
                alert(data.message || "Login failed. Please check your credentials.");
            }
        } catch (err) {
            console.error("Login error:", err);
            alert("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            <p style={{ marginTop: "10px" }}>
                <Link to="/forgot" style={{ color: "blue", textDecoration: "underline" }}>
                    Forgot Password?
                </Link>
            </p>
            <p style={{ marginTop: "10px" }}>
                Don't have an account? <Link to="/signup">Signup</Link>
            </p>
        </div>
    );
};

export default Login;
