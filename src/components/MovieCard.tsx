import { Movie } from "../types"

const MovieCard = ({ movie }: { movie: Movie }) => {
    return (
        <div className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} onError={e => e.currentTarget.src = "/placeholder.jpg"} />
            <div className="movie-card-container">
                <div className="movie-title-container">
                    <h2>{movie.title}</h2>
                    <span>{parseFloat(movie.vote_average).toFixed(1)}</span>
                </div>
                <p className="movie-overview">{movie.overview}</p>
            </div>
        </div>
    )
}

export default MovieCard
