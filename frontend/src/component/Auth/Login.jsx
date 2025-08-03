import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../Context/UserContext";
import toast from "react-hot-toast";
import Dashboard from "../Home/Dashboard";
import axios from "axios";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import "../../CSS/Auth.css"
  import '../../App.css';
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  }
  if(isAuthorized) return (<Navigate to={"/Dashboard"} />);
  

  return (
  <>
      <Box className="Box-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
        <div className="login-box">
          <TextField
          className="Text-input"
            type="email"
            label="Email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="standard" required />
          <TextField
          className="Text-input"
            type="password"
            label="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="standard" required />
            <Stack direction="row" spacing={2}>
          <Button className="button-signup" type="submit">Login</Button>
          </Stack>
          </div>
         
        </form>
         <p className="redirect-Link">
              Don't have an account?{" "}
              <Link to={"/register"} style={{ color: "#1de9b6", fontWeight: 400, }}>
                Register Now
              </Link>
            </p>

      </Box>
   </>
  );
};

export default Login;