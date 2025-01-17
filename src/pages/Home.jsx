import SearchBar from '../components/SearchBar'
import Card from '../components/CountryCard'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Home() {
    const [countries, setCountries] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const apiUrl = 'https://restcountries.com/v3.1/all'
    const navigate = useNavigate()

    const fetchCountries = async () => {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setCountries(data)
            })
            .catch((error) => console.log('Error: ' + error.message))
    }

    useEffect(() => {
        fetchCountries();
    }, [])

    const filteredCountries = countries.filter((country) =>
        country.name?.common.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleSearch = () => {
        const matchedCountry = countries.find(
            (country) =>
                country.name?.common.toLowerCase() === searchTerm.toLowerCase()
        )

        if (matchedCountry) {
            navigate(`/country/${matchedCountry.cca3}`)
        } else {
            alert('Country not found! Please check your search term.')
        }
    }

    return (
        <>
            <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onSearch={handleSearch} 
            />

                 {filteredCountries.map((country) => {
                return (
                    <Link
                        to={`/country/${country.cca3}`}
                        key={country.cca3}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <div className="countries-grid">

                        <Card
                            flag={country.flags?.png || ''}
                            country={country.name?.common || 'Unknown'}
                            population={country.population}
                            region={country.region}
                            capital={country.capital?.[0] || 'N/A'}
                        />
                      </div>
                    </Link>
                )
            })}
        </>
    )
}

export default Home