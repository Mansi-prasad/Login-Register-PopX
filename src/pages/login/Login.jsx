import React, { useState } from "react";
import "./Login.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    if (!email || !password) {
      toast.error("Please enter email and password.");
      return;
    }
    const user = JSON.parse(localStorage.getItem("users")) || {};
    const userCheck = user[email];
    if (!userCheck) {
      toast.error("User not found.Please Register");
      return;
    }
    if (userCheck.password !== password) {
      toast.error("Incorrect password.");
      return;
    }
    localStorage.setItem("currentUser", email);
    toast.success("Login successfully!");
    navigate("/profile");
  };
  return (
    <div className="login-wrapper">
      <div className="head">
        <p className="login-title">
          Sign in to your <br /> PopX account
        </p>
      </div>
      <div className="description">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit doloremque
          fuga minus in?
        </p>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <fieldset className="form-group">
            <legend>
              Email address <span className="required">*</span>
            </legend>
            <input
              type="text"
              name="email"
              value={loginData.email}
              placeholder="marry@mail.com"
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="form-group">
            <legend>
              Password <span className="required">*</span>
            </legend>
            <input
              type="password"
              name="password"
              value={loginData.password}
              placeholder="Enter password"
              onChange={handleChange}
            />
          </fieldset>
          <div className="btn-container">
            <button className="loginbtn">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
