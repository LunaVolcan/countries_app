import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProfileForm from '../components/ProfileForm'
import { getDatabase, ref, get, remove } from 'firebase/database'

function SavedCountries() {
    const [savedCountries, setSavedCountries] = useState([])
    const [formData, setFormData] = useState(null)
    const [formSubmitted, setFormSubmitted] = useState(false)
    const db = getDatabase()

    useEffect(() => {
        const fetchSavedCountries = async () => {
            const savedCountriesRef = ref(db, 'savedCountries')
            try {
                const snapshot = await get(savedCountriesRef)
                if (snapshot.exists()) {
                    const countriesData = snapshot.val();
                    const filteredCountries = Object.values(countriesData).filter(
                        country => country.name && country.cca3 && country.flags
                    );
                    setSavedCountries(filteredCountries)
                }
            } catch (error) {
                console.error("Error fetching saved countries:", error)
            }
        }

        const fetchProfileData = async () => {
            const profileRef = ref(db, 'users/profileData')
            try {
                const snapshot = await get(profileRef)
                if (snapshot.exists()) {
                    setFormData(snapshot.val())
                    setFormSubmitted(true)
                }
            } catch (error) {
                console.error("Error fetching profile data:", error)
            }
        }

        fetchSavedCountries()
        fetchProfileData()
    }, [db])

    const handleRemove = async (countryCode) => {
        try {
            await remove(ref(db, `savedCountries/${countryCode}`))
            setSavedCountries((prev) => prev.filter((country) => country.cca3 !== countryCode))
        } catch (error) {
            console.error("Error removing country:", error)
        }
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
                            <Link to={`/country/${country.cca3}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <img src={country.flags} alt={`${country.name} flag`} className="saved-country-flag" />
                                <p>{country.name}</p>
                            </Link>
                            <button className="remove-button" onClick={() => handleRemove(country.cca3)}>Remove</button>
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