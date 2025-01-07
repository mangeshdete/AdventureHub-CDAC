import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearUser } from '../redux/userSlice';

function Navbar() {
  const { user, loggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/');
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        padding: '1rem 2rem', // Increased height and padding
        fontSize: '1.5rem', // Increased font size
      }}
    >
      <div className="container-fluid" style={{ maxWidth: '1200px' }}>
        <Link
          className="navbar-brand text-white"
          to="/"
          style={{
            fontSize: '1.5rem', // Larger font for the brand
            fontWeight: 'bold', // Bold brand name
            textAlign: "right"
          }}
        >
          AdventureHub
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ borderColor: '#fff' }} // White border for hamburger menu
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/about">
                About
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link text-white" to="/search">Search</Link>
            </li> */}
            <li className="nav-item" style={{ display: loggedIn ? 'none' : 'block' }}>
              <Link className="nav-link text-white" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item" style={{ display: loggedIn ? 'none' : 'block' }}>
              <Link className="nav-link text-white" to="/chooserole">
                Register
              </Link>
            </li>
            {/* here loggedIn user's name will be printed */}
            {/* <li className="nav-item">
              <Link className="nav-link text-white" style={{ display: loggedIn ? 'block' : 'none' }}>
                {user.name}
              </Link>
            </li> */}
            <li className="nav-item">
              <button
                className="nav-link btn btn-link text-white"
                style={{
                  display: loggedIn ? 'block' : 'none',
                  padding: '10px 15px', // Added padding for button
                  fontSize: '1.2rem', // Increased font size for button
                }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
