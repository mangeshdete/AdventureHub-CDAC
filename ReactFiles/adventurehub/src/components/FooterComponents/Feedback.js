import React from 'react';
import "../../styles/FooterStyles/Feedback.css";

function Feedback() {
  return (
    <div className="footer-feedback-container">
      <h1 className="footer-feedback-title">Feedback</h1>
      <p className="footer-feedback-paragraph">
        At AdventureHub, we are committed to providing the best possible experience for our users. Your feedback is crucial in helping us achieve this goal. We encourage you to share your thoughts, suggestions, and experiences with us. Whether you had a fantastic adventure or encountered any issues, we want to hear from you!
      </p>
      <p className="footer-feedback-paragraph">
        Please take a moment to fill out our feedback form, which can be found on our website. Your insights will help us improve our services and offerings. We value your opinion and appreciate your time in helping us enhance the AdventureHub experience for everyone.
      </p>
      <p className="footer-feedback-paragraph">
        Additionally, if you have any specific comments about a recent adventure you booked through our platform, please include those details in your feedback. This will allow us to address any concerns directly and ensure that our partners maintain the high standards we expect.
      </p>
      <p className="footer-feedback-paragraph">
        Thank you for being a part of the AdventureHub community! We look forward to your feedback and hope to continue providing you with exciting adventures in the future.
      </p>
    </div>
  );
}

export default Feedback;