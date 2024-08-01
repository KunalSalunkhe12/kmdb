import axios from "axios"
import { useEffect, useRef, useState } from "react"
import MovieCard from "./MovieCard"
import { Movie } from "../types"
import useIntersectionObserver from "../utils/useIntersectionObserver";


const MovieList = () => {
    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const loadMoreRef = useRef(null)

    const getMovies = async () => {
        setLoading(true)
        try {
            const url = `${import.meta.env.VITE_API_BASE_URL}/upcoming?api_key=${import.meta.env.VITE_API_KEY}&page=${page}`
            const res = await axios.get(url)
            setMovies(prevMovies => [...prevMovies, ...res.data.results]) 
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getMovies()
    }, [page])

    useIntersectionObserver({
        target: loadMoreRef,
        onIntersect: ()=> setPage(prev=> prev + 1),
        enabled: true,
    });

    return (
        <div className="movies-container">
            {loading && <div>Loading....</div>}
            <div className="movies-grid">
                {movies && movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
                <div ref={loadMoreRef} className={""}>
                    {loading ? <div>Loading...</div> : ""}
                </div>
            </div>
        </div>
    )
}

export default MovieList
