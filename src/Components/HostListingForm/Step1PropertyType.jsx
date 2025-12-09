import { useOutletContext } from "react-router-dom";
import farmIcon from "../../Assets/countryside.png";
import houseIcon from "../../Assets/home.png";
import guestHouseIcon from "../../Assets/motel.png";
import flatIcon from "../../Assets/old-building.png";
import pgIcon from "../../Assets/paying.png";
import "./HostListingFormcss/Step1propertyType.css";


const options = [
    { id: "Pg", name: "Pg", icon: pgIcon },
    { id: "House", name: "House", icon: houseIcon },
    { id: "Flat/Apartment", name: "Flat / Apartment", icon: flatIcon },
    { id: "Guest House", name: "Guest House", icon: guestHouseIcon },
    { id: "Farm", name: "Farm", icon: farmIcon },
];

const Step1PropertyType = () => {
    const { formData, setFormData } = useOutletContext();
    // const navigate = useNavigate();

    const handleSelect = (type) => {
        setFormData({ ...formData, propertyType: type });
    };

    return (
        <div className="step1-page">
            <h2>Choose your property type</h2>
            <div className="property-cards">
                {options.map((option) => (
                    <div
                        key={option.id}
                        className={`property-card ${formData.propertyType === option.id ? "selected" : ""}`}
                        onClick={() => handleSelect(option.id)}
                    >
                        <div className="property-card-icon">
                            <img src={option.icon} alt={option.name} />
                        </div>
                        <div className="property-card-name">{option.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Step1PropertyType;
