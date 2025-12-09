import { useOutletContext } from "react-router-dom";
import "./HostListingFormcss/Step4Location.css";

const Step4Location = () => {
    const { formData, setFormData } = useOutletContext();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            location: { ...formData.location, [e.target.name]: e.target.value },
        });
    };

    return (
        <div className="step-page">
            <h2>Where’s your place located?</h2>
            <form className="form-grid">
                <input type="text" name="country" placeholder="Country" value={formData.location?.country || ""} onChange={handleChange} />
                <input type="text" name="state" placeholder="State" value={formData.location?.state || ""} onChange={handleChange} />
                <input type="text" name="city" placeholder="City" value={formData.location?.city || ""} onChange={handleChange} />
                <input type="text" name="street" placeholder="Street Address" value={formData.location?.street || ""} onChange={handleChange} />
                <input type="text" name="landmark" placeholder="Landmark" value={formData.location?.landmark || ""} onChange={handleChange} />
                <input type="text" name="locality" placeholder="Locality" value={formData.location?.locality || ""} onChange={handleChange} />
                <input type="text" name="pincode" placeholder="Pincode" value={formData.location?.pincode || ""} onChange={handleChange} />
            </form>
        </div>
    );
};

export default Step4Location;
