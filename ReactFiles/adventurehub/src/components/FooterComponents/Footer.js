import React from 'react';
import { Link } from 'react-router-dom';
import "../../styles/FooterStyles/Footer.css";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-wrapper">
        <div className="footer-about">
          <h4>About Us</h4>
          <p>
            AdventureHub is your go-to platform for discovering and booking exciting adventures and events. We are dedicated to providing unforgettable experiences for adventure seekers of all kinds.
          </p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</Link></li>
            <li><Link to="/about" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>About</Link></li>
            <li><Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Contact</Link></li>
            <li><Link to="/feedback" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Feedback</Link></li>
            <li><Link to="/terms" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Terms of Service</Link></li>
            <li><Link to="/privacy" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Privacy Policy</Link></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Email: <a href="mailto:support@adventurehub.com">support@adventurehub.com</a></p>
          <p>Phone: <a href="tel:+15551234567">+1 (555) 123-4567</a></p>
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
        
      </div>
    </footer>
  );
}

export default Footer;