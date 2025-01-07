import { useNavigate } from "react-router";

export default ChooseRole => {
    let navigate = useNavigate();

    function handleClick(id) {
        if (id == 1)
            navigate("/registerCustomer");
        else if (id == 2)
            navigate("/registerOrganiser");
    }

    return (
        <div>
            <style>
                {`
                .choose-role-container {
                    text-align: center;
                    padding: 40px 20px;
                    background-color: #fff8e1; /* Light yellow background */
                    color: #333;
                    border: 2px solid #ff9800;
                    border-radius: 10px;
                    max-width: 600px;
                    margin: 50px auto;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                }

                .choose-role-container h2 {
                    font-size: 2rem;
                    color: #ff9800;
                    margin-bottom: 20px;
                }

                .choose-role-container p {
                    font-size: 1rem;
                    color: #666;
                    margin-bottom: 30px;
                }

                .role-buttons {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                }

                .role-btn {
                    background-color: #ff9800;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    font-size: 1rem;
                    cursor: pointer;
                    border-radius: 5px;
                    transition: background-color 0.3s ease;
                }

                .role-btn:hover {
                    background-color: #e68a00;
                }
                `}
            </style>
            <div className="choose-role-container">
                <h2>Choose your Role</h2>
                <p>Before you proceed with registration, please select the role you want to continue with:</p>
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
