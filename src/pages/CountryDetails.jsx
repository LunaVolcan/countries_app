import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function CountryDetails() {
    const { countryCode } = useParams();
    const [country, setCountry] = useState(null)

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const response = await fetch(
                    `https://restcountries.com/v3.1/alpha/${countryCode}`
                );
                const data = await response.json()
                setCountry(data[0])
            } catch (error) {
                console.error('Error fetching country:', error)
            }
        };

        fetchCountry();
    }, [countryCode]);

    if (!country) return <p>Loading country details...</p>

    return (
        <div>
            <h1>{country.name?.common}</h1>
            <img
                src={country.flags?.png}
                alt={`${country.name?.common} flag`}
                style={{ width: '200px' }}
            />
            <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Subregion:</strong> {country.subregion}</p>
            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
            <p><strong>Languages:</strong> {Object.values(country.languages || {}).join(', ')}</p>
        </div>
    )
}

export default CountryDetails