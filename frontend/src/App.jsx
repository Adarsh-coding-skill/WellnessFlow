import { useState } from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MySessions from './component/Session/MySession'
import Login from './component/Auth/Login'
import Register from './component/Auth/Signup'
import { ContextProvider } from './component/Context/UserContext'
import Editor from './component/Session/EditorSession'
import Dashboard from './component/Home/Dashboard'
import Navbar from './component/layout/Navbar'
import MyDraftSessions from './component/Session/MyDraftSessions'
import MyPublishedSessions from './component/Session/MyPublishedSessions'

function App() {
  return (
    <>
     <ContextProvider>
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
  </ContextProvider>
    </>
  )
}

export default App
