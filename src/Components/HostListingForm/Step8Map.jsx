
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useOutletContext } from "react-router-dom";

const Step8Map = () => {
    const { formData, setFormData, goNext } = useOutletContext();
    const [center, setCenter] = useState(
        formData.locationmap?.latitude && formData.locationmap?.longitude
            ? { lat: formData.locationmap.latitude, lng: formData.locationmap.longitude }
            : { lat: 12.9716, lng: 77.5946 } // Default: Bengaluru
    );
    const mapRef = useRef();
    const [loadingLocation, setLoadingLocation] = useState(false);

    // 🌍 Get user's current location
    const handleUseMyLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        setLoadingLocation(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const coords = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                };
                setCenter(coords);
                if (mapRef.current) mapRef.current.setView(coords, 16);
                setLoadingLocation(false);
            },
            (err) => {
                console.error(err);
                alert("Failed to get current location");
                setLoadingLocation(false);
            }
        );
    };

    // 📍 Track map movement and update center coordinates
    const MapWatcher = () => {
        const map = useMap();
        mapRef.current = map;

        useEffect(() => {
            const updateCenter = () => {
                const c = map.getCenter();
                setCenter({ lat: c.lat, lng: c.lng });
            };
            map.on("moveend", updateCenter);
            return () => map.off("moveend", updateCenter);
        }, [map]);

        return null;
    };

    // 💾 Save location to formData
    const handleSaveLocation = () => {
        setFormData({
            ...formData,
            locationmap: {
                latitude: center.lat,
                longitude: center.lng,
            },
        });
        alert("✅ Location saved successfully!");
        goNext();
    };

    return (
        <div
            style={{
                maxWidth: "1100px",
                margin: "40px auto",
                padding: "20px",
                borderRadius: "20px",
                background: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                position: "relative",
            }}
        >
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                📍 Step 8: Choose Your Location
            </h2>

            <div style={{ position: "relative" }}>
                <MapContainer
                    center={[center.lat, center.lng]}
                    zoom={16}
                    style={{
                        height: "400px",
                        width: "100%",
                        borderRadius: "20px",
                        overflow: "hidden",
                    }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <MapWatcher />
                </MapContainer>

                {/* 📌 Center Pin */}
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -100%)",
                        zIndex: 999,
                    }}
                >
                    <MapPin size={40} color="#d9534f" fill="#d9534f" />
                </div>

                {/* 💾 Save button */}
                <button
                    onClick={handleSaveLocation}
                    style={{
                        position: "absolute",
                        bottom: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "#28a745",
                        color: "#fff",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                        zIndex: 1000,
                    }}
                >
                    Save This Location
                </button>
            </div>

            {/* 🌍 Use My Location */}
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button
                    onClick={handleUseMyLocation}
                    disabled={loadingLocation}
                    style={{
                        background: "#007bff",
                        color: "#fff",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        cursor: "pointer",
                    }}
                >
                    {loadingLocation ? "Locating..." : "Use My Current Location"}
                </button>
            </div>

            {/* 🧭 Coordinates */}
            <p
                style={{
                    marginTop: "20px",
                    textAlign: "center",
                    color: "#333",
                    fontWeight: "500",
                }}
            >
                🧭 Selected Coordinates:{" "}
                <span style={{ color: "#007bff" }}>
                    {center.lat.toFixed(5)}, {center.lng.toFixed(5)}
                </span>
            </p>
        </div>
    );
};

export default Step8Map;
