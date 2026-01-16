import { useEffect, useState } from "react";
import SearchBar from "../../SearchBar/SearchBar";
import type { Movie } from "../../types/movie";
import toast, { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import css from "./App.module.css";
import loaderStyles from "../utils/Loader.module.css";
import ErrorStyles from "../utils/ErrorMessage.module.css";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  function handleSearch(data: string) {
    setQuery(data);
    setMovies([]);
    setIsError(false);
  }

  useEffect(() => {
    if (!query) return;
    async function getMovies() {
      try {
        setIsLoading(true);
        const moviesData = await fetchMovies(query);
        setMovies(moviesData);

        if (moviesData.length === 0)
          toast("No movies found for your request.", {
            icon: "🎬",
          });
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovies();
  }, [query]);

  function handleOpenModal(movie: Movie) {
    setSelectedMovie(movie);
  }

  return (
    <div className={css.app}>
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && (
        <p className={loaderStyles.text}>Loading movies, please wait...</p>
      )}

      {isError && (
        <p className={ErrorStyles.text}>
          There was an error, please try again...
        </p>
      )}
      {!isLoading && !isError && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleOpenModal} />
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}
