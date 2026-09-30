import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { searchMovies } from "../api";

function Home() {
  const [query, setQuery] = useState("Avengers");
  const [category, setCategory] = useState("movie");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Search movies when category changes
  useEffect(() => {
    let cancelled = false;

    const fetchMovies = async () => {
      setLoading(true);
      setError("");

      try {
        const results = await searchMovies(query, category);

        if (!cancelled) {
          setMovies(results);
        }
      } catch (err) {
        if (!cancelled) {
          setMovies([]);
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchMovies();

    return () => {
      cancelled = true;
    };
  }, [category]);

  // Search button
  const handleSearch = async () => {
    if (query.trim() === "") {
      setError("Please enter a movie name.");
      setMovies([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const results = await searchMovies(query, category);
      setMovies(results);
    } catch (err) {
      setMovies([]);
      setError(err.message || "Movies not found.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>🎬 Movie Explorer</h1>
        <p>Search and discover your favorite movies</p>
      </header>

      <main>
        <div className="controls">
          <SearchBar
            query={query}
            setQuery={setQuery}
            onSearch={handleSearch}
          />

          <CategoryFilter
            category={category}
            setCategory={setCategory}
          />
        </div>

        {/* Loading */}
        {loading && <Loading />}

        {/* Error */}
        {!loading && error && (
          <ErrorMessage message={error} />
        )}

        {/* Movies */}
        {!loading && !error && movies.length > 0 && (
          <section className="movie-grid">
            {movies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
              />
            ))}
          </section>
        )}

        {/* No results */}
        {!loading && !error && movies.length === 0 && (
          <div className="no-results">
            <h2>No movies found</h2>
            <p>Try searching for another movie.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;