function CategoryFilter({ category, setCategory }) {
  return (
    <div className="category-filter">
      <label>Category: </label>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="movie">Movies</option>
        <option value="series">Series</option>
        <option value="episode">Episodes</option>
      </select>
    </div>
  );
}

export default CategoryFilter;