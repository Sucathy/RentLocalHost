import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    // Fetch host profile
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_BASE}/api/hostauth1/profile`, {
                    method: "GET",
                    credentials: "include", // send HttpOnly cookie
                });

                if (res.status === 401) {
                    // Not authenticated
                    navigate("/login");
                    return;
                }

                if (!res.ok) throw new Error("Failed to fetch profile");

                const data = await res.json();
                setUser(data);
                setFormData({
                    username: data.username || "",
                    fullName: data.fullName || "",
                    age: data.age || "",
                    gender: data.gender || "",
                    phoneNumber: data.phoneNumber || "",
                    profileImage: data.profileImage || "",
                });
            } catch (err) {
                console.error("Fetch error:", err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [navigate]);

    // Logout
    const handleLogout = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE}/api/hostauth1/logout`, {
                method: "POST",
                credentials: "include",
            });

            if (res.ok) {
                setUser(null);
                navigate("/login");
            } else {
                console.error("Logout failed");
            }
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData((prev) => ({ ...prev, profileImage: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    // Save profile updates
    const handleSave = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE}/api/hostauth1/profile`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to update profile");
            }

            setUser(data);
            setEditMode(false);
            alert("Profile updated successfully!");
        } catch (err) {
            console.error("Update error:", err);
            alert("Failed to update profile: " + err.message);
        }
    };



    if (loading) return <div className="profile-loading">Loading profile...</div>;

    if (!user) {
        return (
            <div className="profile-container">
                <h2>You are not logged in <br /> Please login to get access</h2>
                <div className="login-buttons">
                    <Link className="login-btn" to="/login">Login</Link>
                    <Link className="login-btn" to="/signup">Signup</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-outer">
            <div className="profile-card">
                <div className="profile-card-header">
                    <button onClick={() => navigate("/")} className="profile-back">←</button>
                </div>

                <img
                    src={formData.profileImage || "https://i.pravatar.cc/150?img=13"}
                    alt="Profile"
                    className="profile-img"
                />

                {editMode && (
                    <div className="upload-section">
                        <label className="upload-label">
                            Upload Image
                            <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
                        </label>
                    </div>
                )}

                <h2 className="profile-name">{user.username || user.fullName}</h2>

                <table className="profile-table">
                    <tbody>
                        <tr>
                            <td>Username:</td>
                            <td>{editMode ? <input type="text" name="username" value={formData.username} onChange={handleChange} /> : user.username}</td>
                        </tr>
                        <tr>
                            <td>Full Name:</td>
                            <td>{editMode ? <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} /> : user.fullName || "—"}</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <td>Age:</td>
                            <td>{editMode ? <input type="number" name="age" value={formData.age} onChange={handleChange} /> : user.age || "—"}</td>
                        </tr>
                        <tr>
                            <td>Gender:</td>
                            <td>{editMode ? (
                                <select name="gender" value={formData.gender} onChange={handleChange}>
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            ) : user.gender || "—"}</td>
                        </tr>
                        <tr>
                            <td>Phone Number:</td>
                            <td>{editMode ? <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} /> : user.phoneNumber || "—"}</td>
                        </tr>
                    </tbody>
                </table>

                {editMode ? (
                    <>
                        <button className="profile-save" onClick={handleSave}>Save</button>
                        <button className="profile-cancel" onClick={() => setEditMode(false)}>Cancel</button>
                    </>
                ) : (
                    <button className="profile-edit" onClick={() => setEditMode(true)}>Edit Profile</button>
                )}

                <button onClick={handleLogout} className="profile-logout">Logout</button>
            </div>
        </div>
    );
};

export default Profile;
