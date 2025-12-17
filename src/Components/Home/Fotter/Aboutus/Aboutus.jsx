import Navbar from "../../Navbar/Navbar";
import "./Aboutus.css";

const Aboutus = () => {
    return (
        <>
            <Navbar />
            <div className="about-container">


                <div className="about-hero">
                    <h1>About Us</h1>
                    <p>Making your stay search simple, fast, and Secure 🚀</p>
                </div>

                <div className="about-section">
                    <h2>Who We Are</h2>
                    <p>
                        We are a passionate team dedicated to helping students and working professionals
                        find the perfect stay accommodation in their local area. Our mission is to make
                        the search for paying guests stress-free, transparent, and reliable.
                    </p>
                </div>

                <div className="about-section">
                    <h2>What We Do</h2>
                    <p>
                        We connect you with stay in your city and neighborhood, so you don’t waste time
                        searching endlessly. Whether you need a budget-friendly option or a premium stay,
                        we make it easy to compare, choose, and book your ideal stay.
                    </p>
                </div>

                <div className="about-section">
                    <h2>Our Mission</h2>
                    <p>
                        To make stay hunting as easy as booking a cab — quick, trustworthy, and local.
                        We believe everyone deserves a safe and comfortable stay without the hassle of
                        brokers or fake listings.
                    </p>
                </div>

                <div className="about-section">
                    <h2>Why Choose Us?</h2>
                    <ul>
                        <li>🔍 Find stay near your college or office</li>
                        <li>💰 Compare prices and amenities easily</li>
                        <li>🏠 Verified listings with real details</li>
                        <li>⚡ Fast, smooth, and user-friendly experience</li>
                    </ul>
                </div>

                <div className="about-footer">
                    <p>Still have questions? Contact us at <b>support@vnsrooms.com</b></p>
                </div>
            </div>
        </>
    );
};

export default Aboutus;
