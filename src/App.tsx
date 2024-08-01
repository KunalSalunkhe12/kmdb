import MovieList from "./components/MovieList";

function App() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav>
        <div className="container">
          <span className="logo" onClick={scrollToTop}>
            KMDB
          </span>
        </div>
      </nav>
      <main className="container">
        <MovieList />
      </main>
    </>
  );
}

export default App;
