import { useOutletContext } from "react-router-dom";
import "./HostListingFormcss/Step9Amenities.css";

const amenitiesList = [
    "AC",
    "TV",
    "Food Included",
    "Parking",
    "WiFi",
    "Washing Machine",
    "Kitchen Access",
    "Housekeeping",
    "Geyser",
    "CCTV",
];

const Step9Amenities = () => {
    const { formData, setFormData, goNext } = useOutletContext();

    const toggleAmenity = (amenity) => {
        const updated = formData.amenities.includes(amenity)
            ? formData.amenities.filter((a) => a !== amenity)
            : [...formData.amenities, amenity];

        setFormData({ ...formData, amenities: updated });
    };

    return (
        <div className="amenities-page">
            <h2>Select the amenities your property offers</h2>
            <p className="subtitle">Pick all amenities that apply.</p>

            <div className="amenities-grid">
                {amenitiesList.map((item, index) => (
                    <div
                        key={index}
                        className={`amenity-box ${formData.amenities.includes(item) ? "active" : ""}`}
                        onClick={() => toggleAmenity(item)}
                    >
                        <input type="checkbox" checked={formData.amenities.includes(item)} readOnly />
                        <span>{item}</span>
                    </div>
                ))}
            </div>

            <button className="next-btn-amenities" onClick={goNext}>
                Continue
            </button>
        </div>
    );
};

export default Step9Amenities;
