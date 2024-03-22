import React, { useState } from 'react'

import MoviesList from './components/MoviesList'
import './App.css'

function App() {
  const [movies, setMovies] = useState()

  function fetchMovies() {
    fetch('https://swapi.dev/api/films/')
      .then((res) => res.json())
      .then((data) => {
        const transformedMovies = data.results.map((movie) => {
          return {
            id: movie.episode_id,
            title: movie.title,
            openingText: movie.opening_crawl,
            releaseDate: movie.release_date,
          }
        })

        setMovies(transformedMovies)
      })
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>{movies && <MoviesList movies={movies} />}</section>
    </React.Fragment>
  )
}

export default App
