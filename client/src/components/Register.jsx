import React, { useState } from "react";
import service from "../service.js";
import { useNavigate } from "react-router-dom";
// import "./DesignPage.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting registration:", { username, password });

      // קריאת ה-API להרשמה
      const response = await service.register(username, password);
      console.log("Registration response:", response);

      // בדיקה אם ההרשמה הצליחה
      if (response && response.token) {

        alert("User registered successfully");
        localStorage.setItem("token", response.token); // שמירה בטוקן הנכון
        navigate("/tasks");
      } else {
        navigate("/Login");
      }
    } catch (error) {
      alert("Registration failed! Please try again.");
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
          <h1>Register</h1>
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
            onClick={handleRegister}
          >
            Register
          </button>
          <p>
            Do have an account? <a href="/Login">Login here</a>.
          </p>
        </section>
      </section>
    </>
  );
}

// return (
//     <div>
//       {/* logo */}
//       <svg
//         className="logo2"
//         viewBox="0 0 100 100"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         {/* <!-- עיגול רקע --> */}
//         <circle cx="50" cy="50" r="45" fill="url(#gradient)" />

//         {/* <!-- סימן ה-V --> */}
//         <path
//           d="M30 50 L45 65 L70 35"
//           stroke="white"
//           strokeWidth="8"
//           fill="none"
//           strokeLinecap="round"
//         />

//         {/* <!-- הגדרת גרדיאנט צבעים --> */}
//         <defs>
//           <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop
//               offset="0%"
//               style={{ stopColor: "#007BFF", stopOpacity: 1 }}
//             />
//             <stop
//               offset="100%"
//               style={{ stopColor: "#00C853", stopOpacity: 1 }}
//             />
//           </linearGradient>
//         </defs>
//       </svg>
//       <div className="auth-form">
//         <h2>Register</h2>

//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button onClick={handleRegister}>Register</button>
//       </div>
//     </div>
//   );
// }

export default Register;
