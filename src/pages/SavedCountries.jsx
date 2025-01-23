import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProfileForm from '../components/ProfileForm'

function SavedCountries() {
    const [savedCountries, setSavedCountries] = useState([])
    const [showForm, setShowForm] = useState(true)

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('savedCountries')) || []
        setSavedCountries(saved)

        const formSubmitted = localStorage.getItem('formSubmitted')
        setShowForm(!formSubmitted)
    }, [])

    const handleRemove = (countryCode) => {
        const updatedCountries = savedCountries.filter(
            (country) => country.cca3 !== countryCode
        )

        setSavedCountries(updatedCountries)
        localStorage.setItem('savedCountries', JSON.stringify(updatedCountries))
        // No alert or pop-up here
    }
    return (
        <div>
            {savedCountries.length > 0 ? (
                <ul className="saved-countries-list">
                    {savedCountries.map((country) => (
                        <li key={country.cca3} className="saved-country-item">
                            <Link
                                to={`/country/${country.cca3}`}
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <img
                                    src={country.flags?.png}
                                    alt={`${country.name.common} flag`}
                                    className="saved-country-flag"
                                />
                                <p>{country.name.common}</p>
                            </Link>

                            <button
                                className="remove-button"
                                onClick={() => handleRemove(country.cca3)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No countries saved yet!</p>
            )}

            {showForm && (
                <div>
                    <h2>My Profile</h2>
                    <ProfileForm />
                </div>
            )}
        </div>
    )
}

export default SavedCountries