import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'


function CountryDetails() {
    const { countryCode } = useParams()
    const navigate = useNavigate()
    const [country, setCountry] = useState(null)
    const [borderCountries, setBorderCountries] = useState([])
    const [visitCount, setVisitCount] = useState(0)
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
                const data = await response.json()
                setCountry(data[0])

                if (data[0]?.borders) {
                    const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha?codes=${data[0].borders.join(',')}`)
                    const borderData = await borderResponse.json();
                    setBorderCountries(borderData)
                }
                
                updateVisitCount()
            } catch (error) {
                console.error('Error fetching country:', error)
            }
        }

        fetchCountry()
    }, [countryCode])

    const updateVisitCount = async () => {
        // const countRef = ref(db, `visitCounts/${countryCode}`)
        // try {
        //     const snapshot = await get(countRef)
        //     const currentCount = snapshot.exists() ? snapshot.val() : 0
        //     await set(countRef, currentCount + 1)
        //     setVisitCount(currentCount + 1)
        // } catch (error) {
        //     console.error('Error updating visit count:', error)
        // }
    }


    const handleSave = async () => {
        // const savedRef = ref(db, `savedCountries/${countryCode}`)

        // try {
        //     const snapshot = await get(savedRef)
        //     if (!snapshot.exists()) {
        //         await set(savedRef, country)
        //     }
        //     setSaved(true)
        // } catch (error) {
        //     console.error('Error saving country:', error)
        // }
    }

    const handleBack = () => {
        navigate(-1)
    }

    if (!country) return <p>Loading country details...</p>;

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
                            <p><strong>Times Searched:</strong> {visitCount}</p>
                        </div>

                        {borderCountries.length > 0 && (
                            <div className="border-countries">
                                <h3>Border Countries:</h3>
                                <div className="borders-list">
                                    {borderCountries.map((borderCountry) => (
                                        <div key={borderCountry.cca3} className="border-item">
                                            <img src={borderCountry.flags?.png} alt={`${borderCountry.name.common} flag`} style={{ width: '50px', height: '30px', borderRadius: '5px' }} />
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

export default CountryDetails