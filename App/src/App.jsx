import { useState } from 'react'


import './App.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import CreateCard from './pages/CreateCard'
import Cardtable from './pages/Cardtable'
import EditCard from './pages/EditCard'
import Layout from './components/Layout'



function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='create' element={<CreateCard />} />
          <Route path="list" element={<Cardtable />} />
          <Route path="/edit/:id" element={<EditCard />} />
        </Routes>
      </Layout>
    </div>
  )
}

export default App