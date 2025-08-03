import React, { useState, useContext, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MySessions from './component/Session/MySession';
import Login from './component/Auth/Login';
import Register from './component/Auth/Signup';
import { Context, ContextProvider } from './component/Context/UserContext';
import Editor from './component/Session/EditorSession';
import Dashboard from './component/Home/Dashboard';
import Navbar from './component/layout/Navbar';
import MyDraftSessions from './component/Session/MyDraftSessions';
import MyPublishedSessions from './component/Session/MyPublishedSessions';
import axios from 'axios';

const AppRoutes = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://wellnessflow-backend.onrender.com/api/v1/user/getuser", {
          withCredentials: true,
        });
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-sessions/drafts" element={<MyDraftSessions />} />
        <Route path="/my-sessions/published" element={<MyPublishedSessions />} />
        <Route path="/my-sessions" element={<MySessions />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/editor/:id" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  );
};

function App() {
  return (
    <ContextProvider>
      <AppRoutes />
    </ContextProvider>
  );
}

export default App;
