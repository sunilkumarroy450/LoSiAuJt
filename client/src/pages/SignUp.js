import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const SignUp = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const signupInfoInstance = { ...signupInfo };
    signupInfoInstance[name] = value;
    setSignupInfo(signupInfoInstance);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(signupInfo);
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("Name ,Email and Password are required.");
    }
    try {
      const url = "https://lo-si-au-jt.vercel.app/auth/user/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();

      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const errMsg = error?.details?.[0]?.message;
        handleError(errMsg);
      } else if (!success) {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            autoFocus
            placeholder="Enter your name..."
            onChange={handleChange}
            value={signupInfo.name}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            autoFocus
            placeholder="Enter your email..."
            onChange={handleChange}
            value={signupInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            autoFocus
            placeholder="Enter your password..."
            onChange={handleChange}
            value={signupInfo.password}
          />
        </div>
        <button type="submit">Signup</button>
        <span>
          Already have an account ?<Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
