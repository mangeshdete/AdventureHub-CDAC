import { useNavigate } from "react-router-dom";
import "../styles/ChooseRole.css";
const ChooseRole = () => {
    const navigate = useNavigate();

    const handleClick = (id) => {
        if (id === "1") navigate("/registerCustomer");
        else if (id === "2") navigate("/registerOrganiser");
    };

    return (
        <div>
           
            <div className="choose-role-container">
                <h2>Choose Your Role</h2>
                <p>
                    Select your role to proceed with the registration process. 
                    Start your journey today!
                </p>
                <div className="role-buttons">
                    <button
                        className="role-btn"
                        id="1"
                        onClick={(e) => handleClick(e.target.id)}
                    >
                        Customer
                    </button>
                    <button
                        className="role-btn"
                        id="2"
                        onClick={(e) => handleClick(e.target.id)}
                    >
                        Organizer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChooseRole;
