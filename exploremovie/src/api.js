const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export async function searchMovies(query, category = "movie") {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(
      query
    )}&type=${category}`
  );

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "Movies not found");
  }

  return data.Search || [];
}

export async function getMovieDetails(id) {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`
  );

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "Movie details not found");
  }

  return data;
}