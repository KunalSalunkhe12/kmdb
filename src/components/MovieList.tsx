import axios from "axios";
import { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";
import { Movie } from "../types";
import useIntersectionObserver from "../utils/useIntersectionObserver";

const MovieList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const loadMoreRef = useRef(null);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  const getMovies = async () => {
    setLoading(true);
    setIsError(false);
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/upcoming?api_key=${
        import.meta.env.VITE_API_KEY
      }&page=${page}`;
      const res = await axios.get(url);
      // Some pages had duplicate movies, so I filtered them out
      const newMovies = res.data.results.filter(
        (movie: Movie) => movies.findIndex((m) => m.id === movie.id) === -1
      );
      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, [page]);

  // Intersection Observer to load more movies when user scrolls to the bottom
  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: () => setPage((prev) => prev + 1),
  });

  if (isError) {
    return <div className="error">An error occurred</div>;
  }

  return (
    <div className="movies-container">
      <div className="search-input">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for upcoming movies"
        />
        {search ? (
          <img src="/cross.png" alt="close" onClick={() => setSearch("")} />
        ) : (
          <img src="/search.png" alt="search" />
        )}
      </div>
      <div className="movies-list">
        {filteredMovies.length > 0 ? (
          <div className="movies-grid">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          !loading && <div className="no-movies">No movies found</div>
        )}
        <div ref={loadMoreRef}>
          {loading ? <div className="loader"></div> : ""}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
