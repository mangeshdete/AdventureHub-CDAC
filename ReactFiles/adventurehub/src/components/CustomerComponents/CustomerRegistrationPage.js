// import React, { useEffect, useReducer, useState } from 'react';
// import { useNavigate } from 'react-router';
// import '../../styles/CustomerStyles/RegistrationForms.css';

// const initialState = {
//   formData: {
//     email: '',
//     password: '',
//     contact: '',
//     securityqans: '',
//     roleid: '1',
//     rolename: 'Customer',
//     qid: '',
//     question: '',
//     fname: '',
//     lname: '',
//     aadhaar: '',
//     street: '',
//     cityid: '',
//     cityname: '',
//     stateid: '',
//     statename: '',
//     pincode: '',
//     dob: ''
//   }
// };

// const regexPatterns = {
//   email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Valid email
//   password: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/, // At least 8 chars, 1 letter, 1 number
//   contact: /^\d{10}$/, // Exactly 10 digits
//   fname: /^[A-Za-z]{2,}$/, // At least 2 letters
//   lname: /^[A-Za-z]{2,}$/, // At least 2 letters
//   aadhaar: /^\d{12}$/, // Exactly 12 digits
//   street: /^[A-Za-z0-9\s,'-]{3,}$/, // At least 3 chars, allows letters, numbers, spaces, and common punctuation
//   pincode: /^\d{6}$/, // Exactly 6 digits
//   securityqans: /^[A-Za-z0-9\s]{3,}$/, // At least 3 chars, allows letters, numbers, and spaces
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case 'UPDATE_FORM_DATA':
//       return {
//         ...state,
//         formData: { ...state.formData, [action.payload.id]: action.payload.value }
//       };
//     default:
//       return state;
//   }
// }

// export default function CustomerRegisterPage() {
//   const [error, setError] = useState("");
//   const [statesfromdb, setStatesFromDb] = useState([]);
//   const [securityQuestions, setSecurityQuestions] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [formErrors, setFormErrors] = useState({});
//   const navigate = useNavigate();
//   const [state, dispatch] = useReducer(reducer, initialState);

//   // Fetch states and security questions on component mount
//   useEffect(() => {
//     fetch("http://localhost:8140/auth/getAllStates")
//       .then((resp) => resp.json())
//       .then((data) => setStatesFromDb(data))
//       .catch((e) => console.log(e));

//     fetch("http://localhost:8140/auth/getAllSecurityQuestions")
//       .then((resp) => resp.json())
//       .then((data) => setSecurityQuestions(data))
//       .catch((err) => console.log(err));
//   }, []);

//   // Handle input changes and update form data
//   const handleChange = (e) => {
//     const { id, value, name } = e.target;

//     // Handle date of birth validation
//     if (name === 'dob') {
//       const today = new Date();
//       today.setHours(0, 0, 0, 0); // Remove time part for accurate comparison
//       const enteredDate = new Date(value);
//       if (enteredDate > today) {
//         setFormErrors((prevErrors) => ({
//           ...prevErrors,
//           dob: "Date of Birth cannot be ahead of today's date.",
//         }));
//         return; // Stop further processing
//       }
//       setFormErrors((prevErrors) => ({
//         ...prevErrors,
//         dob: "",
//       }));
//     }

//     // Update the main form data
//     dispatch({ type: 'UPDATE_FORM_DATA', payload: { id, value } });

//     // Fetch cities if the state is changed
//     if (id === 'stateid') {
//       fetch("http://localhost:8140/auth/getCitiesByStateId?stateId=" + value)
//         .then((resp) => resp.json())
//         .then((data) => setCities(data))
//         .catch((err) => {
//           console.log(err);
//           setCities([]);
//         });
//     }
//   };

//   const [userExists, setUserExists] = useState(false);
//   const handleBlurOfEmail = (e) => {
//     const { value } = e.target;
//     fetch("http://localhost:8140/auth/getUserByEmailId?email=" + value)
//       .then((response 
// ) => response.json())
//       .then((data) => {
//         if (data === true) {
//           setError("User  with this email already exists");
//           setUserExists(true);
//         } else {
//           setError("");
//           setUserExists(false);
//         }
//       })
//       .catch((err) => {
//         console.error("Error checking email:", err);
//       });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const errors = validateForm(state.formData);
    
//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       return;
//     }
    
//     setFormErrors({});
//     const formData = { ...state.formData };
//     const newCustDetails = {
//       user: {
//         email: formData.email,
//         password: formData.password,
//         contact: formData.contact,
//         securityqans: formData.securityqans,
//         roleid: {
//           roleid: '1',
//           rolename: 'Customer'
//         },
//         questions: {
//           qid: formData.qid,
//           question: formData.question
//         }
//       },
//       fname: formData.fname,
//       aadhaar: formData.aadhaar,
//       lname: formData.lname,
//       street: formData.street,
//       cities: {
//         cityid: formData.cityid,
//         cityname: formData.cityname,
//         states: {
//           stateid: formData.stateid,
//           statename: formData.statename
//         }
//       },
//       pincode: formData.pincode,
//       dob: formData.dob
//     };
    
//     console.log(newCustDetails);
//     fetch("http://localhost:8140/auth/registerNewCustomer", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(newCustDetails)
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log('Customer registered successfully:', data);
//         navigate("/");
//       })
//       .catch((error) => {
//         console.error("Error registering customer:", error);
//         setError("Error Registering you");
//       });
//   };

//   const validateForm = (formData) => {
//     const errors = {};
//     if (!regexPatterns.email.test(formData.email)) {
//       errors.email = "Please enter a valid email address.";
//     }
//     if (!regexPatterns.password.test(formData.password)) {
//       errors.password = "Password must be at least 8 characters long and contain at least one letter and one number.";
//     }
//     if (!regexPatterns.contact.test(formData.contact)) {
//       errors.contact = "Please enter a valid 10-digit contact number.";
//     }
//     if (!regexPatterns.fname.test(formData.fname)) {
//       errors.fname = "First name must be at least 2 letters long.";
//     }
//     if (!regexPatterns.lname.test(formData.lname)) {
//       errors.lname = "Last name must be at least 2 letters long.";
//     }
//     if (!regexPatterns.aadhaar.test(formData.aadhaar)) {
//       errors.aadhaar = "Aadhaar number must be exactly 12 digits.";
//     }
//     if (!regexPatterns.street.test(formData.street)) {
//       errors.street = "Street address must be at least 3 characters long.";
//     }
//     if (!regexPatterns.pincode.test(formData.pincode)) {
//       errors.pincode = "Pincode must be exactly 6 digits.";
//     }
//     if (!regexPatterns.securityqans.test(formData.securityqans)) {
//       errors.securityqans = "Security answer must be at least 3 characters long.";
//     }
//     setFormErrors(errors);
//     return errors;
//   };

//   return (
//     <div className="container">
//       <div className="card">
//         <h1>Customer Registration</h1>
//         <form onSubmit={handleSubmit}>
//           {error && <p className="text-danger">{error}</p>}
//           <div className="mb-3">
//             <label>Email</label>
//             <input
//               type="email"
//               id="email"
//               className="form-control form-control-sm"
//               value={state.formData.email}
//               onChange={handleChange}
//               onBlur={handleBlurOfEmail}
//             />
//             {formErrors.email && <p className="text-danger">{formErrors.email}</p>}
//           </div>
//           <div className="mb-3">
//             <label>Password</label>
//             <input
//               type="password"
//               id="password"
//               className="form-control form-control-sm"
//               value={state.formData.password}
//               onChange={handleChange}
//             />
//             {formErrors.password && <p className="text-danger">{formErrors.password}</p>}
//           </div>
//           <div className="mb-3">
//             <label>Contact Number</label>
//             <input
//               type="text"
//               id="contact"
//               className="form-control form-control-sm"
//               value={state.formData.contact}
//               onChange={handleChange}
//             />
//             {formErrors.contact && <p className="text-danger">{formErrors.contact}</p>}
//           </div>
//           <div className="mb-3">
//             <label>First Name</label>
//             <input
//               type="text"
//               id="fname"
//               className="form-control form-control-sm"
//               value={state.formData.fname}
//               onChange={handleChange}
//             />
//             {formErrors.fname && <p className="text-danger">{formErrors.fname}</p>}
//           </div>
//           <div className="mb-3">
//             <label>Last Name</label>
//             <input
//               type="text"
//               id="lname"
//               className="form-control form-control-sm"
//               value={state.formData.lname}
//               onChange={handleChange}
//             />
//             {formErrors.lname && <p className="text-danger">{formErrors.lname}</p>}
//           </div>
//           <div className="mb-3">
//             <label>Date Of Birth</label>
//             <input
//               type="date"
//               id="dob"
//               name="dob"
//               className="form-control form-control-sm"
//               value={state.formData.dob}
//               onChange={handleChange}
//             />
//             {formErrors.dob && <p className="text-danger">{formErrors.dob}</p>}
//           </div>
//           <div className="mb-3">
//             <label>Aadhaar</label>
//             <input
//               type="text"
//               id="aadhaar"
//               className="form-control form-control-sm"
//               value={state.formData.aadhaar}
//               onChange={handleChange}
//             />
//             {formErrors.aadhaar && <p className="text-danger">{formErrors.aadhaar}</p>}
//           </div>
//           <div className="mb-3">
//             <label>Street</label>
//             <input
//               type="text"
//               id="street"
//               className="form-control form-control-sm"
//               value={state.formData.street}
//               onChange={handleChange}
//             />
//             {formErrors.street && <p className="text-danger">{formErrors.street}</p>}
//           </div>
//           <div className="mb-3">
//             <label>State</label>
//             <select
//               id="stateid"
//               className="form-select form-select-sm"
//               value={state.formData.stateid}
//               onChange={handleChange}
//             >
//               <option value="">-- Select State --</option>
//               {statesfromdb.map((s) => (
//                 <option key={s.stateid} value={s.stateid}>
//                   {s.statename}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="mb-3">
//             <label>City</label>
//             <select
//               id="cityid"
//               className="form-select form-select-sm"
//               value={state.formData.cityid}
//               onChange={handleChange}
//             >
//               <option value="">-- Select City --</option>
//               {cities.map((v) => (
//                 <option key={v.cityid} value={v.cityid}>
//                   {v.cityname}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="mb-3">
//             <label>Pincode</label>
//             <input
//               type="text"
//               id="pincode"
//               className="form-control form-control-sm"
//               value={state.formData.pincode}
//               onChange={handleChange}
//             />
//             {formErrors.pincode && <p className="text-danger">{formErrors.pincode}</p>}
//           </div>
//           <div className="mb-3">
//             <label>Security Question</label>
//             <select
//               id="qid"
//               className="form-select form-select-sm"
//               value={state.formData.qid}
//               onChange={handleChange}
//             >
//               <option value="">-- Select Security Question --</option>
//               {securityQuestions.map((ques) => (
//                 <option key={ques.qid} value={ques.qid}>
//                   {ques.question}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="mb-3">
//             <label>Security Answer</label>
//             <input
//               type="text"
//               id="securityqans"
//               className="form-control form-control-sm"
//               value={state.formData.securityqans}
//               onChange={handleChange}
//             />
//             {formErrors.securityqans && <p className="text-danger">{formErrors.securityqans}</p>}
//           </div>
//           <button type="submit" className="btn btn-primary" disabled={userExists ? true : false}>
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router';
import '../../styles/CustomerStyles/RegistrationForms.css';

const initialState = {
  formData: {
    email: '',
    password: '',
    contact: '',
    securityqans: '',
    roleid: '1',
    rolename: 'Customer',
    questions: '',
    fname: '',
    lname: '',
    aadhaar: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    dob: ''
  }
};

const regexPatterns = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Valid email
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/, // At least 8 chars, 1 letter, 1 number
  contact: /^\d{10}$/, // Exactly 10 digits
  fname: /^[A-Za-z]{2,}$/, // At least 2 letters
  lname: /^[A-Za-z]{2,}$/, // At least 2 letters
  aadhaar: /^\d{12}$/, // Exactly 12 digits
  street: /^[A-Za-z0-9\s,'-]{3,}$/, // At least 3 chars, allows letters, numbers, spaces, and common punctuation
  pincode: /^\d{6}$/, // Exactly 6 digits
  securityqans: /^[A-Za-z0-9\s]{3,}$/ // At least 3 chars, allows letters, numbers, and spaces
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
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [successMessage, setSuccessMessage] = useState("");


  useEffect(() => {
    fetch("http://localhost:8140/auth/getAllStates")
      .then((resp) => resp.json())
      .then((data) => setStatesFromDb(data))
      .catch((e) => console.log(e));

    fetch("http://localhost:8140/auth/getAllSecurityQuestions")
      .then((resp) => resp.json())
      .then((data) => setSecurityQuestions(data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { id, value, name } = e.target;

    dispatch({ type: 'UPDATE_FORM_DATA', payload: { id, value } });

    // Validate onChange
    const fieldError = validateField(id, value);
    setFormErrors((prevErrors) => ({ ...prevErrors, [id]: fieldError[id] || '' }));

    if (id === 'state') {
      fetch("http://localhost:8140/auth/getCitiesByStateId?stateId=" + value)
        .then((resp) => resp.json())
        .then((data) => setCities(data))
        .catch((err) => {
          console.log(err);
          setCities([]);
        });
    }

    if (name === 'dob') {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Remove time part for accurate comparison
      const enteredDate = new Date(value);
      
      // Calculate the difference in years
      let age = today.getFullYear() - enteredDate.getFullYear();
      
      // Check if the birthday has occurred this year, and adjust age if not
      const monthDifference = today.getMonth() - enteredDate.getMonth();
      const dayDifference = today.getDate() - enteredDate.getDate();
    
      if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
      }
    
      // If entered date is in the future or user is not 18+
      if (enteredDate > today || age < 18) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          dob: "Date of Birth cannot be ahead of today's date, and age should be greater than 18",
        }));
        return; // Stop further processing
      }
    
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        dob: "",
      }));
    }
  };

  const validateField = (field, value) => {
    const errors = {};
    if (regexPatterns[field] && !regexPatterns[field].test(value)) {
      errors[field] = `Invalid ${field.replace(/([A-Z])/g, ' $1')}`;
    }
    return errors;
  };

  const [userExists, setUserExists] = useState(false);
  const handleBlurOfEmail = (e) => {
    const { value } = e.target;
    if (!regexPatterns.email.test(value)) return;
    fetch("http://localhost:8140/auth/getUserByEmailId?email=" + value)
      .then((response) => response.json())
      .then((data) => {
        if (data === true) {
          setError("User with this email already exists");
          setUserExists(true);
        } else {
          setError("");
          setUserExists(false);
        }
      })
      .catch((err) => {
        console.error("Error checking email:", err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(state.formData);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

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
          qid: formData.questions,
          question: securityQuestions.find(q => q.qid === formData.questions)?.question || ''
        }
      },
      fname: formData.fname,
      aadhaar: formData.aadhaar,
      lname: formData.lname,
      street: formData.street,
      cities: {
        cityid: formData.city,
        cityname: cities.find(c => c.cityid === formData.city)?.cityname || '',
        states: {
          stateid: formData.state,
          statename: statesfromdb.find(s => s.stateid === formData.state)?.statename || ''
        }
      },
      pincode: formData.pincode,
      dob: formData.dob
    };

    fetch("http://localhost:8140/auth/registerNewCustomer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newCustDetails)
    })
      .then((response) => response.json())
      .then((data) => {
        setSuccessMessage("Customer Registered Successfully!");
        setTimeout(() => navigate("/login"), 2000); 
        //navigate("/");
      })
      .catch((error) => {
        console.error("Error registering customer:", error);
        setError("Error Registering you");
      });
  };

  const validateForm = (formData) => {
    const errors = {};
    for (const key in formData) {
      if (regexPatterns[key] && !regexPatterns[key].test(formData[key])) {
        errors[key] = `Invalid ${key.replace(/([A-Z])/g, ' $1')}`;
      }
    }
    if (!formData.dob) {
      errors.dob = "Date of Birth is required.";
    }
    return errors;
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Customer Registration</h1>
        {successMessage && <p className="text-success">{successMessage}</p>}

        <form onSubmit={handleSubmit}>
          {error && <p className="text-danger">{error}</p>}

          {/* Fields are left as they are with onChange validation */}

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              id="email"
              className="form-control form-control-sm"
              value={state.formData.email}
              onChange={handleChange}
              onBlur={handleBlurOfEmail}
              required
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
              required
            />
            {formErrors.password && <p className="text-danger">{formErrors.password}</p>}
          </div>
          <div className="mb-3">
            <label>Contact Number</label>
            <input
              type="text"
              id="contact"
              className="form-control form-control-sm"
              value={state.formData.contact}
              onChange={handleChange}
              required
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
              required
            />
            {formErrors.fname && <p className="text-danger">{formErrors.fname}</p>}
          </div>
          <div className="mb-3">
            <label>Last Name</label>
            <input
              type="text"
              id="lname"
              className="form-control form-control-sm"
              value={state.formData.lname}
              onChange={handleChange}
              required
            />
            {formErrors.lname && <p className="text-danger">{formErrors.lname}</p>}
          </div>
          <div className="mb-3">
            <label>Date Of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              className="form-control form-control-sm"
              value={state.formData.dob}
              onChange={handleChange}
              required
            />
            {formErrors.dob && <p className="text-danger">{formErrors.dob}</p>}
          </div>
          <div className="mb-3">
            <label>Aadhaar</label>
            <input
              type="text"
              id="aadhaar"
              className="form-control form-control-sm"
              value={state.formData.aadhaar}
              onChange={handleChange}
              required
            />
            {formErrors.aadhaar && <p className="text-danger">{formErrors.aadhaar}</p>}
          </div>
          <div className="mb-3">
            <label>Street</label>
            <input
              type="text"
              id="street"
              className="form-control form-control-sm"
              value={state.formData.street}
              onChange={handleChange}
              required
            />
            {formErrors.street && <p className="text-danger">{formErrors.street}</p>}
          </div>
          <div className="mb-3">
            <label>State</label>
            <select
              id="state"
              className="form-select form-select-sm"
              value={state.formData.state}
              onChange={handleChange}
              required
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
              id="city"
              className="form-select form-select-sm"
              value={state.formData.city}
              onChange={handleChange}
              required
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
              required
            />
            {formErrors.pincode && <p className="text-danger">{formErrors.pincode}</p>}
          </div>
          <div className="mb-3">
            <label>Security Question</label>
            <select
              id="questions"
              className="form-select form-select-sm"
              value={state.formData.questions}
              onChange={handleChange}
              required
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
              required
            />
            {formErrors.securityqans && <p className="text-danger">{formErrors.securityqans}</p>}
          </div>
          <button type="submit" className="btn btn-primary" disabled={userExists}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}