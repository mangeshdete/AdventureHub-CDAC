import React from "react";
import "../styles/HomePage.css";
import img1 from "../resources/Sunset_Kayaking.jpg";
import img2 from "../resources/Mountain_Trekking_Expedition.jpg";
import img3 from "../resources/Everest_Base_Camp_Trek.jpg";
import img4 from "../resources/Deep_Sea_Diving_Experience.jpg";
import img5 from "../resources/Rock_Climbing.jpg";
import img6 from "../resources/Alpine_Skiing_Adventure.jpg";
import img7 from "../resources/Lake_View_Sightseeing_Tour.jpg";
import img8 from "../resources/Himalayan_Hiking_Trails.jpg";
import ExploreEvents from "./ExploreEvents";

function HomePage() {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Welcome to Adventure Hub</h1>
        <p className="hero-subtitle">Explore Beyond Boundaries - Adventure Awaits!</p>
        <div className="hero-search">
          <input
            type="text"
            placeholder="Search for destinations, adventures..."
            className="search-input"
          />
          <button className="search-button">Search</button>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="features-section">
      <ExploreEvents/>
        <h2 className="features-title">Featured Adventures</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <img src={img1} alt="Sunset Kayaking" />
            <h3>Sunset Kayaking</h3>
            <p>Enjoy a peaceful kayaking experience during sunset on serene waters.</p>
          </div>
          <div className="feature-card">
            <img src={img2} alt="Mountain Trekking Expedition" />
            <h3>Mountain Trekking Expedition</h3>
            <p>Challenge yourself with an adventurous trek through rugged mountain trails.</p>
          </div>
          <div className="feature-card">
            <img src={img3} alt="Everest Base Camp Trek" />
            <h3>Everest Base Camp Trek</h3>
            <p>Embark on a thrilling journey to the base camp of Mount Everest, the world's highest peak.</p>
          </div>
          <div className="feature-card">
            <img src={img4} alt="Deep Sea Diving Experience" />
            <h3>Deep Sea Diving Experience</h3>
            <p>Dive deep into the ocean to explore vibrant marine life and underwater wonders.</p>
          </div>
          <div className="feature-card">
            <img src={img5} alt="Rock Climbing" />
            <h3>Rock Climbing</h3>
            <p>Embark on a journey with our curated travel plans.</p>
          </div>
          <div className="feature-card">
            <img src={img6} alt="Alpine Skiing Adventure" />
            <h3>Alpine Skiing Adventure</h3>
            <p>Glide down snowy alpine slopes in an exhilarating skiing adventure.</p>
          </div>
          <div className="feature-card">
            <img src={img7} alt="Lake View Sightseeing Tour" />
            <h3>Lake View Sightseeing Tour</h3>
            <p>Relax with a picturesque tour around a tranquil lake with stunning views.</p>
          </div>
          <div className="feature-card">
            <img src={img8} alt="Himalayan Hiking Trails" />
            <h3>Himalayan Hiking Trails</h3>
            <p>Explore scenic hiking paths in the breathtaking Himalayan region.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;


