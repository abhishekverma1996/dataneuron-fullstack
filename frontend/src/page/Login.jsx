import React, { useState } from "react";
import "./form.css"; // Import your CSS file
import axios from 'axios';
import { useAuth } from "../AuthContext";

export const Login = ({ setRegistered }) => {
  const { token, login, logout, setUserDetails, setApiCountData } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginSuccess, setIsLoginSuccess] = useState(false); // Track login success

  const apiUrl = "https://dataneuron-backend-8628.onrender.com/user/login";

  const formData = {
    email,
    password
  };
  let responseStatus = 0
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic (can include authentication API calls)
    console.log(formData);
    try {
      const response = await axios.post(apiUrl, formData);
      console.log("Response:", response.data);
      if(response.status === 200){
        login(response.data.token);
        console.log("token", token);
        setUserDetails(response.data.user);
        setApiCountData(response.data.count);
        setIsLoginSuccess(true); // Set login success to true
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login </button>
      </form>
      {isLoginSuccess && <p style={{ color: 'green' }}>User registered successfully!</p>} {/* Display message if login is successful */}
      <p style={{color:'red'}}>{responseStatus === 200 ? "Wrong credential" : ""}</p>
      <p onClick={() => setRegistered(true)}>{`Not a user "Register"`}</p>
    </div>
  );
};
