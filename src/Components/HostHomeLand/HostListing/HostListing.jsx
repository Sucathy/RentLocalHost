

import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HostListing = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // ✅ Backend base URL
    const API = `${process.env.REACT_APP_API_BASE}/api/hostListingDetails`;

    useEffect(() => {
        const fetchListings = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${API}/user-my`, {
                    withCredentials: true, // ✅ send JWT cookie
                });
                if (res.data.success) {
                    setListings(res.data.listings || []);
                } else {
                    alert(res.data.message || "Failed to load listings");
                }
            } catch (err) {
                console.error("❌ Error fetching host listings:", err);
                alert(err.response?.data?.message || "Failed to load listings");
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
    }, [API]); // ✅ now dependency array is correct

    /** ✅ Delete listing */
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this listing?")) return;

        try {
            const res = await axios.delete(`${API}/user/${id}`, {
                withCredentials: true,
            });
            if (res.data.success) {
                setListings((prev) => prev.filter((l) => l._id !== id));
                alert("Listing deleted successfully!");
            } else {
                alert(res.data.message || "Failed to delete listing");
            }
        } catch (err) {
            console.error("❌ Error deleting listing:", err);
            alert(err.response?.data?.message || "Failed to delete listing");
        }
    };

    /** ✅ Edit listing */
    const handleEdit = (id) => {
        navigate(`/edit-listing/${id}`);
    };

    return (
        <div className="host-listing">
            <div className="listing-header">
                <h1>🏠 My Host Listings</h1>
                <button
                    className="room-add-btn"
                    onClick={() => navigate("/host")}
                >
                    + Add New Listing
                </button>
            </div>

            {loading ? (
                <p className="loading">Loading listings...</p>
            ) : listings.length === 0 ? (
                <p className="empty-msg">No listings found. Create your first one!</p>
            ) : (
                <div className="table-wrapper">
                    <table className="listing-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Property Type</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listings.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>

                                    <td>
                                        {item.images && item.images.length > 0 ? (
                                            <img
                                                src={
                                                    item.images[0].startsWith("http")
                                                        ? item.images[0]
                                                        : `${process.env.REACT_APP_API_BASE}/${item.images[0]}`
                                                }
                                                alt="Host"
                                                style={{
                                                    width: "70px",
                                                    height: "70px",
                                                    objectFit: "cover",
                                                    borderRadius: "8px",
                                                    border: "1px solid #ddd",
                                                }}
                                            />
                                        ) : (
                                            "No Image"
                                        )}
                                    </td>
                                    <td>{item.title || "Untitled"}</td>
                                    <td>{item.propertyType || "N/A"}</td>
                                    <td
                                        className={`status ${item.status?.toLowerCase() || "unknown"}`}
                                    >
                                        {item.status || "N/A"}
                                    </td>
                                    <td className="actions">
                                        <FaEdit
                                            className="icon-btn edit"
                                            onClick={() => handleEdit(item._id)}
                                            title="Edit"
                                        />
                                        <FaTrash
                                            className="icon-btn delete"
                                            onClick={() => handleDelete(item._id)}
                                            title="Delete"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default HostListing;
