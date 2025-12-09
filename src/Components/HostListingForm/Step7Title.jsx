import { useOutletContext } from "react-router-dom";
import "./HostListingFormcss/Step7Title.css";

const Step7Title = () => {
    const { formData, setFormData } = useOutletContext();

    // Optional: handle input change with validation
    const handleChange = (field, value, maxLength) => {
        if (value.length <= maxLength) {
            setFormData({ ...formData, [field]: value });
        }
    };

    return (
        <div className="step7-page">
            <h2>Now, let's give your house a title</h2>
            <p className="subtitle">
                Short titles work best. Have fun with it – you can always change it later.
            </p>

            <input
                type="text"
                placeholder="Enter a catchy title"
                value={formData.title || ""}
                onChange={(e) => handleChange("title", e.target.value, 50)}
                maxLength={50}
            />

            <textarea
                placeholder="Write a short description about your place"
                value={formData.description || ""}
                onChange={(e) => handleChange("description", e.target.value, 200)}
                maxLength={200}
            ></textarea>

            <div className="char-count">{formData.description?.length || 0} / 200 characters</div>

            {/* Optional: Warning if fields are empty */}
            {(formData.title === "" || formData.description === "") && (
                <p className="warning-text">Please provide both a title and description before submitting.</p>
            )}
        </div>
    );
};

export default Step7Title;
