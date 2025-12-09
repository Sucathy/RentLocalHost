// src/Pages/Host/StepBHKType.jsx
import { useOutletContext } from "react-router-dom";
import "./HostListingFormcss/StepBHKType.css";

const bhkOptions = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK"];

const StepBHKType = () => {
    const { formData, setFormData } = useOutletContext();

    const handleSelect = (option) => {
        setFormData(prev => ({ ...prev, bhkType: option }));
    };

    return (
        <div className="stephbktype-page">
            <h2>Choose your BHK type</h2>
            <div className="stephbktype-options-grid">
                {bhkOptions.map((option) => (
                    <div
                        key={option}
                        className={`stephbktype-option-card ${formData.bhkType === option ? "selected" : ""}`}
                        onClick={() => handleSelect(option)}
                    >
                        <div className="stephbktype-option-label">{option}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StepBHKType;
