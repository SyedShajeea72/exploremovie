function SearchBar({ query, setQuery, onSearch }) {
  function handleSubmit(e) {
    e.preventDefault();

    if (query.trim()) {
      onSearch();
    }
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;