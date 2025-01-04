import React, { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router';
import '../styles/RegistrationForms.css';

const initialState = {
  formData: {
    email: '',
    password: '',
    contact: '',
    securityqans: '',
    roleid: '2',
    rolename: 'organiser',
    qid: '',
    question: '',
    orgname: '',
    gst: '',
    pancard: '',
    street: '',
    cityid: '',
    cityname: '',
    stateid: '',
    statename: '',
    pincode: ''
  }
};

const regexPatterns = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Valid email
  password: /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d@$!%*#?&]{8,}$/, // At least 8 chars, 1 letter, 1 number
  contact: /^\d{10}$/, // Exactly 10 digits
  orgname: /^[A-Za-z]{2,}$/, // At least 2 letters
  pancard: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 
  gst: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 
  street: /^[A-Za-z0-9\s,'-]{3,}$/, // At least 3 chars, allows letters, numbers, spaces, and common punctuation
  pincode: /^\d{6}$/, // Exactly 6 digits
  securityqans: /^[A-Za-z0-9\s]{3,}$/, // At least 3 chars, allows letters, numbers, and spaces
};

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FORM_DATA':
      return {
        ...state,
        formData: { ...state.formData, [action.payload.id]: action.payload.value}
      };
    default:
      return state;
  }
}

function OrganizerRegisterPage() {
  const [error, setError] = useState("");
  const [statesfromdb, setStatesFromDb] = useState([]);
  const [securityQuestions, setSecurityQuestions] = useState([]);
  const [cities, setCities] = useState([]);
  const [formErrors,setFormErrors]=useState([]);

  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch states and security questions on component mount
  useEffect(() => {
    fetch("http://localhost:8082/getAllStates")
      .then((resp) => resp.json())
      .then((data) => setStatesFromDb(data))
      .catch((e) => console.log(e));

    fetch("http://localhost:8082/getAllSecurityQuestions")
      .then((resp) => resp.json())
      .then((data) => setSecurityQuestions(data))
      .catch((err) => console.log(err));
  }, []);

  // Handle input changes and update form data
  const handleChange = (e) => {
    const { id, value } = e.target;

    dispatch({ type: 'UPDATE_FORM_DATA', payload: { id, value } });

    if (id === 'stateid') {
      fetch("http://localhost:8082/getCitiesByStateId?stateId=" + value)
        .then((resp) => resp.json())
        .then((data) => setCities(data))
        .catch((err) => console.log(err));
    }
  };

  const [userExists,setUserExists]=useState(false);
  const handleBlurOfEmail = (e) => {
    const { value } = e.target;
    fetch("http://localhost:8082/getUserByEmailId?email=" + value)
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        if (data === true) { // Check if the response is true
          setError("User  with this email already exists");
          setUserExists(true);
        } else {
          setError(""); // Clear the error if the user does not exist
          setUserExists(false);
        }
      })
      .catch((err) => {
        console.error("Error checking email:", err);
       // setError("Error checking email availability");
      });
  };


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data before submitting
    const errors = validateForm(state.formData);

    if (Object.keys(errors).length > 0) {
      // If there are validation errors, show the errors and do not proceed
      setFormErrors(errors);
      return; // Stop further execution
    }
  
    // Clear previous errors if form is valid
    setFormErrors({});
  

    const formData = { ...state.formData };

    const newOrgDetails = {
      user: {
        email: formData.email,
        password: formData.password,
        contact: formData.contact,
        securityqans: formData.securityqans,
        roleid: {
          roleid: '2',
          rolename: 'organiser'
        },
        questions: {
          qid: formData.qid,
          question: formData.question
        }
      },
      orgname: formData.orgname,
      gst: formData.gst,
      pancard: formData.pancard,
      street: formData.street,
      city: {
        cityid: formData.cityid,
        cityname: formData.cityname,
        states: {
          stateid: formData.stateid,
          statename: formData.statename
        }
      },
      pincode: formData.pincode
    };

    fetch("http://localhost:8082/saveNewOrganiser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newOrgDetails)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Organizer registered successfully:', data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error registering organizer:", error);
        setError("Failed to register organizer.");
      });

    console.log(newOrgDetails);
  };

  //formvalidation
  const validateForm = (formData) => {
    const errors = {};
  
    if (!regexPatterns.email.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }
  
    if (!regexPatterns.password.test(formData.password)) {
      errors.password =
        "Password must be at least 8 characters long and contain at least one letter and one number.";
    }
  
    if (!regexPatterns.contact.test(formData.contact)) {
      errors.contact = "Please enter a valid 10-digit contact number.";
    }
  
    if (!regexPatterns.orgname.test(formData.orgname)) {
      errors.orgname = "First name must be at least 2 letters long.";
    }
  
    if (!regexPatterns.pancard.test(formData.pancard)) {
      errors.pancard = "Invalid Pan Details!";
    }
  
    if (!regexPatterns.gst.test(formData.gst)) {
      errors.gst = "Gst number must be exactly 15 digits.";
    }
  
    if (!regexPatterns.street.test(formData.street)) {
      errors.street = "Street address must be at least 3 characters long.";
    }
  
    if (!regexPatterns.pincode.test(formData.pincode)) {
      errors.pincode = "Pincode must be exactly 6 digits.";
    }
  
    if (!regexPatterns.securityqans.test(formData.securityqans)) {
      errors.securityqans = "Security answer must be at least 3 characters long.";
    }
    setFormErrors(errors); // Set the errors in state
    return errors;
  };

  return (
    <div className="registration-page">
      <div className="registration-card">
        <h1 className="text-center">Organizer Registration</h1>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-text">{error}</p>}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={state.formData.email}
              onChange={handleChange}
              onBlur={handleBlurOfEmail}
              />
              {formErrors.email && <p className="text-danger">{formErrors.email}</p>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={state.formData.password}
              onChange={handleChange}
            />
            {formErrors.password && <p className="text-danger">{formErrors.password}</p>}
          </div>

          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="text"
              id="contact"
              className="form-control"
              value={state.formData.contact}
              onChange={handleChange}
            />
            {formErrors.contact && <p className="text-danger">{formErrors.contact}</p>}
          </div>

          <div className="form-group">
            <label>Organization Name</label>
            <input
              type="text"
              id="orgname"
              className="form-control"
              value={state.formData.orgname}
              onChange={handleChange}
            />
            {formErrors.orgname && <p className="text-danger">{formErrors.orgname}</p>}
          </div>

          <div className="form-group">
            <label>GST Number</label>
            <input
              type="text"
              id="gst"
              className="form-control"
              value={state.formData.gst}
              onChange={handleChange}
            />
            {formErrors.gst && <p className="text-danger">{formErrors.gst}</p>}
          </div>

          <div className="form-group">
            <label>PAN Card</label>
            <input
              type="text"
              id="pancard"
              className="form-control"
              value={state.formData.pancard}
              onChange={handleChange}
            />
            {formErrors.pancard && <p className="text-danger">{formErrors.pancard}</p>}
          </div>

          <div className="form-group">
            <label>Street</label>
            <input
              type="text"
              id="street"
              className="form-control"
              value={state.formData.street}
              onChange={handleChange}
            />
            {formErrors.street && <p className="text-danger">{formErrors.street}</p>}
          </div>

          <div className="form-group">
            <label>State</label>
            <select
              id="stateid"
              className="form-control"
              value={state.formData.stateid}
              onChange={handleChange}
            >
              <option value="">-- Select State --</option>
              {statesfromdb.map((s) => (
                <option key={s.stateid} value={s.stateid}>{s.statename}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>City</label>
            <select
              id="cityid"
              className="form-control"
              value={state.formData.cityid}
              onChange={handleChange}
            >
              <option value="">-- Select City --</option>
              {cities.map((v) => (
                <option key={v.cityid} value={v.cityid}>{v.cityname}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Pincode</label>
            <input
              type="text"
              id="pincode"
              className="form-control"
              value={state.formData.pincode}
              onChange={handleChange}
            />
            {formErrors.pincode && <p className="text-danger">{formErrors.pincode}</p>}
          </div>

          <div className="form-group">
            <label>Security Question</label>
            <select
              id="qid"
              className="form-control"
              value={state.formData.qid}
              onChange={handleChange}
            >
              <option value="">-- Select Security Question --</option>
              {securityQuestions.map((ques) => (
                <option key={ques.qid} value={ques.qid}>{ques.question}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Security Answer</label>
            <input
              type="text"
              id="securityqans"
              className="form-control"
              value={state.formData.securityqans}
              onChange={handleChange}
            />
            {formErrors.securityqans && <p className="text-danger">{formErrors.securityqans}</p>}
          </div>

          <button type="submit" className="btn-submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default OrganizerRegisterPage;