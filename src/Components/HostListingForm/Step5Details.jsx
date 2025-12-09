import { useOutletContext } from "react-router-dom";
import "./HostListingFormcss/Step5Details.css";

const Step5Details = () => {
    const { formData, setFormData } = useOutletContext();

    const updateField = (field, value) => {
        setFormData({
            ...formData,
            details: { ...formData.details, [field]: value },
        });
    };

    const Counter = ({ label, field, value }) => (
        <div className="counter">
            <span className="counter-label">{label}</span>
            <div className="counter-controls">
                <button type="button" onClick={() => updateField(field, Math.max(0, value - 1))}>-</button>
                <span className="counter-value">{value}</span>
                <button type="button" onClick={() => updateField(field, value + 1)}>+</button>
            </div>
        </div>
    );

    return (
        <div className="step5-page">
            <h2>Share some details about your place</h2>
            <p>You'll add more details later, such as bed types.</p>
            <div className="details-card">
                <Counter label="Guests" field="guests" value={formData.details.guests || 0} />
                <Counter label="Bedrooms" field="bedrooms" value={formData.details.bedrooms || 0} />
                <Counter label="Beds" field="beds" value={formData.details.beds || 0} />
                <Counter label="Bathrooms" field="bathrooms" value={formData.details.bathrooms || 0} />
            </div>
        </div>
    );
};

export default Step5Details;
