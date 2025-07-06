import { useState } from 'react'

import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Loginpage from './pages/Login'
import Home from './pages/Home'
import FindTeacher from './pages/FindTeacher'
import MentorDetails from './pages/MentorDetails'
function App() {
  
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Loginpage/>} />
          <Route path="/find-teacher" element={<FindTeacher/>} />
          <Route path="/enroll-teacher" element={<h1>Enroll as Teacher Page</h1>} />
          <Route path="/mentor/:id" element={<MentorDetails />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
