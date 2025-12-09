
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the external CSS file

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <div>
            {/* Top navigation bar */}
            <nav className="navbar">

                <div className="navbar-brand">VNS</div>

                <div className="menu-icon" onClick={toggleMenu}>
                    ☰
                </div>

            </nav>

            {/* Sidebar menu */}
            <div className={`sidebar ${menuOpen ? "open" : ""}`}>
                <div className="sidebar-header">
                    <button className="close-btn" onClick={toggleMenu}>
                        ✕
                    </button>
                </div>
                <Link to="/" className="nav-link" onClick={toggleMenu}>
                    Home
                </Link>
                <Link to="/profile" className="nav-link" onClick={toggleMenu}>
                    Profile
                </Link>
                <Link to="/accountsetting" className="nav-link" onClick={toggleMenu}>
                    account setting
                </Link>
                {/* <Link to="/wishlist" className="nav-link" onClick={toggleMenu}>
                    Wishlist
                </Link>
                <Link to="/trip" className="nav-link" onClick={toggleMenu}>
                    Trips
                </Link> */}
                {/* <Link to="/hostes" className="nav-link" onClick={toggleMenu}>
                check host
                </Link> */}
                {/* <Link to="/hostes" className="nav-link" onClick={toggleMenu}>
                    Become a Host
                </Link> */}
                {/* <Link to="/Message" className="nav-link" onClick={toggleMenu}>
                    Message
                </Link> */}
                <Link to="/support" className="nav-link" onClick={toggleMenu}>
                    Support
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
