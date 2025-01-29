import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getDatabase, ref, set, get, increment } from 'firebase/database'

function CountryDetails() {
    const { countryCode } = useParams()
    const navigate = useNavigate()
    const db = getDatabase()
    const [country, setCountry] = useState(null)
    const [borderCountries, setBorderCountries] = useState([])
    const [saved, setSaved] = useState(false)
    const [saveCount, setSaveCount] = useState(null)

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
                const data = await response.json()
                setCountry(data[0])

                if (data[0]?.borders) {
                    const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha?codes=${data[0].borders.join(',')}`)
                    const borderData = await borderResponse.json()
                    setBorderCountries(borderData)
                }

                // Get save count from Firebase
                const countSnapshot = await get(ref(db, `countrySaveCounts/${countryCode}`))
                if (countSnapshot.exists()) {
                    setSaveCount(countSnapshot.val())
                }
            } catch (error) {
                console.error('Error fetching country:', error)
            }
        }

        fetchCountry();
    }, [countryCode, db])

    const handleSave = async () => {
        if (!country) return

        const countryRef = ref(db, `savedCountries/${country.cca3}`)
        const countRef = ref(db, `countrySaveCounts/${country.cca3}`)

        try {
            await set(countryRef, {
                name: country.name?.common || 'Unknown',
                cca3: country.cca3,
                flags: country.flags?.png || country.flags?.svg || ''
            })

            await set(countRef, (saveCount || 0) + 1)
            setSaveCount((prev) => (prev || 0) + 1)
            setSaved(true)
        } catch (error) {
            console.error("Error saving country:", error)
        }
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
                    <img src={country.flags?.png} alt={`${country.name?.common} flag`} className="country-flag" />
                    <div className="info-borders">
                        <div className="country-info">
                            <h1>{country.name?.common}</h1>
                            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                            <p><strong>Region:</strong> {country.region}</p>
                            <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
                            {saveCount !== null && <p><strong>Times Saved:</strong> {saveCount}</p>}
                        </div>

                        {borderCountries.length > 0 && (
                            <div className="border-countries">
                                <h3>Border Countries:</h3>
                                <div className="borders-list">
                                    {borderCountries.map((borderCountry) => (
                                        <div key={borderCountry.cca3} className="border-item">
                                            <img src={borderCountry.flags?.png} alt={`${borderCountry.name.common} flag`} width="50" height="30" />
                                            <p>{borderCountry.name.common}</p>
                                        </div>
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

export default CountryDetails;