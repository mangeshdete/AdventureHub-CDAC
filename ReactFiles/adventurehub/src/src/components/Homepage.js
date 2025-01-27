import React from "react";
import "../styles/HomePage.css"

function HomePage() {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Welcome to Adventure Hub</h1>
        <p className="hero-subtitle">Your Journey Begins Here</p>
        <div className="hero-search">
          <input
            type="text"
            placeholder="Search for destinations, adventures, or activities..."
            className="search-input"
          />
          <button className="search-button">Search</button>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2>Explore Our Services</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <img src="/images/feature1.jpg" alt="Book Adventures" />
            <h3>Book Adventures</h3>
            <p>Find and book thrilling adventures worldwide.</p>
          </div>
          <div className="feature-card">
            <img src="/images/feature1.jpg" alt="Search Destinations" />
            <h3>Search Destinations</h3>
            <p>Discover top-rated destinations tailored to your interests.</p>
          </div>
          <div className="feature-card">
            <img src="/images/feature1.jpg" alt="Travel the World" />
            <h3>Travel the World</h3>
            <p>Embark on a journey with our curated travel plans.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;