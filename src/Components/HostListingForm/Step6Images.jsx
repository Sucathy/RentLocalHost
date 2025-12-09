import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import "./HostListingFormcss/Step6Images.css";

const Step6Images = () => {
    const { formData, setFormData } = useOutletContext();
    const [images, setImages] = useState(formData.images || Array(5).fill(null));

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const newImages = [...images];
            newImages[index] = file;
            setImages(newImages);
            setFormData({ ...formData, images: newImages });
        }
    };

    const addMoreImages = () => {
        if (images.length < 10) {
            const newImages = [...images, ...Array(5).fill(null)].slice(0, 10);
            setImages(newImages);
            setFormData({ ...formData, images: newImages });
        }
    };

    return (
        <div className="step6-page">
            <h2>Add some photos of your place</h2>
            <div className="images-grid">
                {images.map((img, idx) => (
                    <div key={idx} className="image-card">
                        {img ? (
                            <img src={typeof img === "string" ? img : URL.createObjectURL(img)} alt={`upload-${idx}`} />
                        ) : (
                            <label className="upload-placeholder">
                                <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, idx)} style={{ display: "none" }} />
                                + Upload
                            </label>
                        )}
                    </div>
                ))}
            </div>
            {images.length < 10 && (
                <button className="add-more-btn" onClick={addMoreImages}>+ Add More</button>
            )}
        </div>
    );
};

export default Step6Images;
