import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/pages/home/Home'
import Workspace from './components/pages/workspace/Workspace'
import Profile from './components/pages/profile/Profile'
import Auth from './components/pages/auth/Auth'
import Finder from './components/pages/search/Finder'
import Planner from './components/pages/profile/planner/Planner'
import CreateProfile from './components/pages/profile/createProfile/CreateProfile'
import JobDetail from './components/pages/jobs/JobDetail'
import CompanyDetail from './components/pages/companies/CompanyDetail'
import InvoiceGenerator from './components/pages/invoices/InvoiceCreate'
import TopNav from './components/layout/TopNav'
import PublicProfile from './components/pages/profile/publicprofile/PublicProfile'


function App() {
  const [selectedPage, setSelectedPage] = useState('')
  const [profileData, setProfileData] = useState({})

  return (
    <BrowserRouter>
      <TopNav setSelectedPage={setSelectedPage} profileData={profileData} setProfileData={setProfileData} />
      <Routes>
        <Route path='/' element={<Home setSelectedPage={setSelectedPage} />} />
        <Route path='/workspace' element={<Workspace />} />
        <Route path='/find' element={<Finder profileData={profileData} />} />
        <Route path='/planner' element={<Planner />} />
        <Route path='/createprofile' element={<CreateProfile />} />
        <Route path='/profile' element={<Profile profileData={profileData} setProfileData={setProfileData} />} />
        <Route path='/profile/:userId' element={<PublicProfile />} />
        <Route path='/auth' element={<Auth selectedPage={selectedPage} setSelectedPage={setSelectedPage} />} />
        <Route path='/jobs/:id' element={<JobDetail profileData={profileData} />} />
        <Route path='/companies/:id' element={<CompanyDetail profileData={profileData} />} />
        <Route path='/invoicegenerator' element={<InvoiceGenerator />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
