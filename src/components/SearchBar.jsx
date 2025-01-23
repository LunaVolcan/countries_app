function SearchBar({ searchTerm, onSearchChange, onRegionChange }) {
    const handleClearRegion = () => {
        onRegionChange('')
    };

    return (
        <div className="searchBar">
            <input
                type="text"
                className="search-input"
                placeholder="Search For A Country"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />
            <select
                className="region-dropdown"
                onChange={(e) => onRegionChange(e.target.value)}
                defaultValue="" 
            >
                <option value="" disabled>
                    Filter by Region
                </option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
                <option value="Antarctic">Antarctic</option>
            </select>
            <button onClick={handleClearRegion} className="clear-button">
                Clear Region
            </button>
        </div>
    )
}

export default SearchBar