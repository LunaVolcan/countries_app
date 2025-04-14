import { useState } from 'react'
import Home from './pages/Home.jsx'
import SavedCountries from './pages/SavedCountries.jsx'
import CountryDetails from './pages/CountryDetails.jsx'
import './App.css'
import Header from './components/Header.jsx'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
<Header />
<Routes>
    <Route path="/" element={<Home />} />
    <Route path="/SavedCountries" element={<SavedCountries />} />
    <Route path="/country/:countryCode" element={<CountryDetails />} />
  </Routes>
  </>
  )
}

export default App;





