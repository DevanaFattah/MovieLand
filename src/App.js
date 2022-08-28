import React, { useEffect, useState } from 'react';
import './App.css';
import searchIcon from './assets/Search.svg';
import MovieCard from './components/MovieCard'

const App = () => {

    const [ movies, setMovies ] = useState([]);
    const [ search, setSearch ] = useState('');

    const apiKey = '6ff934c8';
    const API_URL = `http://www.omdbapi.com/?apikey=${apiKey}`;

    const searchMovie = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }
    
    useEffect(() => {
        search ? searchMovie(search) : searchMovie('Superman');
    }, [search]);

  return (
    <div className='app'>
        <h1>MovieLand</h1>

        <div className="search">
            <input 
                placeholder='Search Movies'
                value={search}
                onChange={
                    e => setSearch(e.target.value)
                }
            />

            <img 
                src={searchIcon} 
                alt='Glass' 
            />
        </div>
            {movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map(movie => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>  
                ) 
                : (
                    <h1 className='empty'>Movies not found</h1>
                )
            }
    </div>
  )
}

export default App