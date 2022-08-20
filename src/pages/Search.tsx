import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

import getMovies from '../services/api';

import Movie from '../types/Movie';

import '../styles/components/MoviesGrid.css';

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

function Search() {
  const [searchParams] = useSearchParams();

  const [movies, setMovies] = useState<Movie[]>([]);
  const query = searchParams.get('q');

  function handleMovies(param: Movie[]) {
    setMovies(param);
  }

  useEffect(() => {
    const searchWithQueryUrl = `${searchURL}?api_key=${apiKey}&query=${query}&language=pt-BR`;
    getMovies({ url: searchWithQueryUrl, handleMovies });
  }, [query]);

  return (
    <div className="container">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
      <div className="movies-container">
        {movies.length === 0 && <p>Carregando...</p>}
        {movies.length > 0 &&
          movies &&
          movies.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} showLink={true} />
          ))}
      </div>
    </div>
  );
}

export default Search;
