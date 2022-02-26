import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/pages/home/Home'
import Planner from './components/pages/Planner'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/planner' element={<Planner />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
