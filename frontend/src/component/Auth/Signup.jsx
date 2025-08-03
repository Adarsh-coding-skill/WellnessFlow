import React, { useState } from "react";
import { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../Context/UserContext";
import Dashboard from "../Home/Dashboard";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "../../CSS/auth.css"
  import '../../App.css';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthorized, setIsAuthorized } = useContext(Context);

const handleRegister = async (e) => {
    e.preventDefault();
try {
  const {data} = await axios.post(
 "https://wellnessflow-backend.onrender.com/api/v1/user/register",
 { name, email, password},
 {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
 }
  );
toast.success(data.message);
  setName("");
  setEmail("");
  setPassword("");
  setIsAuthorized(true);
}catch(error){
  toast.error(error?.response?.data?.message || "Registration failed");
}
};
    if(isAuthorized){
      return <Navigate to={"/Dashboard"}/>
    }


  return (
  
    <Box className="Box-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
      <div className="login-box">
        <TextField className="Text-input" label="Name"  type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <TextField className="Text-input" label="Email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <TextField className="Text-input" label="Password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="button-signup" type="submit">Register</button>
         </div>
      </form>
     <p className="redirect-Link">
             Already have an account?{" "}
              <Link to={"/"} style={{ color: "#1de9b6", fontWeight: 400 }}>
                Login Now
              </Link>
            </p>
    </Box>
    
  );
};

export default Register;