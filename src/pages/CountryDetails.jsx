import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function CountryDetails() {
    const { countryCode } = useParams()
    const navigate = useNavigate()
    const [country, setCountry] = useState(null)
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const response = await fetch(
                    `https://restcountries.com/v3.1/alpha/${countryCode}`
                )
                const data = await response.json()
                setCountry(data[0])
            } catch (error) {
                console.error('Error fetching country:', error)
            }
        }

        fetchCountry()
    }, [countryCode])

    const handleSave = () => {
        setSaved(!saved)
    }

    const handleBack = () => {
        navigate(-1)
    }

    if (!country) return <p>Loading country details...</p>

    return (
        <div className="country-container">
        <div className="country-details">

            <button className="back-button" onClick={handleBack}>
                <span>&larr;</span> Back
            </button>

            <div className="details-container">
                <img
                    src={country.flags?.png}
                    alt={`${country.name?.common} flag`}
                    className="country-flag"
                />
                <div className="info-borders">
                <div className="country-info">
                    <h1>{country.name?.common}</h1>
                    <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                    <p><strong>Region:</strong> {country.region}</p>
                    <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p> 
                </div>

                {country.borders && (
                <div className="border-countries">
                    <h3>Border Countries:</h3>
                    <div className="borders-list">
                        {country.borders.map((border) => (
                            <span key={border} className="border-item">
                                {border}
                            </span>
                        ))}

                    </div>
                </div>
            )}
            </div>
            </div>
            <button className="save-button" onClick={handleSave}>
                        {saved ? 'Saved' : 'Save'}
                    </button>
        </div>
        </div>
    )
}

export default CountryDetails