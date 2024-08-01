import { useState } from "react";
import { Movie } from "../types";
import MovieDetailPopup from "./MovieDetailPopup";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="movie-card" onClick={() => setOpen(true)}>
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
          onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
          width={250}
          height={375}
        />
        <div className="movie-card-container">
          <div className="movie-title-container">
            <h2>{movie.title}</h2>
            <span>{parseFloat(movie.vote_average).toFixed(1)}</span>
          </div>
          <p className="movie-overview">{movie.overview}</p>
        </div>
      </div>
      <MovieDetailPopup movie={movie} open={open} setOpen={setOpen} />
    </>
  );
};

export default MovieCard;
