import { Movie } from "../types"

const MovieCard = ({ movie }: { movie: Movie }) => {
    return (
        <div className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <div className="movie-card-container">
                <div className="movie-title-container">
                    <h2>{movie.title}</h2>
                    <span>{movie.vote_average}</span>
                </div>
                <p className="movie-overview">{movie.overview}</p>
            </div>
        </div>
    )
}

export default MovieCard
