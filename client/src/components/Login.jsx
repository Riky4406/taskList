import React, { useState } from "react";
import service from "../service.js";
import { useNavigate } from "react-router-dom";
// import "./DesignPage.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await service.login(username, password);
      console.log("Login response:", response);
      if (response && response.token) {
        localStorage.setItem("token", response.token);
        navigate("/tasks");
      } else {
        navigate("/Register");
      }
    } catch (err) {
      console.error("Login failed with error:", err);
    }
  };
  return (
    <>
      <header className="app-header">
        <svg
          className="logo2"
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
              <stop
                offset="0%"
                style={{ stopColor: "#007BFF", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#00C853", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
        </svg>
      </header>

      <section className="todoapp">
        <header className="header">
          <h1>Login </h1>
        </header>
        <section className="main">
          <input
            className="new-todo"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="new-todo"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="new-todo"
            style={{ cursor: "pointer" }}
            onClick={handleLogin}
          >
            Login
          </button>
          <p>
            Don't have an account? <a href="/register">Register here</a>.
          </p>
        </section>
      </section>
    </>
  );
};
//   return (
//     <div>

//     <div className="auth-form">

//       <h1>Login</h1>

//       <form onSubmit={handleLogin}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button onClick={handleLogin} type="submit">
//           Login
//         </button>
//       </form>
//       <p>
//         Don't have an account? <a href="/register">Register here</a>.
//       </p>
//     </div>
//     </div>
//   );
// };

export default Login;
