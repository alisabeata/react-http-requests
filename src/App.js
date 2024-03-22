import React, { useState, useEffect, useCallback } from 'react'

import MoviesList from './components/MoviesList'
import './App.css'

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const fetchMovies = useCallback(async () => {
    setIsLoading(true)
    setError(false)
    try {
      const response = await fetch('https://swapi.dev/api/films/')
      const data = await response.json()

      // if (!response.status.ok) {
      //   throw new Error('Something went wrong')
      // }

      const transformedMovies = data.results.map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          openingText: movie.opening_crawl,
          releaseDate: movie.release_date,
        }
      })

      setMovies(transformedMovies)
    } catch (err) {
      setError(true)
    }
    setIsLoading(false)
  }, [])

  let content = <p>No films yet</p>
  if (error) {
    content = <p>An error occured</p>
  }
  if (isLoading) {
    content = <p>Loading...</p>
  }
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  }

  useEffect(() => {
    fetchMovies()
  }, [fetchMovies])

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  )
}

export default App
