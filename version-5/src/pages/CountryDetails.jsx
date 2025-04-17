import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function CountryDetails() {
  const { countryCode } = useParams(); // Get country code from URL
  const navigate = useNavigate();

  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [saveCount, setSaveCount] = useState(0);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        const data = await response.json();
        const countryData = data[0];
        setCountry(countryData);

        // fetch border countries if they exist
        if (countryData?.borders?.length) {
          const borderResponse = await fetch(
            `https://restcountries.com/v3.1/alpha?codes=${countryData.borders.join(',')}`
          );
          const borderData = await borderResponse.json();
          setBorderCountries(borderData);
        }

        // fetch visit/save count
        fetchSaveCount(countryData.name.common);
        // check if country is already saved
        checkIfAlreadySaved(countryData.name.common);

      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchCountry();
  }, [countryCode]);

  const fetchSaveCount = async (commonName) => {
    try {
      const response = await fetch(`https://countries-app-lfcu.onrender.com/get-save-count/${commonName}`);
      const data = await response.json();
      setSaveCount(data.save_count || 0);
    } catch (error) {
      console.error('Error fetching save count:', error);
    }
  };

  const checkIfAlreadySaved = async (commonName) => {
    try {
      const response = await fetch('https://countries-app-lfcu.onrender.com/get-saved-countries');
      const savedData = await response.json();
      const alreadySaved = savedData.some(c => c.common_name === commonName);
      setSaved(alreadySaved);
    } catch (error) {
      console.error('Error checking if country is already saved:', error);
    }
  };

  const handleSave = async () => {
    if (!country || saved) return;

    const payload = {
      country_code: country.cca3,
      common_name: country.name.common,
      flag_url: country.flags?.png || '',
    };

    try {
      // save to saved_countries table
      const saveRes = await fetch('https://countries-app-lfcu.onrender.com/add-saved-country', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // increment save count
      const countRes = await fetch('https://countries-app-lfcu.onrender.com/add-save-count', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country_name: country.name.common }),
      });

      if (saveRes.ok && countRes.ok) {
        setSaved(true);
        setSaveCount(prev => prev + 1);
      } else {
        console.error('Save or count update failed');
      }

    } catch (error) {
      console.error('Error saving country:', error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

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
              <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
              <p><strong>Times Saved:</strong> {saveCount}</p>

              <button 
                className={`save-button ${saved ? 'saved' : ''}`}
                onClick={handleSave}
                disabled={saved}
              >
                {saved ? 'Saved!' : 'Save Country'}
              </button>
            </div>

            {borderCountries.length > 0 && (
              <div className="border-countries">
                <h3>Border Countries:</h3>
                <div className="borders-list">
                  {borderCountries.map((borderCountry) => (
                    <div key={borderCountry.cca3} className="border-item">
                      <img
                        src={borderCountry.flags?.png}
                        alt={`${borderCountry.name.common} flag`}
                        style={{ width: '50px', height: '30px', borderRadius: '5px' }}
                      />
                      <p>{borderCountry.name.common}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;