import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProfileForm from '../components/ProfileForm'
import { getSavedCountries, getUserProfile } from '../services/api'

function SavedCountries() {
    const [savedCountries, setSavedCountries] = useState([]) // our saved variable is called savedCountries, it's inital value is an empty array. We call setSavedOuntries to update it's value.
    const [restCountries, setRestCountries] = useState([]) // state variable 
    const [connectedCountries, setConnectedCountries] = useState([]); // added new dstate variable to hold the connected countries
    const [formData, setFormData] = useState(null)
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [error, setError] = useState(null)

    // 
    // data coming from the RSET API
    // Data coming from the BE
    // Out put:
        // the data we are going to use to render the saved countries 
        //  country js object needs to have the country_code in it 
        // flag_url 
        // country_name
        // population

        // function connectCountryInfo() {
        //     return restCountries
        //         .filter((countryInfo) =>
        //             savedCountries.some((saved) => saved.common_name === countryInfo.name.common)
        //         )
        //         .map((countryInfo) => {
        //             const saved = savedCountries.find(
        //                 (s) => s.common_name === countryInfo.name.common
        //             );
        //             return {
        //                 ...countryInfo,
        //                 save_count: saved?.save_count || 0,
        //             };
        //         });
        // }

        function connectCountryInfo() {
            return restCountries
                .filter((countryInfo) =>
                    savedCountries.some(
                        (saved) =>
                            saved.common_name?.toLowerCase().trim() ===
                            countryInfo.name.common?.toLowerCase().trim()
                    )
                )
                .map((countryInfo) => {
                    const saved = savedCountries.find(
                        (s) =>
                            s.common_name?.toLowerCase().trim() ===
                            countryInfo.name.common?.toLowerCase().trim()
                    );
                    return {
                        ...countryInfo,
                        save_count: saved?.save_count || 0,
                    };
                });
        }
    // I have to create an array that that holds  the objects that I want to be filtered out 
    // I have to synch eveyrthing up through the common name (common denominator between the APIs)
    // I need to  figure out how to pull the objects form the array 

    // filter down all the API countries based whether those countries common names have been saved 
    // the for loop is needed so we cna go through the saved coutntries and check if any of the saved countries have a name that matches the common name of the REST countries API countries 
    
    // I need to filter which countires have been saved soeicifally by their commons names 
    // The for loop will fcheck if any of the saved countries match the common names of the REST countries API

    useEffect(() => {
        const fetchSavedCountries = async () => { // Created function
          try {
            const response = await fetch("http://localhost:3000/get-saved-countries"); // Fetching information from local host (backend)
            const data = await response.json(); // Data that is being fetched from BE is being formatted into JSON
            console.log("Saved countries data error", data) // Console logging data 
            setSavedCountries(data);  // Putting this inforamtion into the empty state variable 
          } catch (err) {
            console.error("Error fetching saved countries:", err);
          }
        }  
        const fetchRestCountries = async () => { // Function
            try {
                const response = await fetch (
                    `https://restcountries.com/v3.1/all ` // Thie fetches the information from the REST API Countries
                );
                const data = await response.json(); // Turning the data that is fetched from the REST API into JSON
                setRestCountries(data); // Putting this information into the state variable 
                console.log("REST Api data", data);
            } catch (err) {
                console.error("Error fetch REST Countries API", err)
            }
        }
        fetchSavedCountries();
        fetchRestCountries();
    }, []);

    useEffect(() => {
        if (savedCountries.length > 0 && restCountries.length > 0) {
            const result = connectCountryInfo(); // this is returning  the connectd countries that are the same
            setConnectedCountries(result); // setting connectedCountrires vairiables to equal the result of the connectedCountryInfo function
        }
    }, [savedCountries, restCountries]);
    

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

            {connectedCountries.length > 0 ? (
                <ul className="saved-countries-list">
                    {connectedCountries.map((country) => (
                        console.log("Connected countries", country),
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
                                <p>Population: {country.population.toLocaleString()}</p>
                            </Link>
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