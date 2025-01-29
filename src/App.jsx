import { useState } from 'react'
import Home from './pages/Home.jsx'
import SavedCountries from './pages/SavedCountries.jsx'
import CountryDetails from './pages/CountryDetails.jsx'
import './App.css'
import Header from './components/Header.jsx'
import { Routes, Route } from 'react-router-dom'
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyDqcu3Pj7a01kJUEWjFQgqGiGxQVKvcGUc",
  authDomain: "countries-app-d8fa5.firebaseapp.com",
  projectId: "countries-app-d8fa5",
  storageBucket: "countries-app-d8fa5.firebasestorage.app",
  messagingSenderId: "569987568256",
  appId: "1:569987568256:web:d97e2a9b115bd6a0aecc65",
  measurementId: "G-M2329NVHGQ"
};

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)





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

export default App





