

import React, { useState , useEffect } from "react";
import "./SignIn.css"; 
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/authSlice";
import { Link, useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("/api/login", {
        email: email,
        password: password,
        //role: "user", 
      });
      const user = response.data.userData; 
      const role = user.role;
      if (role === "admin") {
        // Redirect to admin dashboard
        dispatch(setUser({ user: user, role: "admin" }));
        navigate("/");
      } else if (role === "user") {
        // Set user role in Redux store and redirect to normal dashboard
        dispatch(setUser({ user: user, role: "user" }));
        navigate("/");
      } ;

    } catch (error) {
      const errorMessage = error.response.data.msg;
        toast.error(errorMessage);
    
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
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
        <button type="submit">Sign In</button>
        <p className="navigate">
        Not a User? <Link className="font-bold text-[#754224]" to="/signup">Sign Up</Link>
      </p>
      </form>
    </div>
  );
};

export default SignInPage;
