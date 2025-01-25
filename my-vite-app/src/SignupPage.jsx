import React, { useState } from "react";

function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [company, setCompany] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [streetName, setStreetName] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    city: "",
    streetName: "",
    postalCode: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    termsAccepted: ""
  });

  const [showModal, setShowModal] = useState(false);

  const validate = () => {
    const newErrors = {};
    let formIsValid = true;

    if (!firstName) {
      newErrors.firstName = "First Name is required ";
      formIsValid = false;
    }
    if (!lastName) {
      newErrors.lastName = "Last Name is required ";
      formIsValid = false;
    }
    if (!city) {
      newErrors.city = "City is required ";
      formIsValid = false;
    }

    if (!streetName) {
      newErrors.streetName = "Street name is required ";
      formIsValid = false;
    }
    if (!postalCode) {
      newErrors.postalCode = "Postal Code is required ";
      formIsValid = false;
    } else if (!/^\d+$/.test(postalCode)) {
      newErrors.postalCode = "Postal Code must be a number ";
      formIsValid = false;
    }

    if (mobileNumber && !/^\d+$/.test(mobileNumber)) {
      newErrors.mobileNumber = "Mobile Number must be a number ";
      formIsValid = false;
    }

    if (!email) {
      newErrors.email = "E-mail is required ";
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid ";
      formIsValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required ";
      formIsValid = false;
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match ";
      formIsValid = false;
    }
    if (!termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms and conditions ";
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const userData = {
        firstName, lastName, city, postalCode, email, password, confirmPassword, company, termsAccepted
      };
      
      try {
        const response = await fetch("https://js2-ecommerce-api.vercel.app/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        const result = await response.json();

        console.log(response.status, response.statusText);
        if (response.ok) {
          setShowModal(true);
        } else {
          alert("There was an error registering the user");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error registering user.");
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>Please Register Your New Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="column">
          <label>First Name*</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          {errors.firstName && <span className="error">{errors.firstName}</span>}

          <label>Last Name*</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          {errors.lastName && <span className="error">{errors.lastName}</span>}

          <label>City*</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
          {errors.city && <span className="error">{errors.city}</span>}
          
          <label>Street Name*</label>
          <input type="text" value={streetName} onChange={(e) => setStreetName(e.target.value)} />
          {errors.streetName && <span className="error">{errors.streetName}</span>}

          <label>Postal Code*</label>
          <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
          {errors.postalCode && <span className="error">{errors.postalCode}</span>}

          <label>E-mail*</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <span className="error">{errors.email}</span>}

          <label>Mobile Number* (optional) </label>
          <input type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
          {errors.mobileNumber && <span className="error">{errors.mobileNumber}</span>}

          <label>Password*</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <span className="error">{errors.password}</span>}

          <label>Confirm Password*</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

          <label>Company (optional)</label>
          <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />

          <label>Upload Profile Image (optional)</label>
          <input type="file" />
        </div>

        <div className="terms-container">
          <input 
            type="checkbox" 
            checked={termsAccepted} 
            onChange={() => setTermsAccepted(!termsAccepted)} 
          />
          <label>I have read and accept the terms and agreements</label>
          {errors.termsAccepted && <span className="error">{errors.termsAccepted}</span>}
        </div>

        <button type="submit" disabled={!termsAccepted}>Submit</button>
      </form>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>User created successfully</h2>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignupPage;
