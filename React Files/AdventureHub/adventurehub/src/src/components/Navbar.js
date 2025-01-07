import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearUser } from '../redux/userSlice';

function Navbar() {
  const { user, loggedIn } = useSelector((state)=>state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout =()=>{
    dispatch(clearUser());
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'orange' }}>
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">AdventureHub</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/about">About</Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link text-white" to="/search">Search</Link>
            </li> */}
            <li className="nav-item" style={{display:loggedIn?'none':'block'}}>
              <Link className="nav-link text-white" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" style={{display:loggedIn?'none':'block'}}>Register</Link>
            </li>
            {/* here loggedIn user's name will be printed
            <li className="nav-item">
              <Link className="nav-link text-white" style={{display:loggedIn?'block':'none'}}>{user.}</Link>
            </li> */}
            <li className="nav-item">
              <button className="nav-link btn btn-link text-white" style={{display:loggedIn?'block':'none'}} onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
