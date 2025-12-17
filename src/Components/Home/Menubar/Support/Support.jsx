import { Mail, Phone } from "lucide-react";
import Navbar from "../../Navbar/Navbar";
import "./Support.css";
const Support = () => {
    // const navigate = useNavigate();
    // const handleBack = () => {
    //     navigate("/"); // Back to home
    // };
    return (
        <div>
            <Navbar />
            <div>
                {/* <NavBar /> */}
                {/* <button className="back-btn-support" onClick={handleBack}>
                    <FaArrowLeft /> Back back
                </button> */}
                <div className="support-container">

                    <div className="support-card">

                        <h2>Support</h2>
                        <p className="support-text">If you need help, feel free to contact us:</p>

                        <div className="support-item">
                            <Mail className="support-icon" />
                            <span>susuresh158@gmail.com</span>
                        </div>

                        <div className="support-item">
                            <Phone className="support-icon" />
                            <span>+91 63632 03638</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;
