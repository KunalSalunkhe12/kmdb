import MovieList from './components/MovieList'

function App() {

  return (
    <>
      <nav >
        <div className='container'>
          <span className='logo'>KMDB</span>
        </div>
      </nav>
      <main className='container'>
        <MovieList />
      </main>
    </>
  )
}

export default App
