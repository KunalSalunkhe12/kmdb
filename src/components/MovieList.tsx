import axios from "axios"
import { useEffect, useState } from "react"
import MovieCard from "./MovieCard"
import { Movie } from "../types"

const MovieList = () => {
    const [movies, setMovies] = useState<Movie[]>()
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        const getMovies = async ()=>{
            setLoading(true)
            try {
                const url = `${import.meta.env.VITE_API_BASE_URL}/upcoming?api_key=${import.meta.env.VITE_API_KEY}&page=${1}`
                const res = await axios.get(url)
                setMovies(res.data.results)
            } catch (error) {
                console.log(error)
            } finally{
                setLoading(false)
            }
        }
        getMovies()
    },[])


    return (
        <div className="movies-container">
            {loading && <div>Loading....</div>}
            <div className="movies-grid">
            {movies && movies.map((movie)=>(
                <MovieCard key={movie.id} movie={movie}/>
            ))}
            </div>
        </div>
    )
}

export default MovieList
