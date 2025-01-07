import React, { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router';
import '../styles/RegistrationForms.css';

const initialState = {
  formData: {
    email: '',
    password: '',
    contact: '',
    securityqans: '',
    roleid: '1',
    rolename: 'Customer',
    qid: '',
    question: '',
    fname: '',
    lname: '',
    aadhaar: '',
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
        formData: { ...state.formData, [action.payload.id]: action.payload.value }
      };
    default:
      return state;
  }
}

export default function CustomerRegisterPage() {
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


  const [userExists,setUserExists]=useState(false);
  const handleBlurOfEmail = (e) => {
    const { value } = e.target;
    fetch("http://localhost:8082/getUserByEmailId?email="+value)
    .then(data => {
      data.json();
      if(data == "true")
        setError("User with this email already exists");
        setUserExists(true);
    })
  }
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = { ...state.formData };

    const newCustDetails = {
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
      fname: formData.fname,
      aadhaar: formData.aadhaar,
      lname: formData.lname,
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

    // fetch("http://localhost:8082/registerNewCustomer", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(newCustDetails)
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('Organizer registered successfully:', data);
    //     navigate("/");
    //   })
    //   .catch((error) => {
    //     console.error("Error registering organizer:", error);
    //     setError("Error Registering you");
    //   });

    console.log(newCustDetails);
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Customer Registration</h1>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-danger">{error}</p>}

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              id="email"
              className="form-control form-control-sm"
              value={state.formData.email}
              onChange={handleChange}
              onBlur={handleBlurOfEmail}
            />
            <p hidden={!userExists} style={{display:userExists?'flex':'none'}} >{error}</p>
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              id="password"
              className="form-control form-control-sm"
              value={state.formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Contact Number</label>
            <input
              type="text"
              id="contact"
              className="form-control form-control-sm"
              value={state.formData.contact}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>First Name</label>
            <input
              type="text"
              id="fname"
              className="form-control form-control-sm"
              value={state.formData.fname}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Last Name</label>
            <input
              type="text"
              id="lname"
              className="form-control form-control-sm"
              value={state.formData.lname}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Street</label>
            <input
              type="text"
              id="street"
              className="form-control form-control-sm"
              value={state.formData.street}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Aadhaar</label>
            <input
              type="text"
              id="aadhaar"
              className="form-control form-control-sm"
              value={state.formData.aadhaar}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>State</label>
            <select
              id="stateid"
              className="form-select form-select-sm"
              value={state.formData.stateid}
              onChange={handleChange}
            >
              <option value="">-- Select State --</option>
              {statesfromdb.map((s) => (
                <option key={s.stateid} value={s.stateid}>
                  {s.statename}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label>City</label>
            <select
              id="cityid"
              className="form-select form-select-sm"
              value={state.formData.cityid}
              onChange={handleChange}
            >
              <option value="">-- Select City --</option>
              {cities.map((v) => (
                <option key={v.cityid} value={v.cityid}>
                  {v.cityname}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label>Pincode</label>
            <input
              type="text"
              id="pincode"
              className="form-control form-control-sm"
              value={state.formData.pincode}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Security Question</label>
            <select
              id="qid"
              className="form-select form-select-sm"
              value={state.formData.qid}
              onChange={handleChange}
            >
              <option value="">-- Select Security Question --</option>
              {securityQuestions.map((ques) => (
                <option key={ques.qid} value={ques.qid}>
                  {ques.question}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label>Security Answer</label>
            <input
              type="text"
              id="securityqans"
              className="form-control form-control-sm"
              value={state.formData.securityqans}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={userExists?true:false}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
