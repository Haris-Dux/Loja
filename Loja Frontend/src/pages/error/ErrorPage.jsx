import React from "react";
import { NavLink } from "react-router-dom";
import "./ErrorPage.css";

const roueVariants = {
  initial: {
    y: "100vh",
  },
  visible: {
    y: 0,
    transition: {
      type: "spring",
      mass: 0.4,
    },
  },
  exit: {
    y: "-100vh",
    opacity: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const ErrorPage = () => {
  return (
    <div>
      <div className="error-container">
        <div className="error">
          <h1>404</h1>
          <p>Page Does Not Exit</p>
          <button>
            <NavLink to="/" className="btn">
              Home
            </NavLink>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
