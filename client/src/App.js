import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/pages/home/Home'
import Workspace from './components/pages/Workspace/Workspace'
import Profile from './components/pages/profile/Profile'
import Auth from './components/pages/auth/Auth'
import Navbar from './components/layout/Navbar'
import Finder from './components/pages/search/Finder'
import Planner from './components/pages/planner/Planner'
import CreateProfile from './components/pages/profile/CreateProfile'
import JobDetail from './components/pages/jobs/JobDetail'


function App() {
  // const [auth, setAuth] = useState({ isAuthenticated: false })
  const [selectedPage, setSelectedPage] = useState('')

  return (
    <BrowserRouter>
      <Navbar setSelectedPage={setSelectedPage} />
      <Routes>
        <Route path='/' element={<Home setSelectedPage={setSelectedPage} />} />
        <Route path='/workspace' element={<Workspace />} />
        <Route path='/find' element={<Finder />} />
        <Route path='/planner' element={<Planner />} />
        <Route path='/createprofile' element={<CreateProfile />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/auth' element={<Auth selectedPage={selectedPage} setSelectedPage={setSelectedPage} />} />
        <Route path='/jobs/:id' element={<JobDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
