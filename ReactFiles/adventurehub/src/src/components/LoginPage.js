import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/LoginForm.css"
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';

export default LoginPage => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    const reqInfo = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    };

    fetch("http://localhost:8082/userLogin", reqInfo)
    .then((response) => {
      if (response.status === 204) {
        setError("Invalid email or password");
        return null;
      } 
      else if (response.ok) {
        return response.json();
      }
      throw new Error("Response couldn't be resolved!");
    })
    .then((data) => {
      if (data) {
        dispatch(setUser(data));
        navigate("/");
      }
    })
    .catch((err) => {
      console.error(err);
      setError("An error occurred. Please try again.");
    });
  }

  return (
      <div className="card shadow login-card">
        <h1 className="text-center mb-4">Login</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-3">
          <p>
            <Link to="/forgotPassword" className="btn btn-link" style={{alignItems:"right"}}>
              Forgot Password
            </Link>
          </p>
        </div>
          <button type="submit" className="btn btn-primary w-100">
            LOGIN
          </button>
        </form>
        <div className="text-center mt-3">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="btn btn-link">
              Register
            </Link>
          </p>
        </div>
      </div>
  );
}
