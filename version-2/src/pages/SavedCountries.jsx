import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProfileForm from '../components/ProfileForm'

function SavedCountries() {
    const [savedCountries, setSavedCountries] = useState([])
    const [formData, setFormData] = useState(null)
    const [formSubmitted, setFormSubmitted] = useState(false)

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('savedCountries')) || []
        setSavedCountries(saved);

        const profileData = JSON.parse(localStorage.getItem('profileData'))
        const isFormSubmitted = localStorage.getItem('formSubmitted')

        if (profileData) {
            setFormData(profileData)
        }
        if (isFormSubmitted) {
            setFormSubmitted(true)
        }
    }, [])

    const handleRemove = (countryCode) => {
        const updatedCountries = savedCountries.filter(
            (country) => country.cca3 !== countryCode
        )

        setSavedCountries(updatedCountries);
        localStorage.setItem('savedCountries', JSON.stringify(updatedCountries))
    }

    return (
        <div>
            {formSubmitted && formData?.fullName ? (
                <h2 className="welcome-message">Welcome, {formData.fullName}!</h2>
            ) : (
                <ProfileForm />
            )}

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
        </div>
    )
}

export default SavedCountries