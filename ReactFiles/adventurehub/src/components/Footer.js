import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-wrapper">
        <div className="footer-about">
          <h4>About Us</h4>
          <p>
            AdventureHub is your go-to platform for discovering and booking exciting adventures and events.
          </p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/feedback">Feedback</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Email: support@adventurehub.com</p>
          <p>Phone: +1 (555) 123-4567</p>
        </div>
        <div className="footer-social">
          <h4>Follow Us</h4>
          <ul className="social-media">
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} AdventureHub. All rights reserved.</p>
        <p className="footer-owners">Owners: Rupesh Bhure, Mangesh Dete, Tejas Shinkar, Gaurav Varade</p>
      </div>
    </footer>
  );
}

export default Footer;