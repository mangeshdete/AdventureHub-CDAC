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
    pincode: '',
    dob: ''
  }
};

const regexPatterns = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Valid email
  password: /^(?=.[A-Z])(?=.\d)(?=.[!@#$%^&])[A-Za-z\d!@#$%^&]{8,15}$/, // At least 8 chars, 1 letter, 1 number
  contact: /^\d{10}$/, // Exactly 10 digits
  fname: /^[A-Z]{1}[a-z]{2,}$/, // At least 2 letters
  lname: /^[A-Z]{1}[a-z]{2,}$/, // At least 2 letters
  aadhaar: /^\d{12}$/, // Exactly 12 digits
  street: /^[A-Za-z0-9\s,'-]{3,}$/, // At least 3 chars, allows letters, numbers, spaces, and common punctuation
  pincode: /^\d{6}$/, // Exactly 6 digits
  securityqans: /^[A-Za-z0-9\s]{3,}$/, // At least 3 chars, allows letters, numbers, and spaces

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
  const [formErrors, setFormErrors] = useState({});
  const [dateofBirth,setdateofbirth]=useState({
    formData: {
      dob: "",
    },
    formErrors: {
      dob: "",
    },
  });

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

    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remove time part for accurate comparison

    // Parse the entered date
    const enteredDate = new Date(value);

    // Check if the entered date is ahead of today
    if (enteredDate > today) {
      setdateofbirth((prevState) => ({
        ...prevState,
        formErrors: {
          ...prevState.formErrors,
          dob: "Date of Birth cannot be ahead of today's date.",
        },
      }));
      return; // Stop further processing
    }
    // Clear the error if the date is valid
    setdateofbirth((prevState) => ({
      ...prevState,
      formData: {
        ...prevState.formData,
        [id]: value,
      },
      formErrors: {
        ...prevState.formErrors,
        dob: "",
      },
    }));

    dispatch({ type: 'UPDATE_FORM_DATA', payload: { id, value } });

    if (id === 'stateid') {
      fetch("http://localhost:8082/getCitiesByStateId?stateId=" + value)
        .then((resp) => resp.json())
        .then((data) => setCities(data))
        .catch((err) =>{ console.log(err);
        setCities([]);
        });
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
  // const handleSubmit = (e) => {
    //   e.preventDefault();

  //   const errors = validateForm(state.formData); // validate form data

  //   const formData = { ...state.formData };

  //   const newCustDetails = {
  //     user: {
  //       email: formData.email,
  //       password: formData.password,
  //       contact: formData.contact,
  //       securityqans: formData.securityqans,
  //       roleid: {
  //         roleid: '1',
  //         rolename: 'Customer'
  //       },
  //       questions: {
  //         qid: formData.qid,
  //         question: formData.question
  //       }
  //     },
  //     fname: formData.fname,
  //     aadhaar: formData.aadhaar,
  //     lname: formData.lname,
  //     street: formData.street,
  //     city: {
  //       cityid: formData.cityid,
  //       cityname: formData.cityname,
  //       states: {
  //         stateid: formData.stateid,
  //         statename: formData.statename
  //       }
  //     },
  //     pincode: formData.pincode
  //   };

  //   fetch("http://localhost:8082/registerNewCustomer", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(newCustDetails)
  //   })
  //     .then((response) =>
  //      response.json())
  //     .then((data) => {
  //       console.log('Customer registered successfully:', data);
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       console.error("Error registering customer:", error);
  //       setError("Error Registering you");
  //     });

  //   console.log(newCustDetails);
  // };

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
  
    const newCustDetails = {
      user: {
        email: formData.email,
        password: formData.password,
        contact: formData.contact,
        securityqans: formData.securityqans,
        roleid: {
          roleid: '1',
          rolename: 'Customer'
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
      cities: {
        cityid: formData.cityid,
        cityname: formData.cityname,
        states: {
          stateid: formData.stateid,
          statename: formData.statename
        }
      },
      pincode: formData.pincode,
      dob: formData.dob
    };
    
    console.log(newCustDetails);
    // Proceed with the API call if there are no validation errors
    fetch("http://localhost:8082/registerNewCustomer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newCustDetails)
    })
      .then((response) => response.json()
      )
      .then((data) => {
        
        console.log('Customer registered successfully:', data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error registering customer:", error);
        setError("Error Registering you");
      });
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
  
    if (!regexPatterns.fname.test(formData.fname)) {
      errors.fname = "First name must be at least 2 letters long.";
    }
  
    if (!regexPatterns.lname.test(formData.lname)) {
      errors.lname = "Last name must be at least 2 letters long.";
    }
  
    if (!regexPatterns.aadhaar.test(formData.aadhaar)) {
      errors.aadhaar = "Aadhaar number must be exactly 12 digits.";
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
            {formErrors.email && <p className="text-danger">{formErrors.email}</p>}
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
            {error.password && <p className="text-danger">{error.password}</p>}
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
            {formErrors.contact && <p className="text-danger">{formErrors.contact}</p>}
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
            {formErrors.contact && <p className="text-danger">{formErrors.fname}</p>}
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
            {formErrors.contact && <p className="text-danger">{formErrors.lname}</p>}
          </div>

          <div className="mb-3">
            <label>Date Of Birth</label>
            <input
              type="date"
              id="dob"
              className="form-control form-control-sm"
              value={state.formData.dob}
              onChange={handleChange}
            />
            {/* {formErrors.contact && <p className="text-danger">{formErrors.lname}</p>} */}
            {dateofBirth.formErrors.dob && (
            <p className="text-danger">{dateofBirth.formErrors.dob}</p>
            )}
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
            {formErrors.contact && <p className="text-danger">{formErrors.aadhaar}</p>}
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
            {formErrors.contact && <p className="text-danger">{formErrors.street}</p>}
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
            {formErrors.contact && <p className="text-danger">{formErrors.pincode}</p>}
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
            {formErrors.contact && <p className="text-danger">{formErrors.securityqans}</p>}
          </div>

          <button type="submit" className="btn btn-primary" disabled={userExists?true:false}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}