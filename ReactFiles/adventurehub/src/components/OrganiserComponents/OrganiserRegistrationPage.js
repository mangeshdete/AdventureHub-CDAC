import React, { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router';
import '../../styles/OrganiserStyles/OrganizerRegistration.css';

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
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
  contact: /^\d{10}$/,
  orgname: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
  pancard: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  gst: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
  street: /^[A-Za-z0-9\s,'-]{3,}$/,
  pincode: /^\d{6}$/,
  securityqans: /^[A-Za-z0-9\s]{3,}$/
};

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FORM_DATA':
      return {
        ...state,
        formData: { ...state.formData, [action.payload.id]: action.payload.value }
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
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch states and security questions on component mount
  useEffect(() => {
    fetch("http://localhost:8142/getAllStates")
      .then((resp) => resp.json())
      .then((data) => setStatesFromDb(data))
      .catch((e) => console.log(e));

    fetch("http://localhost:8142/getAllSecurityQuestions")
      .then((resp) => resp.json())
      .then((data) => setSecurityQuestions(data))
      .catch((err) => console.log(err));
  }, []);

  // Handle input changes and update form data
  const handleChange = (e) => {
    const { id, value } = e.target;

    dispatch({ type: 'UPDATE_FORM_DATA', payload: { id, value } });

    if (id === 'stateid') {
      fetch(`http://localhost:8142/getCitiesByStateId?stateId=${value}`)
        .then((resp) => resp.json())
        .then((data) => setCities(data))
        .catch((err) => console.log(err));
    }
  };

  // Handle email validation and check if user exists
  const handleBlurOfEmail = (e) => {
    const { value } = e.target;
    fetch(`http://localhost:8142/getUser ByEmailId?email=${value}`)
      .then((response) => response.json())
      .then((data) => {
        setError(data ? "User  with this email already exists" : "");
      })
      .catch((err) => console.error("Error checking email:", err));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(state.formData);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    const formData = { ...state.formData };

    const newOrgDetails = {
      user: {
        email: formData.email,
        password: formData.password,
        contact: formData.contact,
        securityqans: formData.securityqans,
        roleid: { roleid: '2', rolename: 'organiser' },
        questions: { qid: formData.qid, question: formData.question }
      },
      orgname: formData.orgname,
      gst: formData.gst,
      pancard: formData.pancard,
      street: formData.street,
      city: {
        cityid: formData.cityid,
        cityname: formData.cityname,
        states: { stateid: formData.stateid, statename: formData.statename }
      },
      pincode: formData.pincode
    };

    fetch("http://localhost:8142/saveNewOrganiser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrgDetails)
    })
      .then((response) => response.json())
      .then(() => navigate("/"))
      .catch((error) => {
        console.error("Error registering organizer:", error);
        setError("Failed to register organizer.");
      });
  };

  // Form validation
  const validateForm = (formData) => {
    const errors = {};
    for (let field in regexPatterns) {
      if (!regexPatterns[field].test(formData[field])) {
        errors[field] = `Invalid ${field.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase()}!`;
      }
    }
    return errors;
  };

  return (
    <div className="organizer-registration-page">
      <div className="organizer-registration-card">
        <h1 className="text-center">Organizer Registration</h1>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-danger">{error}</p>}

          {Object.keys(initialState.formData).map((field) => (
            <div key={field} className="form-group">
              <label>{field.replace(/([a-z])([A-Z])/g, "$1 $2")}</label>
              {field === "qid" ? (
                <select id={field} className="form-control" value={state.formData[field]} onChange={handleChange}>
                  <option value="">-- Select Security Question --</option>
                  {securityQuestions.map((q) => (
                    <option key={q.qid} value={q.qid}>{q.question}</option>
                  ))}
                </select>
              ) : field === "stateid" ? (
                <select id={field} className="form-control" value={state.formData[field]} onChange={handleChange}>
                  <option value="">-- Select State --</option>
                  {statesfromdb.map((s) => (
                    <option key={s.stateid} value={s.stateid}>{s.statename}</option>
                  ))}
                </select>
              ) : field === "cityid" ? (
                <select id={field} className="form-control" value={state.formData[field]} onChange={handleChange}>
                  <option value="">-- Select City --</option>
                  {cities.map((v) => (
                    <option key={v.cityid} value={v.cityid}>{v.cityname}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field === "password" ? "password" : "text"}
                  id={field}
                  className="form-control"
                  value={state.formData[field]}
                  onChange={handleChange}
                  onBlur={field === "email" ? handleBlurOfEmail : undefined}
                />
              )}
              {formErrors[field] && <p className="text-danger">{formErrors[field]}</p>}
            </div>
          ))}

          <button type="submit" className="btn-submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default OrganizerRegisterPage;