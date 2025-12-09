// src/pages/Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginStyle.css";
const LogOut = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("user");
        navigate("/login");
    }, [navigate]);

    return null;
};

export default LogOut;
