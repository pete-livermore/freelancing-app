import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/pages/home/Home'
import Workspace from './components/pages/Workspace/Workspace'
import Profile from './components/pages/Profile'
import Register from './components/pages/Register'
import Navbar from './components/layout/Navbar'
import Finder from './components/pages/discover/Finder'
import Dashboard from './components/pages/Dashboard'
import Planner from './components/planner/Planner'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/workspace' element={<Workspace />} />
        <Route path='/find' element={<Finder />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/planner' element={<Planner />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
