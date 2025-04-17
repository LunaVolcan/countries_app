import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header>
        <div className="header-text">
        <div className="where">
      <Link to="/"><h1>Where In The World?</h1></Link>
        </div>
      <nav>
      <ul>
        <li><p><Link to="/SavedCountries">Saved Countries</Link></p></li>
        <li>
         {/* <p>Dark Mode</p> */}
        </li>
      </ul>
      </nav>
      </div>
      </header>
    )
}

export default Header