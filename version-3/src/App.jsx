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
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
  databaseURL: import.meta.env.VITE_DATABASE_URL
};

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)


console.log(firebaseConfig)


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





