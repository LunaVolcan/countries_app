import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProfileForm from '../components/ProfileForm'
import { getSavedCountries, getUserProfile } from '../services/api'

function SavedCountries() {
    const [savedCountries, setSavedCountries] = useState([])
    const [formData, setFormData] = useState(null)
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchSavedCountries = async () => {
          try {
            const response = await fetch("http://localhost:3000/get-saved-countries");
            const data = await response.json();
            setSavedCountries(data);
          } catch (err) {
            console.error("Error fetching saved countries:", err);
          }
        };

       //connect to backend 
    //backend will likely save me the whole data table from saved_countrie (SQL)
    // common name is what REST api and BE both have in common
    // Fetch 
    // function to connect BE and API
    // 




    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const countriesData = await getSavedCountries()
    //             setSavedCountries(countriesData)

    //             // Fetch profile data
    //             const profileData = await getUserProfile()
    //             if (profileData?.full_name) { 
    //                 setFormData(profileData)
    //                 setFormSubmitted(true)
    //             }
    //         } catch (error) {
    //             console.error('Error fetching data:', error)
    //             setError('Failed to load data. Please try again later.')
    //         }
    //     }

    //     fetchData()
    // }, [])

    // const handleRemove = async (countryCode) => {
    //     try {
    //         await fetch(`http://localhost:3000/delete-country/${countryCode}`, {
    //             method: 'DELETE'
    //         })

    //         setSavedCountries(savedCountries.filter((country) => country.country_code !== countryCode))
    //     } catch (error) {
    //         console.error('Error removing country:', error)
    //         setError('Failed to remove country. Please try again later.')
    //     }
    // }

    if (error) return <div className="error-message">{error}</div>

    return (
        <div className="saved-countries-container">
            {formSubmitted && formData?.full_name ? ( 
                <h2 className="welcome-message">Welcome, {formData.full_name}!</h2> 
            ) : (
                <ProfileForm />
            )}

            {savedCountries.length > 0 ? (
                <ul className="saved-countries-list">
                    {savedCountries.map((country) => (
                        <li key={country.country_code} className="saved-country-item">
                            <Link
                                to={`/country/${country.country_code}`}
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <img
                                    src={country.flag_url}
                                    alt={`${country.country_name} flag`}
                                    className="saved-country-flag"
                                />
                                <p>{country.country_name}</p>
                            </Link>

                            <button
                                className="remove-button"
                                onClick={() => handleRemove(country.country_code)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-countries-message">No countries saved yet!</p>
            )}
        </div>
    )
}

export default SavedCountries;