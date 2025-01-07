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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

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

    // fetch("http://localhost:8082/saveNewOrganiser", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(newOrgDetails)
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('Organizer registered successfully:', data);
    //     navigate("/");
    //   })
    //   .catch((error) => {
    //     console.error("Error registering organizer:", error);
    //     setError("Failed to register organizer.");
    //   });

    console.log(newOrgDetails);
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
            />
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
          </div>

          <button type="submit" className="btn-submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default OrganizerRegisterPage;