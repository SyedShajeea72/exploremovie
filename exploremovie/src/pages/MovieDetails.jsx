import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetails } from "../api";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDetails() {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadDetails();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="details-page">
      <Link to="/" className="back-button">
        ← Back to Movies
      </Link>

      <div className="movie-details">
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450"
          }
          alt={movie.Title}
        />

        <div className="details-content">
          <h1>{movie.Title}</h1>

          <p className="year">
            {movie.Year} • {movie.Runtime}
          </p>

          <div className="rating">
            ⭐ {movie.imdbRating} / 10
          </div>

          <p>
            <strong>Genre:</strong> {movie.Genre}
          </p>

          <p>
            <strong>Director:</strong> {movie.Director}
          </p>

          <p>
            <strong>Actors:</strong> {movie.Actors}
          </p>

          <p>
            <strong>Language:</strong> {movie.Language}
          </p>

          <p className="plot">
            {movie.Plot}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;