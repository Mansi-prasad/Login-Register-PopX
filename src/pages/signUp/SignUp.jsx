import React, { useState } from "react";
import "./SignUp.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    companyName: "",
    agency: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };
  const handleRadioChange = (e) => {
    setUserData((prev) => ({ ...prev, agency: e.target.value }));
  };
  const validate = () => {
    const { fullName, email, password, phone, companyName, agency } = userData;
    if (!fullName || !email || !password || !phone || !companyName || !agency) {
      toast.error("Please fill all the required field.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email.");
      return false;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      toast.error("Phone number must be 10 digits.");
      return false;
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const User = JSON.parse(localStorage.getItem("users")) || {};
    if (User[userData.email]) {
      toast.error("Email Already exists.");
    }
    // save the user
    User[userData.email] = userData;
    localStorage.setItem("users", JSON.stringify(User));
    localStorage.setItem("currentUser", userData.email);
    toast.success("Account created successfully!");
    navigate("/profile");
    setUserData({
      fullName: "",
      email: "",
      password: "",
      phone: "",
      companyName: "",
      agency: "",
    });
  };
  return (
    <div className="create-account-wrapper">
      <div className="head">
        <h1 className="title">
          Create your <br /> PopX account
        </h1>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <fieldset className="form-group">
            <legend>
              Full Name <span className="required">*</span>
            </legend>
            <input
              type="text"
              name="fullName"
              value={userData.fullName}
              placeholder="Marry doe"
              onChange={handleChange}
              required
            />
          </fieldset>
          <fieldset className="form-group">
            <legend>
              Phone number <span className="required">*</span>
            </legend>
            <input
              type="text"
              name="phone"
              value={userData.phone}
              placeholder="8787676767"
              onChange={handleChange}
              required
            />
          </fieldset>
          <fieldset className="form-group">
            <legend>
              Email address <span className="required">*</span>
            </legend>
            <input
              type="text"
              name="email"
              value={userData.email}
              placeholder="marry@mail.com"
              onChange={handleChange}
              required
            />
          </fieldset>
          <fieldset className="form-group">
            <legend>
              Password <span className="required">*</span>
            </legend>
            <input
              type="text"
              name="password"
              value={userData.password}
              placeholder="Enter password"
              onChange={handleChange}
              required
            />
          </fieldset>
          <fieldset className="form-group">
            <legend>
              Company name<span className="required">*</span>
            </legend>
            <input
              type="text"
              name="companyName"
              value={userData.companyName}
              placeholder="Enter company name"
              onChange={handleChange}
              required
            />
          </fieldset>
          <div className="agency">
            <label>
              Are you an Agency? <span className="required">*</span>
            </label>
            <div className="radio-options">
              <label htmlFor="agency-yes">
                <input
                  type="radio"
                  id="agency-yes"
                  value="yes"
                  name="agency"
                  checked={userData.agency === "yes"}
                  required
                  onChange={handleRadioChange}
                />
                Yes
              </label>
              <label htmlFor="agency-no">
                <input
                  type="radio"
                  id="agency-no"
                  value="no"
                  name="agency"
                  checked={userData.agency === "no"}
                  required
                  onChange={handleRadioChange}
                />
                No
              </label>
            </div>
          </div>
          <div className="bottom-container">
            <button className="submit-button">Create Account</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
