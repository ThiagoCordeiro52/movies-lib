import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';

import getMovies from '../services/api';

import Movie from '../types/Movie';

import '../styles/components/MoviesGrid.css';

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

function Home() {
  const [topMovies, setTopMovies] = useState<Movie[]>([]);

  function handleMovies(param: Movie[]) {
    setTopMovies(param);
  }

  useEffect(() => {
    const topRatedUrl = `${moviesURL}top_rated?api_key=${apiKey}&language=pt-BR`;
    getMovies({ url: topRatedUrl, handleMovies });
  }, []);

  return (
    <div className="container">
      <h2 className="title">Melhores filmes:</h2>
      <div className="movies-container">
        {topMovies.length === 0 && <p>Carregando...</p>}
        {topMovies.length > 0 &&
          topMovies &&
          topMovies.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} showLink={true} />
          ))}
      </div>
    </div>
  );
}

export default Home;
