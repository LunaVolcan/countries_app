import React from 'react'

function CountryCard({flag, country, population, region, capital}) {
    return (
    
    <div className="country-cards">
    <img src={flag}/>
    <div className="card-text">
    <h2>{country}</h2>
    <p><span className="bold">Population:</span> {population}</p>
    <p><span className="bold">Region:</span> {region}</p>
    <p><span className="bold">Capital: </span>{capital}</p>
    </div>
    </div>
    )
}


export default CountryCard
