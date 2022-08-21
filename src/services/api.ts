import Movie from '../types/Movie';

type GetMovieParam = {
  url: string;
  handleMovies: ([]: Movie[]) => void;
};

async function getMovies({ url, handleMovies }: GetMovieParam) {
  console.log(url);
  const res = await fetch(url);
  const data = await res.json();

  handleMovies(data.results);
}

export default getMovies;
