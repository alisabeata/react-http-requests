import React, { useState, useEffect, useCallback } from 'react'
import AddMovie from './components/AddMovie'
import MoviesList from './components/MoviesList'
import './App.css'

// fetchMoviesHandler - starwars API
// const fetchMoviesHandler = useCallback(async () => {
//   setIsLoading(true)
//   setError(false)
//   try {
//     const response = await fetch('https://swapi.dev/api/films/')

//     const transformedMovies = data.results.map((movie) => {
//       return {
//         id: movie.episode_id,
//         title: movie.title,
//         openingText: movie.opening_crawl,
//         releaseDate: movie.release_date,
//       }
//     })

//     setMovies(transformedMovies)
//   } catch (err) {
//     setError(true)
//   }
//   setIsLoading(false)
// }, [])

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true)
    setError(false)
    try {
      // api via real-time database (google firebase)
      const response = await fetch(
        'https://react-http-9b5c3-default-rtdb.europe-west1.firebasedatabase.app/movies.json',
      )
      const data = await response.json()

      if (!response.ok) {
        throw new Error('Something went wrong')
      }

      const loadedMovies = []

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        })
      }

      setMovies(loadedMovies)
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
    fetchMoviesHandler()
  }, [fetchMoviesHandler])

  const addMovieHandler = async (movie) => {
    const response = await fetch(
      'https://react-http-9b5c3-default-rtdb.europe-west1.firebasedatabase.app/movies.json',
      {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const data = await response.json()
    console.log(data)
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  )
}

export default App
