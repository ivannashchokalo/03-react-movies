import axios from "axios";
import type { Movie } from "../types/movie";

interface MovieResponse {
  results: Movie[];
}

export async function fetchMovies(query: string) {
  const response = await axios.get<MovieResponse>(
    `https://api.themoviedb.org/3/search/movie?query=${query}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    }
  );
  return response.data.results;
}
