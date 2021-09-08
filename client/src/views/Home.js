import { useEffect, useState } from 'react';
import useMovies from '../hooks/useMovies';
import useActors from '../hooks/useActors';
import useGenres from '../hooks/useGenres';
import SearchBar from '../components/SearchBar';
// import _ from 'lodash';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [movieActors, setMovieActors] = useState([]);

  const { getMoviesMap } = useMovies();
  const { getAllMovieGenres } = useGenres();
  const { getAllMovieActors } = useActors();

  useEffect(() => {
    getMoviesMap().then(movies => setMovies(movies));

    getAllMovieGenres().then(result => {
      setMovieGenres(result);
    });

    getAllMovieActors().then(result => {
      setMovieActors(result);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container-fluid py-3'>
      <div className='d-flex justify-content-between align-items-end mb-4'>
        <h1 className='m-0'>Movie Library</h1>
        <div>
          <SearchBar
            data={movies}
            setResults={setMovies}
            clearResults={getMoviesMap}
          />
        </div>
      </div>

      <div className='mt-3'>
        <div className='row'>
          {movies.map(movie => {
            return (
              <div className='col-md-4 mb-3' key={movie.id}>
                <div className='card shadow'>
                  <div className='card-body'>
                    <small className='text-info d-flex justify-content-between'>
                      <span>{movie.year}</span>
                      <span>{movie.rating}</span>
                    </small>
                    <h4>{movie.title}</h4>
                    {movie.poster && (
                      <img
                        src={`/images/${movie.poster}`}
                        alt='poster'
                        style={{ width: '100%' }}
                      />
                    )}
                    <div className='py-3'>
                      <h5>Genres</h5>
                      <ul className='list-unstyled mb-0'>
                        {movieGenres
                          .filter(g => g.movie_id === movie.id)
                          .map(g => {
                            return <li key={g.id}>{g.label}</li>;
                          })}
                      </ul>
                    </div>

                    <div className='py-3'>
                      <h5>Actors</h5>
                      <ul className='list-unstyled mb-0'>
                        {movieActors
                          .filter(a => a.movie_id === movie.id)
                          .map(a => {
                            return <li key={a.id}>{a.name}</li>;
                          })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
