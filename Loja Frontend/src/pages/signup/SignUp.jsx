

import React, { useState } from "react";
import axios from "axios";
import "./SignUp.css"; 
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";


const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("/api/signup", {
        name: fullName,
        email: email,
        password: password,
        role: "user", 
      });
      const message = response.data.msg; 
      toast.success(message);
      navigate('/login');
    } catch (error) {
      const errorMessage = error.response.data.msg;
        toast.error(errorMessage);
    }
  };

  return (
    
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
        <p className="navigate">
        Already a User? <Link className="font-bold text-[#754224]" to="/login">Login</Link>
      </p>
      </form>
      
    </div>
    
  );
};

export default SignupPage;
