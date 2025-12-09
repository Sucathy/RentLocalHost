
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditableLocationMap from "./EditableLocationMap";
import "./HostListingEdit.css";

const API = `${process.env.REACT_APP_API_BASE}/api/hostListingDetails`;



const HostListingEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userId: "",
        propertyType: "",
        roomType: "",
        pgType: "",
        amenities: [],
        // amenities: "",
        bhkType: "",
        location: {
            country: "",
            state: "",
            city: "",
            street: "",
            landmark: "",
            locality: "",
            pincode: "",
        },
        locationmap: {
            latitude: "",
            longitude: "",
        },
        details: {
            guests: 0,
            bedrooms: 0,
            beds: 0,
            bathrooms: 0,
        },
        price: {
            monthly: 0,
            serviceFee: 100,
        },
        hostDetails: {
            name: "",
            contact: "",
        },
        title: "",
        description: "",
        images: [],
    });

    const [newImageUrl, setNewImageUrl] = useState("");
    const [customAmenity, setCustomAmenity] = useState("");



    // -----------------------------------------------------
    // FETCH LISTING
    // -----------------------------------------------------
    useEffect(() => {
        const fetchListing = async () => {
            try {
                const res = await axios.get(`${API}/user/${id}`, { withCredentials: true });

                if (res.data.success && res.data.listing) {
                    const listing = res.data.listing;

                    setFormData((prev) => ({
                        ...prev,
                        ...listing,
                        location: listing.location || prev.location,
                        locationmap: listing.locationmap || prev.locationmap,
                        details: listing.details || prev.details,
                        amenities: listing.amenities || prev.amenities,
                        price: listing.price || prev.price,
                        hostDetails: listing.hostDetails || prev.hostDetails,
                        images: listing.images || [],
                    }));
                }
            } catch (error) {
                console.error("Failed to fetch listing:", error);
                alert(error.response?.data?.message || "Failed to load listing");
            }
        };

        fetchListing();
    }, [id]);

    // -----------------------------------------------------
    // INPUT CHANGE HANDLERS
    // -----------------------------------------------------
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "propertyType") {
            setFormData((prev) => ({
                ...prev,
                propertyType: value,
                pgType: value === "PG" ? prev.pgType : "",
                bhkType: value !== "PG" ? prev.bhkType : "",
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleNestedChange = (section, key, value) => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value,
            },
        }));
    };

    // -----------------------------------------------------
    // ADD IMAGE BY URL something happend
    // -----------------------------------------------------
    const handleAddImage = () => {
        if (!newImageUrl.trim()) return;

        setFormData((prev) => ({
            ...prev,
            images: [...prev.images, newImageUrl.trim()],
        }));

        setNewImageUrl("");
    };

    const toggleAmenity = (amenity) => {
        const updated = formData.amenities.includes(amenity)
            ? formData.amenities.filter((a) => a !== amenity)
            : [...formData.amenities, amenity];
        setFormData({ ...formData, amenities: updated });
    };

    // const amenitiesOptions = [
    //     "AC",
    //     "TV",
    //     "Food Included",
    //     "Parking",
    //     "WiFi",
    //     "Washing Machine",
    //     "Kitchen Access",
    //     "Housekeeping",
    //     "Geyser",
    //     "CCTV",
    // ];

    // const addCustomAmenity = () => {
    //     const trimmed = customAmenity.trim();
    //     if (!trimmed) return;

    //     if (!formData.amenities.includes(trimmed)) {
    //         setFormData({ ...formData, amenities: [...formData.amenities, trimmed] });
    //     }
    //     setCustomAmenity("");
    // };



    const handleDeleteImage = (index) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    };


    // -----------------------------------------------------
    // SUBMIT UPDATE
    // -----------------------------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.put(`${API}/user/${id}`, formData, {
                withCredentials: true,
            });

            if (res.data.success) {
                alert("Listing updated successfully!");
                navigate("/");
            }
        } catch (error) {
            console.error("Update failed:", error);
            alert(error.response?.data?.message || "Failed to update listing");
        }
    };

    return (
        <div className="host-edit-container">
            <div className="host-edit-card">

                <h2>Edit Your Listing</h2>

                <form onSubmit={handleSubmit} className="host-edit-form">

                    {/* PROPERTY TYPE */}
                    <div className="edit-section">
                        <div className="edit-left">
                            <h4>Property details</h4>
                        </div>

                        <div className="edit-right">

                            <div className="form-group">
                                <label>Property Type</label>
                                <select
                                    name="propertyType"
                                    value={formData.propertyType}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Property Type</option>
                                    <option value="PG">PG</option>
                                    <option value="House">House</option>
                                    <option value="Flat">Flat</option>
                                    <option value="Apartment">Apartment</option>
                                    <option value="Guest House">Guest House</option>
                                    <option value="Farm">Farm</option>
                                </select>
                            </div>

                            {formData.propertyType === "PG" && (
                                <div className="form-group">
                                    <label>PG Type</label>
                                    <input
                                        name="pgType"
                                        value={formData.pgType}
                                        onChange={handleChange}
                                        placeholder="Ex: Boys PG / Girls PG"
                                    />
                                </div>
                            )}

                            {formData.propertyType !== "PG" && formData.propertyType && (
                                <div className="form-group">
                                    <label>BHK Type</label>
                                    <input
                                        name="bhkType"
                                        value={formData.bhkType}
                                        onChange={handleChange}
                                        placeholder="Ex: 1BHK / 2BHK"
                                    />
                                </div>
                            )}
                        </div>

                    </div>


                    <div className="edit-section">
                        <div className="edit-left"><h4>Amenities</h4></div>
                        <div className="edit-right">
                            <div className="form-group amenities-edit-grid">
                                {[
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
                                ].concat(
                                    // Include any custom amenities already added
                                    formData.amenities.filter(
                                        (a) => ![
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
                                        ].includes(a)
                                    )
                                ).map((amenity) => (
                                    <label key={amenity} className="amenity-edit-box">
                                        <input
                                            type="checkbox"
                                            checked={formData.amenities.includes(amenity)}
                                            onChange={() => toggleAmenity(amenity)}
                                        />
                                        <span>{amenity}</span>
                                    </label>
                                ))}
                            </div>

                            {/* Custom Amenity Input */}
                            <div className="amenity-edit-box custom-amenity">
                                <input
                                    type="text"
                                    placeholder="Add custom amenity"
                                    value={customAmenity}
                                    onChange={(e) => setCustomAmenity(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const trimmed = customAmenity.trim();
                                        if (!trimmed) return;
                                        if (!formData.amenities.includes(trimmed)) {
                                            setFormData({
                                                ...formData,
                                                amenities: [...formData.amenities, trimmed],
                                            });
                                        }
                                        setCustomAmenity("");
                                    }}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>




                    {/* LOCATION */}
                    <div className="edit-section">
                        <div className="edit-left">
                            <h4> Location Details</h4>
                        </div>


                        <div className="edit-right">
                            {Object.entries(formData.location).map(([key, value]) => (
                                <div className="form-group" key={key}>
                                    <label>{key.toUpperCase()}</label>
                                    <input
                                        value={value}
                                        onChange={(e) =>
                                            handleNestedChange("location", key, e.target.value)
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* LOCATION MAP */}
                    <div className="edit-section">
                        <div className="edit-left">
                            <h4> Location Map</h4>
                        </div>

                        <div className="edit-right">
                            <EditableLocationMap
                                coordinates={{
                                    lat: Number(formData.locationmap.latitude) || 12.9716,
                                    lng: Number(formData.locationmap.longitude) || 77.5946,
                                }}
                                onChange={(coords) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        locationmap: {
                                            latitude: coords.lat.toFixed(6),
                                            longitude: coords.lng.toFixed(6),
                                        },
                                    }))
                                }
                            />
                            <div className="form-group">
                                <label>Latitude</label>
                                <input
                                    value={formData.locationmap.latitude}
                                    onChange={(e) =>
                                        handleNestedChange("locationmap", "latitude", e.target.value)
                                    }
                                />
                            </div>

                            <div className="form-group">
                                <label>Longitude</label>
                                <input
                                    value={formData.locationmap.longitude}
                                    onChange={(e) =>
                                        handleNestedChange("locationmap", "longitude", e.target.value)
                                    }
                                />
                            </div>
                        </div>


                    </div>

                    {/* ROOM DETAILS */}
                    <div className="edit-section">
                        <div className="edit-left">
                            <h4>Room Details</h4>
                        </div>

                        <div className="edit-right">
                            {Object.entries(formData.details).map(([key, value]) => (
                                <div key={key} className="form-group">
                                    <label>{key.toUpperCase()}</label>
                                    <input
                                        type="number"
                                        value={value}
                                        onChange={(e) =>
                                            handleNestedChange("details", key, e.target.value)
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* PRICING */}
                    <div className="edit-section">
                        <div className="edit-left">
                            <h4> Pricing</h4>
                        </div>

                        <div className="edit-right">
                            <div className="form-group">
                                <label>Monthly Price</label>
                                <input
                                    type="number"
                                    value={formData.price.monthly}
                                    onChange={(e) =>
                                        handleNestedChange("price", "monthly", e.target.value)
                                    }
                                />
                            </div>

                            <div className="form-group">
                                <label>Service Fee</label>
                                <input type="number" value="100" readOnly />
                            </div>
                        </div>
                    </div>

                    {/* HOST DETAILS */}
                    <div className="edit-section">
                        <div className="edit-left">
                            <h4>Host Details</h4>
                        </div>

                        <div className="edit-right">
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    value={formData.hostDetails.name}
                                    onChange={(e) =>
                                        handleNestedChange("hostDetails", "name", e.target.value)
                                    }
                                />
                            </div>

                            <div className="form-group">
                                <label>Contact</label>
                                <input
                                    value={formData.hostDetails.contact}
                                    onChange={(e) =>
                                        handleNestedChange("hostDetails", "contact", e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {/* TITLE */}


                    <div className="edit-section">
                        <div className="edit-left">
                            <h4> PG Details</h4>
                        </div>
                        <div className="edit-right">
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Add a catchy title"
                                />
                            </div>

                            {/* DESCRIPTION */}
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    rows={3}
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Write about your property"
                                />
                            </div>
                        </div>
                    </div>

                    {/* IMAGES */}
                    <div className="edit-section">
                        <div className="edit-left">
                            <h4> Images</h4>
                        </div>

                        <div className="edit-right">
                            <div className="image-preview-wrapper">
                                {formData.images.map((img, index) => (
                                    <div key={index} className="image-box">
                                        <img
                                            src={
                                                img.startsWith("http")
                                                    ? img
                                                    : `${process.env.REACT_APP_API_BASE}/${img}`
                                            }
                                            alt="listing"
                                            className="preview-img"
                                        />
                                        <button
                                            type="button"
                                            className="delete-img-btn"
                                            onClick={() => handleDeleteImage(index)}
                                        >
                                            ✖
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* FILE UPLOAD */}
                            <label className="add-image-box">
                                <span className="plus-icon">+Add Image</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;

                                        try {
                                            const formDataUpload = new FormData();
                                            formDataUpload.append("image", file);

                                            const uploadRes = await axios.post(
                                                `${process.env.REACT_APP_API_BASE}/api/hostuser/upload-image`,
                                                formDataUpload,
                                                {
                                                    headers: { "Content-Type": "multipart/form-data" },
                                                }
                                            );

                                            if (uploadRes.data?.imageUrl) {
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    images: [...prev.images, uploadRes.data.imageUrl],
                                                }));
                                            }
                                        } catch (error) {
                                            console.error("Upload failed:", error);
                                            alert("Image upload failed");
                                        }
                                    }}
                                />
                            </label>

                            {/* ADD BY URL */}
                            <div className="add-image">
                                <input
                                    type="text"
                                    value={newImageUrl}
                                    placeholder="Paste image URL"
                                    onChange={(e) => setNewImageUrl(e.target.value)}
                                />
                                <button type="button" onClick={handleAddImage}>
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="form-actions">
                        <button type="submit" className="save-btn">Save Changes</button>
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate("/")}
                        >
                            Cancel
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default HostListingEdit;
