import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import sharedRoomImg from "../../Assets/bed.png";
import entirePlaceImg from "../../Assets/homechosetype.png";
import roomImg from "../../Assets/house-door.png";
import "./HostListingFormcss/Step3RoomType.css";

const roomOptions = [
    { id: "entire", title: "An entire place", description: "Guests have the whole place to themselves.", img: entirePlaceImg },
    { id: "room", title: "A room", description: "Guests have their own room in a home, plus access to shared spaces.", img: roomImg },
    { id: "shared", title: "A shared room in a hostel", description: "Guests sleep in a shared room in a professionally managed hostel.", img: sharedRoomImg },
];

const Step3RoomType = () => {
    const { formData, setFormData } = useOutletContext();
    const [selected, setSelected] = useState(formData.roomType || null);

    const handleSelect = (optionId) => {
        setSelected(optionId);
        setFormData({ ...formData, roomType: optionId });
    };

    return (
        <div className="step-page">
            <h2>What type of space will guests have?</h2>
            <div className="cards-container-vertical">
                {roomOptions.map(option => (
                    <div
                        key={option.id}
                        className={`card-vertical ${selected === option.id ? "selected" : ""}`}
                        onClick={() => handleSelect(option.id)}
                    >
                        <div className="card-content">
                            <div className="card-text">
                                <h3>{option.title}</h3>
                                <p>{option.description}</p>
                            </div>
                            <div className="card-image">
                                <img src={option.img} alt={option.title} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Step3RoomType;
