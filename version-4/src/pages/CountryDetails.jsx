import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { incrementCountryVisit, getCountryVisitCount, saveCountry } from '../services/api';

function CountryDetails() {
  const { countryCode } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [visitCount, setVisitCount] = useState(0);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        if (!response.ok) throw new Error('Failed to fetch country data');
        const data = await response.json();
        setCountry(data[0]);

        // Fetch borders
        if (data[0]?.borders?.length) {
          const borderRes = await fetch(
            `https://restcountries.com/v3.1/alpha?codes=${data[0].borders.join(',')}`
          );
          if (!borderRes.ok) throw new Error('Failed to fetch border countries');
          const borderData = await borderRes.json();
          setBorderCountries(borderData);
        }

        // Track visits using our API service
        await incrementCountryVisit(countryCode);
        const visitData = await getCountryVisitCount(countryCode);
        setVisitCount(visitData.count || 0);
      } catch (err) {
        console.error('Error loading country:', err);
        setError('Failed to load country details. Please try again later.');
      }
    };

    fetchCountry();
  }, [countryCode]);

  const handleSave = async () => {
    if (!country) return;

    try {
      await saveCountry({
        country_code: country.cca3,
        country_name: country.name.common,
        flag_url: country.flags?.png || ''
      });
      setSaved(true);
    } catch (err) {
      console.error('Error saving country:', err);
      setError('Failed to save country. Please try again later.');
    }
  };

  const handleBack = () => navigate(-1);

  if (error) return <div className="error-message">{error}</div>;
  if (!country) return <div className="loading">Loading country details...</div>;

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
              <p><strong>Times Searched:</strong> {visitCount}</p>
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