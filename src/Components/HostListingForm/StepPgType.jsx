// src/Pages/Host/StepPgType.jsx
import { useOutletContext } from "react-router-dom";
import "./HostListingFormcss/StepPgType.css"; // Correct CSS import

const pgOptions = [
    { id: "1 Sharing", label: "1 Sharing" },
    { id: "2 Sharing", label: "2 Sharing" },
    { id: "3 Sharing", label: "3 Sharing" },
    { id: "4 Sharing", label: "4 Sharing" },
    { id: "5 Sharing", label: "5 Sharing" },
    { id: "Co-living", label: "Co-living" },
];

const StepPgType = () => {
    const { formData, setFormData } = useOutletContext();

    const handleSelect = (optionId) => {
        setFormData(prev => ({ ...prev, pgType: optionId }));
    };

    return (
        <div className="steppgtype-page">
            <h2>Choose your PG type</h2>
            <div className="steppgtype-options-grid">
                {pgOptions.map((option) => (
                    <div
                        key={option.id}
                        className={`steppgtype-option-card ${formData.pgType === option.id ? "selected" : ""}`}
                        onClick={() => handleSelect(option.id)}
                    >
                        <div className="steppgtype-option-label">{option.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StepPgType;
