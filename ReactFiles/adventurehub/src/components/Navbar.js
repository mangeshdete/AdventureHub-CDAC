import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearUser } from '../redux/userSlice';

function Navbar() {
  const { user, loggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/login');
    setShowPopup(false);
  };

  const togglePopup = () => {
    setShowPopup((visible) => !visible);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleProfileClick = () => {
    // console.log(user.user.roleid.roleid);
    if (user.user.roleid.roleid === 1) {
      navigate('/customerdashboard');
    } else if (user.user.roleid.roleid === 2) {
      navigate('/organizerdashboard');
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closePopup();
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg" >
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">AdventureHub</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/about">About</Link>
            </li>
            <li className="nav-item" style={{ display: loggedIn ? 'none' : 'block' }}>
              <Link className="nav-link text-white" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" style={{ display: loggedIn ? 'none' : 'block' }} to="/chooserole">Register</Link>
            </li>
            {loggedIn && (
              <li className="nav-item dropdown" ref={dropdownRef}>
                <button
                  className="nav-link btn btn-link text-white"
                  onClick={togglePopup}
                  style={{ border: 'none', background: 'none', position: 'relative' }}
                >
                  {user?.fname || user?.orgname || user?.email}
                </button>
                {showPopup && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      backgroundColor: '#fff',
                      border: '1px solid orange',
                      borderRadius: '4px',
                      zIndex: 1000,
                      minWidth: '150px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <ul className="list-unstyled m-0 p-2">
                      <li>
                        <button
                          className="dropdown-item"
                          style={{ textDecoration: 'none', color: 'black', background: 'none', border: 'none', width: '100%', textAlign: 'left' }}
                          onClick={handleProfileClick}
                        >
                          Profile
                        </button>
                      </li>
                      <hr style={{ margin: '8px 0', borderTop: '1px solid black' }} />
                      <li>
                        <Link
                          to="/feedback"
                          className="dropdown-item"
                          style={{ textDecoration: 'none', color: 'black' }}
                          onClick={closePopup}
                        >
                          Feedback
                        </Link>
                      </li>
                      <hr style={{ margin: '8px 0', borderTop: '1px solid black' }} />
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={handleLogout}
                          style={{
                            border: 'none',
                            background: 'none',
                            color: 'red',
                            padding: '5px',
                          }}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
