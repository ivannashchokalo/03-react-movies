import { useState } from "react";
import type { Movie } from "../types/movie";
import css from "./MovieGrid.module.css";

interface MovieGrid {
  onSelect: (movie: Movie) => void;
  movies: Movie[];
}

export default function MovieGrid({ onSelect, movies }: MovieGrid) {
  function handleSelectMovie(movie: Movie) {
    onSelect(movie);
  }
  return (
    <ul className={css.grid}>
      {movies &&
        movies.map((movie: Movie) => (
          <li key={movie.id} onClick={() => handleSelectMovie(movie)}>
            <div className={css.card}>
              <img
                className={css.image}
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
              />
              <h2 className={css.title}>{movie.title}</h2>
            </div>
          </li>
        ))}
    </ul>
  );
}
