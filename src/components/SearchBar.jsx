function SearchBar({ searchTerm, onSearchChange }) {
    return (
        <div className="searchBar">
            <input
                type="text"
                className="search-input"
                placeholder="Search For A Country"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;