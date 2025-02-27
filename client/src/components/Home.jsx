import React from "react";
import { useNavigate } from "react-router-dom";
import "./DesignPage.css";

export const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/Login");
  };
  const handleRegister = () => {
    navigate("/Register");
  };

  return (
    <>
    <div className="home-page">
      <div>
      <header class="app-header1">
          <svg
      className="logo"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* <!-- עיגול רקע --> */}
      <circle cx="50" cy="50" r="45" fill="url(#gradient)" />

      {/* <!-- סימן ה-V --> */}
      <path
        d="M30 50 L45 65 L70 35"
        stroke="white"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />

      {/* <!-- הגדרת גרדיאנט צבעים --> */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#007BFF", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#00C853", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
    </svg>
    </header>
    <h1 class="title1">Your Tasks, Your Way.</h1>
    </div>
      <div className="button-container">
        <button onClick={handleLogin} className="button">
          Login
        </button>
        <button onClick={handleRegister} className="button">
          Register
        </button>
      </div>
    </div>
    </>
  );
};
export default Home;