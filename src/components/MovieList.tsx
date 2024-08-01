import axios from "axios"
import { useEffect, useRef, useState } from "react"
import MovieCard from "./MovieCard"
import { Movie } from "../types"
import useIntersectionObserver from "../utils/useIntersectionObserver";


const MovieList = () => {
    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")
    const loadMoreRef = useRef(null)

    const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(search.toLowerCase()))

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
        onIntersect: () => setPage(prev => prev + 1),
        enabled: movies.length > 0,
    });

    return (
        <div className="movies-container">
            <div className="search-input">
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search for upcoming movies"/>
                {
                    search ? <img src="/cross.png" alt="close" onClick={()=>setSearch("")} /> : <img src="/search.png" alt="search" />
                }
            </div>
            <div className="movies-list">
                {loading && <div>Loading....</div>}
                <div className="movies-grid">
                    {filteredMovies && filteredMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                    <div ref={loadMoreRef} className={""}>
                        {loading ? <div>Loading...</div> : ""}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieList
