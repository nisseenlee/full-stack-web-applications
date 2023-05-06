import { useState, useEffect } from 'react'
import './App.css'
import { Layout } from './components/Layout'
import { Routes, Route } from 'react-router-dom'
import { Home } from './components/home/Home'

function App() {
  const [movies, setMovies] = useState(0);

  const getMovies = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/movies")
        .then(res => res.json());
      
      setMovies(response);
      console.log(response)
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getMovies();
  }, [])

  return (
    <>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home movies={movies} />}></Route>
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
