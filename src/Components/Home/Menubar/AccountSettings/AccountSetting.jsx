import { useState } from "react";
import "./AccountSetting.css";

const menuItems = [
    { key: "personal", label: "Personal Info" },
    { key: "login", label: "Login & Security" },
    { key: "payments", label: "Payments & Payouts" },
];

const AccountSetting = () => {
    const [active, setActive] = useState("personal");

    const renderContent = () => {
        switch (active) {
            case "personal":
                return (
                    <div className="content-box">
                        <h2>Personal Info</h2>
                        <p>Your legal name, address, phone number and more</p>

                        <div className="section">
                            <h4>Name</h4>
                            <div className="section-box">Your name goes here</div>
                        </div>

                        <div className="section">
                            <h4>Email</h4>
                            <div className="section-box">example@gmail.com</div>
                        </div>

                        <div className="section">
                            <h4>Phone Number</h4>
                            <div className="section-box">+91 ******7890</div>
                        </div>

                    </div>
                );

            case "login":
                return (
                    <div className="content-box">
                        <h2>Login & Security</h2>
                        <p>Manage your password and security settings</p>

                        <div className="section">
                            <h4>Password</h4>
                            <button className="btn">Change Password</button>
                        </div>

                        <div className="section">
                            <h4>Two-step authentication</h4>
                            <button className="btn">Enable</button>
                        </div>
                    </div>
                );

            case "payments":
                return (
                    <div className="content-box">
                        <h2>Payments & Payouts</h2>
                        <p>Manage your payment methods</p>

                        <div className="section">
                            <h4>Saved Cards</h4>
                            <div className="section-box">No cards saved</div>
                        </div>
                    </div>
                );



            default:
                return null;
        }
    };

    return (
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

            <div className="right-content">{renderContent()}</div>
        </div>
    );
};

export default AccountSetting;
