
// // import axios from "axios";
// // import { FileText, Home, Image as ImageIcon, MapPin } from "lucide-react";
// // import { useState } from "react";
// // import { Outlet, useLocation, useNavigate } from "react-router-dom";
// // import houseImage from "../../Assets/house.png";
// // import "./HostLayout.css";

// // const HostLayout = () => {
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const [formData, setFormData] = useState({
// //     propertyType: "",
// //     roomType: "",
// //     pgType: "",
// //     bhkType: "",
// //     location: {
// //       country: "",
// //       state: "",
// //       city: "",
// //       streetAddress: "",
// //       landmark: "",
// //       locality: "",
// //       pincode: "",
// //     },
// //     // ✅ Add locationmap object for Step8Map
// //     locationmap: { latitude: null, longitude: null },
// //     details: { bedrooms: 1, beds: 1, bathrooms: 1, guests: 1 },
// //     images: [],
// //     price: { weekday: 1000, weekendPremium: 10 },
// //     hostDetails: { name: "", contact: "" },
// //     title: "",
// //     description: "",
// //   });

// //   // ✅ Define steps (Step8Map added)
// //   const steps = [
// //     { path: "/host/property-type", label: "Choose your property type", icon: <FileText size={48} /> },
// //     ...(formData.propertyType === "Pg"
// //       ? [{ path: "/host/pgtype", label: "Choose your PG type", icon: <Home size={48} /> }]
// //       : formData.propertyType
// //         ? [{ path: "/host/bhktype", label: "Choose your BHK type", icon: <Home size={48} /> }]
// //         : []),
// //     { path: "/host/room-type", label: "Pick a room type", icon: <Home size={48} /> },
// //     { path: "/host/location", label: "Set your location details", icon: <MapPin size={48} /> },
// //     { path: "/host/map", label: "Mark your location on the map", icon: <MapPin size={48} /> }, // ✅ Step8Map
// //     { path: "/host/details", label: "Add room details", icon: <FileText size={48} /> },
// //     { path: "/host/images", label: "Upload images", icon: <ImageIcon size={48} /> },
// //     { path: "/host/price", label: "Price details", icon: <ImageIcon size={48} /> },
// //     { path: "/host/title", label: "Give it a title", icon: <FileText size={48} /> },
// //   ];

// //   const currentStep = steps.findIndex((step) => step.path === location.pathname);

// //   // ▶ Next Step
// //   const goNext = () => {
// //     if (currentStep < steps.length - 1) navigate(steps[currentStep + 1].path);
// //   };

// //   // ◀ Back Step
// //   const goBack = () => {
// //     if (currentStep > 0) navigate(steps[currentStep - 1].path);
// //     else navigate("/hostes");
// //   };

// //   // ✅ Submit All Form Data
// //   const handleSubmit = async () => {
// //     if (!formData.propertyType.trim() || !formData.roomType.trim()) {
// //       alert("Property type and Room type are required!");
// //       return;
// //     }

// //     try {
// //       const data = new FormData();
// //       data.append("propertyType", formData.propertyType);
// //       if (formData.pgType) data.append("pgType", formData.pgType);
// //       if (formData.bhkType) data.append("bhkType", formData.bhkType);
// //       data.append("roomType", formData.roomType);
// //       data.append("location", JSON.stringify(formData.location));
// //       data.append("locationmap", JSON.stringify(formData.locationmap)); // ✅ Add map coordinates
// //       data.append("details", JSON.stringify(formData.details));
// //       data.append("price", JSON.stringify(formData.price));
// //       data.append("hostDetails", JSON.stringify(formData.hostDetails));
// //       data.append("title", formData.title);
// //       data.append("description", formData.description);
// //       formData.images.forEach((file) => data.append("images", file));

// //       const res = await axios.post("http://localhost:5000/api/host/create", data, {
// //         headers: { "Content-Type": "multipart/form-data" },
// //         withCredentials: true,
// //       });

// //       if (res.data.success) {
// //         alert("✅ Listing created successfully!");
// //         navigate("/");
// //       }
// //     } catch (err) {
// //       console.error("Error creating listing:", err);
// //       alert(err.response?.data?.message || "Something went wrong.");
// //     }
// //   };

// //   const isHostRoot = location.pathname === "/host";

// //   return (
// //     <div className="host-layout">
// //       <div className="host-body">
// //         <div className="host-left">
// //           <h2>{steps[currentStep]?.label}</h2>
// //           <div className="host-step-content">
// //             <Outlet context={{ formData, setFormData, goNext }} />

// //             {isHostRoot && (
// //               <div className="host-welcome">
// //                 <div className="host-welcome-left">
// //                   <img src={houseImage} alt="Hosting illustration" className="welcome-image" />
// //                 </div>
// //                 <div className="host-welcome-right">
// //                   <h1>Welcome to Hosting</h1>
// //                   <p>Start creating your listing by telling us about your place.</p>
// //                   <p>We'll ask about your property type, room type, location, and guest capacity.</p>
// //                   <p>LocalPg will guide you through setting up your property listing step by step.</p>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       <div className="host-footer">
// //         <div className="host-progress">
// //           Step {currentStep + 1} of {steps.length} • {steps[currentStep]?.label}
// //         </div>
// //         <div className="host-buttons">
// //           <button className="back-btn" onClick={goBack}>Back</button>
// //           {currentStep < steps.length - 1 ? (
// //             <button className="next-btn" onClick={goNext}>Next</button>
// //           ) : (
// //             <button className="submit-btn" onClick={handleSubmit}>Submit</button>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default HostLayout;



// import axios from "axios";
// import { FileText, Home, Image as ImageIcon, MapPin } from "lucide-react";
// import { useState } from "react";
// import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import houseImage from "../../Assets/house.png";
// import "./HostListingLayout.css";

// const HostListingLayout = () => {
//     const navigate = useNavigate();
//     const location = useLocation();

//     // ✅ Initial Form Data State
//     const [formData, setFormData] = useState({
//         propertyType: "",
//         roomType: "",
//         pgType: "",
//         bhkType: "",
//         location: {
//             country: "",
//             state: "",
//             city: "",
//             streetAddress: "",
//             landmark: "",
//             locality: "",
//             pincode: "",
//         },
//         locationmap: { latitude: null, longitude: null }, // ✅ Step8Map
//         details: { bedrooms: 1, beds: 1, bathrooms: 1, guests: 1 },
//         images: [],
//         price: {
//             monthly: 0,
//             serviceFee: 100,
//             deposit: {
//                 pgDeposit: "Fixed — you’ll get half back when leaving.",
//                 houseDeposit: {
//                     "1BHK": 50000,
//                     "2BHK": 60000,
//                     "3BHK": 80000,
//                     "4BHK": 120000,
//                 },
//                 flatDeposit: {
//                     "1BHK": 70000,
//                     "2BHK": 80000,
//                     "3BHK": 90000,
//                     "4BHK": 150000,
//                 },
//             },
//         },
//         hostDetails: { name: "", contact: "" },
//         title: "",
//         description: "",
//     });

//     // ✅ Steps for Hosting Flow
//     const steps = [
//         { path: "/host/property-type", label: "Choose your property type", icon: <FileText size={48} /> },
//         ...(formData.propertyType === "Pg"
//             ? [{ path: "/host/pgtype", label: "Choose your PG type", icon: <Home size={48} /> }]
//             : formData.propertyType
//                 ? [{ path: "/host/bhktype", label: "Choose your BHK type", icon: <Home size={48} /> }]
//                 : []),
//         { path: "/host/room-type", label: "Pick a room type", icon: <Home size={48} /> },
//         { path: "/host/location", label: "Set your location details", icon: <MapPin size={48} /> },
//         { path: "/host/map", label: "Mark your location on the map", icon: <MapPin size={48} /> }, // ✅ Step8Map
//         { path: "/host/details", label: "Add room details", icon: <FileText size={48} /> },
//         { path: "/host/images", label: "Upload images", icon: <ImageIcon size={48} /> },
//         { path: "/host/price", label: "Price details", icon: <ImageIcon size={48} /> },
//         { path: "/host/title", label: "Give it a title", icon: <FileText size={48} /> },
//     ];

//     const currentStep = steps.findIndex((step) => step.path === location.pathname);

//     // ◀ Go Back
//     const goBack = () => {
//         if (currentStep > 0) navigate(steps[currentStep - 1].path);
//         else navigate("/");
//     };

//     // ▶ Go Next
//     const goNext = () => {
//         if (currentStep < steps.length - 1) navigate(steps[currentStep + 1].path);
//     };

//     // ✅ Submit Form
//     const handleSubmit = async () => {
//         if (!formData.propertyType.trim() || !formData.roomType.trim()) {
//             alert("Property type and Room type are required!");
//             return;
//         }

//         try {
//             const data = new FormData();
//             data.append("propertyType", formData.propertyType);
//             if (formData.pgType) data.append("pgType", formData.pgType);
//             if (formData.bhkType) data.append("bhkType", formData.bhkType);
//             data.append("roomType", formData.roomType);
//             data.append("location", JSON.stringify(formData.location));
//             data.append("locationmap", JSON.stringify(formData.locationmap)); // ✅ Map coordinates
//             data.append("details", JSON.stringify(formData.details));
//             data.append("price", JSON.stringify(formData.price));
//             data.append("hostDetails", JSON.stringify(formData.hostDetails));
//             data.append("title", formData.title);
//             data.append("description", formData.description);
//             formData.images.forEach((file) => data.append("images", file));

//             const res = await axios.post(
//                 `${process.env.REACT_APP_API_BASE}/api/hostListingDetails/create`,
//                 data,
//                 {
//                     headers: { "Content-Type": "multipart/form-data" },
//                     withCredentials: true,
//                 }
//             );


//             if (res.data.success) {
//                 alert("✅ Listing created successfully!");
//                 navigate("/");
//             }
//         } catch (err) {
//             console.error("Error creating listing:", err);
//             alert(err.response?.data?.message || "Something went wrong.");
//         }
//     };

//     const isHostRoot = location.pathname === "/host";

//     return (
//         <div className="host-layout">
//             <div className="host-body">
//                 <div className="host-left">
//                     <h2>{steps[currentStep]?.label}</h2>
//                     <div className="host-step-content">
//                         <Outlet context={{ formData, setFormData, goNext }} />

//                         {isHostRoot && (
//                             <div className="host-welcome">
//                                 <div className="host-welcome-left">
//                                     <img src={houseImage} alt="Hosting illustration" className="welcome-image" />
//                                 </div>
//                                 <div className="host-welcome-right">
//                                     <h1>Welcome to Hosting</h1>
//                                     <p>Start creating your listing by telling us about your place.</p>
//                                     <p>We'll ask about your property type, room type, location, and guest capacity.</p>
//                                     <p>LocalPg will guide you through setting up your property listing step by step.</p>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* ✅ Footer Navigation */}
//             <div className="host-footer">
//                 <div className="host-progress">
//                     Step {currentStep + 1} of {steps.length} • {steps[currentStep]?.label}
//                 </div>

//                 <div className="host-buttons">
//                     <button className="back-btn" onClick={goBack}>
//                         Back
//                     </button>

//                     {currentStep < steps.length - 1 ? (
//                         <button className="next-btn" onClick={goNext}>
//                             Next
//                         </button>
//                     ) : (
//                         <button className="submit-btn" onClick={handleSubmit}>
//                             Submit
//                         </button>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HostListingLayout;


import axios from "axios";
import { FileText, Home, Image as ImageIcon, MapPin } from "lucide-react";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import houseImage from "../../Assets/house.png";
import "./HostListingLayout.css";

const HostListingLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // ✅ Initial Form Data State
    const [formData, setFormData] = useState({
        propertyType: "",
        roomType: "",
        pgType: "",
        bhkType: "",
        amenities: [],
        location: {
            country: "",
            state: "",
            city: "",
            streetAddress: "",
            landmark: "",
            locality: "",
            pincode: "",
        },
        locationmap: { latitude: null, longitude: null },
        details: { bedrooms: 1, beds: 1, bathrooms: 1, guests: 1 },
        images: [],
        price: {
            monthly: 0,
            serviceFee: 100,
            deposit: {
                pgDeposit: "Fixed — you’ll get half back when leaving.",
                houseDeposit: {
                    "1BHK": 50000,
                    "2BHK": 60000,
                    "3BHK": 80000,
                    "4BHK": 120000,
                },
                flatDeposit: {
                    "1BHK": 70000,
                    "2BHK": 80000,
                    "3BHK": 90000,
                    "4BHK": 150000,
                },
            },
        },
        hostDetails: { name: "", contact: "" },
        title: "",
        description: "",
    });

    // ✅ Steps for Hosting Flow
    const steps = [
        { path: "/host/property-type", label: "Choose your property type", icon: <FileText size={48} /> },
        ...(formData.propertyType === "Pg"
            ? [{ path: "/host/pgtype", label: "Choose your PG type", icon: <Home size={48} /> }]
            : formData.propertyType
                ? [{ path: "/host/bhktype", label: "Choose your BHK type", icon: <Home size={48} /> }]
                : []),
        { path: "/host/room-type", label: "Pick a room type", icon: <Home size={48} /> },

        { path: "/host/amenities", label: "Choose amenities", icon: <Home size={48} /> },
        { path: "/host/location", label: "Set your location details", icon: <MapPin size={48} /> },
        { path: "/host/map", label: "Mark your location on the map", icon: <MapPin size={48} /> },
        { path: "/host/details", label: "Add room details", icon: <FileText size={48} /> },
        { path: "/host/images", label: "Upload images", icon: <ImageIcon size={48} /> },
        { path: "/host/price", label: "Price details", icon: <ImageIcon size={48} /> },
        { path: "/host/title", label: "Give it a title", icon: <FileText size={48} /> },

    ];

    const currentStep = steps.findIndex((step) => step.path === location.pathname);

    // ◀ Go Back
    const goBack = () => {
        if (currentStep > 0) navigate(steps[currentStep - 1].path);
        else navigate("/");
    };

    // ▶ Go Next
    const goNext = () => {
        if (currentStep < steps.length - 1) navigate(steps[currentStep + 1].path);
    };

    // ✅ Submit Form
    const handleSubmit = async () => {
        if (!formData.propertyType.trim() || !formData.roomType.trim()) {
            alert("Property type and Room type are required!");
            return;
        }

        try {
            const data = new FormData();
            data.append("propertyType", formData.propertyType);
            if (formData.pgType) data.append("pgType", formData.pgType);
            if (formData.bhkType) data.append("bhkType", formData.bhkType);
            data.append("roomType", formData.roomType);
            data.append("amenities", JSON.stringify(formData.amenities));
            data.append("location", JSON.stringify(formData.location));
            data.append("locationmap", JSON.stringify(formData.locationmap));
            data.append("details", JSON.stringify(formData.details));
            data.append("price", JSON.stringify(formData.price));
            data.append("hostDetails", JSON.stringify(formData.hostDetails));
            data.append("title", formData.title);
            data.append("description", formData.description);


            formData.images.forEach((file) => data.append("images", file));

            // ✅ HostId is handled by backend JWT middleware
            const res = await axios.post(
                `${process.env.REACT_APP_API_BASE}/api/hostListingDetails/create`,
                data,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true, // sends cookies
                }
            );

            if (res.data.success) {
                alert("✅ Listing created successfully!");
                navigate("/");
            }
        } catch (err) {
            console.error("Error creating listing:", err);
            alert(err.response?.data?.message || "Something went wrong.");
        }
    };

    const isHostRoot = location.pathname === "/host";

    return (
        <div className="host-layout">
            <div className="host-body">
                <div className="host-left">
                    <h2>{steps[currentStep]?.label}</h2>
                    <div className="host-step-content">
                        <Outlet context={{ formData, setFormData, goNext }} />

                        {isHostRoot && (
                            <div className="host-welcome">
                                <div className="host-welcome-left">
                                    <img src={houseImage} alt="Hosting illustration" className="welcome-image" />
                                </div>
                                <div className="host-welcome-right">
                                    <h1>Welcome to Hosting</h1>
                                    <p>Start creating your listing by telling us about your place.</p>
                                    <p>We'll ask about your property type, room type, location, and guest capacity.</p>
                                    <p>LocalPg will guide you step by step to create your property listing.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ✅ Footer Navigation */}
            <div className="host-footer">
                <div className="host-progress">
                    Step {currentStep + 1} of {steps.length} • {steps[currentStep]?.label}
                </div>

                <div className="host-buttons">
                    <button className="back-btn" onClick={goBack}>Back</button>
                    {currentStep < steps.length - 1 ? (
                        <button className="next-btn" onClick={goNext}>Next</button>
                    ) : (
                        <button className="submit-btn" onClick={handleSubmit}>Submit</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HostListingLayout;
