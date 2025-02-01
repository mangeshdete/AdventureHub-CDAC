import React from "react";

function SupportHelp() {
  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center">Support/Help</h3>

      {/* FAQ Section */}
      <div className="mb-5">
        <h4>Frequently Asked Questions</h4>
        <div className="accordion" id="faqAccordion">
          {[
            { question: "How do I book an event?", answer: "Login as customer first, , then search for your desired destination, and you can book the events you wanted as per availibility" },
            { question: "How do I list an event as an organizer?", answer: "Organizers can create an account, go to the 'Organizer Dashboard,' and click 'Create Event' to list an event." },
            { question: "Can I get a refund after booking?", answer: "Yes, refunds are available based on our cancellation policy. Please refer to our Refund and Cancellation Policy." },
            { question: "How can I modify my booking?", answer: "Log in to your account, navigate to 'My Bookings,' and select the booking you want to modify." },
            { question: "Is there a support team available 24/7?", answer: "Yes, our support team is available 24/7 via email, phone, and live chat." },
            { question: "What payment methods do you accept?", answer: "We accept credit/debit cards, PayPal, and other online payment methods." },
            { question: "Can I host private events?", answer: "Yes, you can create private events by selecting the 'Private Event' option while listing your event." },
          ].map((faq, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                >
                  {faq.question}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Options */}
      <div className="mb-5">
        <h4>Contact Us</h4>
        <p>If you have any questions or issues, please reach out to us:</p>
        <ul className="list-group">
          <li className="list-group-item"><strong>Email:</strong> adventurehub@gmail.com</li>
          <li className="list-group-item"><strong>Phone:</strong> 7854123256</li>
        </ul>
      </div>

      {/* Helpful Resources */}
      <div className="mb-5">
        <h4>Helpful Resources</h4>
        <ul className="list-group">
          <li className="list-group-item"><a href="/terms">Terms and Conditions</a></li>
          <li className="list-group-item"><a href="/privacy">Privacy Policy</a></li>
          <li className="list-group-item"><a href="/refund">Refund and Cancellation Policy</a></li>
        </ul>
      </div>

      {/* Feedback Section */}
      <div>
        <h4>Feedback and Suggestions</h4>
        <p>We'd love to hear from you! Share your feedback or suggestions:</p>
        <textarea
          className="form-control mb-3"
          rows="4"
          placeholder="Enter your feedback here..."
        ></textarea>
        <button className="btn btn-primary">Submit</button>
      </div>
    </div>
  );
}

export default SupportHelp;
