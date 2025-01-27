import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for navigation
import '../styles/ForgotPassword.css';

const ForgotPassword = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [fetchedAnswer, setFetchedAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [stage, setStage] = useState(1); // Stages: 1=email verification, 2=answer verification, 3=password reset
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false); // To track if password reset was successful

  const handleVerifyEmail = () => {
    if (!email) return;

    fetch(`http://localhost:8082/getUserByEmailId?email=${email}`)
      .then((response) => response.json())
      .then((isUserExist) => {
        if (isUserExist) {
          setEmailValid(true);
          setMessage('Email found. Please answer the security question.');
          setMessageType('success');
          setStage(2); // Move to the next stage (answer verification)
          
          // Fetch the security question
          fetch(`http://localhost:8082/getSecurityQuestionByEmailId?email=${email}`)
            .then((response) => response.json())
            .then((data) => {
              setSecurityQuestion(data.question);
  
              // Fetch the security answer
              fetch(`http://localhost:8082/getSecurityAnswerByEmailId?email=${email}`)
                .then((response) => {
                  if (response.status === 204) {
                    throw new Error('Security answer not available for the provided email.');
                  } else if (response.ok) {
                    return response.text(); // Parse as plain text
                  } else {
                    throw new Error('Unexpected error fetching security answer.');
                  }
                })
                .then((answer) => {
                  setFetchedAnswer(answer);
                })
                .catch((error) => {
                  setFetchedAnswer('');
                  setMessage(error.message);
                  setMessageType('error');
                });
            })
            .catch(() => {
              setMessage('Error fetching security question.');
              setMessageType('error');
            });
        } else {
          setEmailValid(false);
          setMessage('Email not found. Please check and try again.');
          setMessageType('error');
        }
      })
      .catch(() => {
        setMessage('Error checking email. Please try again later.');
        setMessageType('error');
      });
  };

  const handleVerifyAnswer = () => {
    if (answer.toLowerCase() === fetchedAnswer.toLowerCase()) {
      setMessage('Answer verified. Please set your new password.');
      setMessageType('success');
      setStage(3); // Proceed to password reset stage
    } else {
      setMessage('Incorrect answer. Please try again.');
      setMessageType('error');
    }
  };

  const handlePasswordReset = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setMessage(
        'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and be at least 8 characters long.'
      );
      setMessageType('error');
      return;
    }
  
    if (newPassword !== reEnterPassword) {
      setMessage('Passwords do not match. Please re-enter.');
      setMessageType('error');
      return;
    }
  
    // Send the password reset request to the backend
    fetch('http://localhost:8082/resetPassword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: newPassword,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          // Password successfully updated
          setMessage('Password has been successfully updated!');
          setMessageType('success');
          setPasswordResetSuccess(true);  // Set this to true after successful password reset
  
          // Hide password input fields after success
          setTimeout(() => {
            navigate('/login');
          }, 3000);
          
        } else if (response.status === 204) {
          // No content (password update failed)
          setMessage('Error updating password. Please try again later.');
          setMessageType('error');
        } else {
          // Handle unexpected response status codes
          setMessage('Unexpected error occurred. Please try again.');
          setMessageType('error');
        }
      })
      .catch(() => {
        setMessage('Error resetting password. Please try again later.');
        setMessageType('error');
      });
  };
  

  return (
    <div className="forgot-password-container">
      <h2 className="heading">Forgot Password</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (stage === 2) handleVerifyAnswer();
          if (stage === 3) handlePasswordReset();
        }}
        className="forgot-password-form"
      >
        {stage === 1 && (
          <>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field"
              />
              <button
                type="button"
                onClick={handleVerifyEmail}
                className="submit-btn"
              >
                Verify
              </button>
            </div>
          </>
        )}

        {stage === 2 && emailValid && (
          <>
            <div className="form-group">
              <label>Security Question:</label>
              <input
                type="text"
                value={securityQuestion}
                disabled
                readOnly
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>Answer:</label>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
                className="input-field"
              />
            </div>
            <button type="submit" className="submit-btn">
              Next
            </button>
          </>
        )}

        {stage === 3 && !passwordResetSuccess && (
          <>
            <div className="form-group">
              <label>New Password:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>Re-enter New Password:</label>
              <input
                type="password"
                value={reEnterPassword}
                onChange={(e) => setReEnterPassword(e.target.value)}
                required
                className="input-field"
              />
            </div>
            <button type="submit" className="submit-btn">
              Reset Password
            </button>
          </>
        )}

        {passwordResetSuccess && (
          <div className="success-message">
            <p>Password reset successfully!</p>
            <button
              type="button"
              className="submit-btn"
              onClick={() => navigate('/login')}
            >
              Go to Login
            </button>
          </div>
        )}

        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
