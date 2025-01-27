import { useNavigate } from "react-router-dom";

const ChooseRole = () => {
    const navigate = useNavigate();

    const handleClick = (id) => {
        if (id === "1") navigate("/registerCustomer");
        else if (id === "2") navigate("/registerOrganiser");
    };

    return (
        <div>
            <style>
                {`
                /* Container Styles */
                .choose-role-container {
                    text-align: center;
                    padding: 50px 20px;
                    background: #ffffff; /* White background */
                    color: #000000; /* Black text */
                    border-radius: 15px;
                    max-width: 600px;
                    margin: 50px auto;
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
                    animation: fadeIn 1.5s ease-in-out;
                }

                .choose-role-container h2 {
                    font-size: 2.5rem;
                    color: #000; /* Black text */
                    margin-bottom: 25px;
                    font-weight: bold;
                }

                .choose-role-container p {
                    font-size: 1.2rem;
                    color: #333; /* Slightly muted black */
                    margin-bottom: 35px;
                }

                /* Button Container */
                .role-buttons {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                }

                /* Button Styles */
                .role-btn {
                    position: relative;
                    background: #000000; /* Black background */
                    color: #ffffff; /* White text */
                    border: none;
                    padding: 15px 30px;
                    font-size: 1.2rem;
                    cursor: pointer;
                    border-radius: 8px;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    overflow: hidden;
                    z-index: 0;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                }

                .role-btn:hover {
                    transform: scale(1.05);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
                }

                /* Ripple Effect */
                .role-btn::before {
                    content: "";
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    background: rgba(255, 255, 255, 0.4); /* Light ripple */
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    z-index: -1;
                    transition: width 0.5s ease, height 0.5s ease;
                }

                .role-btn:hover::before {
                    width: 250%;
                    height: 250%;
                }

                /* Animation for Container */
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .choose-role-container {
                        padding: 30px 15px;
                    }

                    .role-btn {
                        padding: 12px 20px;
                        font-size: 1rem;
                    }
                }
                `}
            </style>
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
