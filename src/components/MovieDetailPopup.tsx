import { createPortal } from "react-dom";
import { Movie } from "../types";
import { useEffect } from "react";

type MovieDetailPopupProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  movie: Movie;
};

const MovieDetailPopup = ({ open, setOpen, movie }: MovieDetailPopupProps) => {
  useEffect(() => {
    if (open) {
      document.body.classList.add("disable-scroll");
    } else {
      document.body.classList.remove("disable-scroll");
    }
    return () => {
      document.body.classList.remove("disable-scroll");
    };
  }, [open]);

  return createPortal(
    open && (
      <div
        className="modal"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setOpen(false);
          }
        }}
      >
        <div className="modal-content">
          <img
            onClick={() => setOpen(false)}
            className="close-modal"
            src="/cross.png"
            alt="close modal"
          />
          <img
            className="backdrop-img"
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
            alt={movie.title}
            width={600}
            height={300}
          />
          <div className="movie-card-container">
            <div className="movie-title-container">
              <h2>{movie.title}</h2>
              <span>{parseFloat(movie.vote_average).toFixed(1)}</span>
            </div>
            <p className="modal-overview">{movie.overview}</p>
          </div>
        </div>
      </div>
    ),
    document.body
  );
};

export default MovieDetailPopup;
