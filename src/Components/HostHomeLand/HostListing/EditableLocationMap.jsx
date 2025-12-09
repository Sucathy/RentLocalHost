import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

const EditableLocationMap = ({ coordinates, onChange }) => {
    const [center, setCenter] = useState(
        coordinates?.lat && coordinates?.lng
            ? { lat: coordinates.lat, lng: coordinates.lng }
            : { lat: 12.9716, lng: 77.5946 }
    );

    const mapRef = useRef();
    const [loadingLocation, setLoadingLocation] = useState(false);

    // 🌍 Use My Location
    const handleUseMyLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation not supported by your browser");
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

                onChange(coords);
                setLoadingLocation(false);
            },
            () => {
                alert("Failed to get location");
                setLoadingLocation(false);
            }
        );
    };

    // Track map movement
    const MapWatcher = () => {
        const map = useMap();
        mapRef.current = map;

        useEffect(() => {
            const updateCenter = () => {
                const c = map.getCenter();
                setCenter({ lat: c.lat, lng: c.lng });
                onChange({ lat: c.lat, lng: c.lng });
            };

            map.on("moveend", updateCenter);
            return () => map.off("moveend", updateCenter);
        }, [map]);

        return null;
    };

    return (
        <div style={{ marginTop: "10px" }}>
            <div style={{ position: "relative" }}>
                <MapContainer
                    center={[center.lat, center.lng]}
                    zoom={16}
                    style={{
                        height: "350px",
                        width: "100%",
                        borderRadius: "16px",
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
            </div>

            {/* 🌍 Use My Location */}
            <div style={{ textAlign: "center", marginTop: "15px" }}>
                <button
                    type="button"
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
                    {loadingLocation ? "Locating..." : "Use My Location"}
                </button>
            </div>

            {/* ✅ Show Coordinates */}
            <p style={{ textAlign: "center", marginTop: "10px", color: "#333" }}>
                📍 Selected:{" "}
                <span style={{ color: "#007bff" }}>
                    {center.lat.toFixed(5)}, {center.lng.toFixed(5)}
                </span>
            </p>
        </div>
    );
};

export default EditableLocationMap;
