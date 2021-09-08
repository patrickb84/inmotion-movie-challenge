import { useEffect, useState } from 'react';
import useMovies from '../hooks/useMovies';
import useActors from '../hooks/useActors';
import useGenres from '../hooks/useGenres';
// import _ from 'lodash';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);
  const { getAllMovies } = useMovies();
  const { getAllMovieGenres } = useGenres();
  const { getAllMovieActors } = useActors();

  useEffect(() => {
    getAllMovies().then(movies => setMovies(movies));
    getAllMovieGenres().then(result => {
      setGenres(result);
    });

    getAllMovieActors().then(result => {
      setActors(result);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container-fluid py-3'>
      <h1>Movie Library</h1>

      <div className='mt-3'>
        <div className='row'>
          {movies.map(movie => {
            return (
              <div className='col-md-4 mb-3' key={movie.id}>
                <div className='card'>
                  <div className='card-body'>
                    <small className='text-warning'>{movie.year}</small>
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
                        {genres
                          .filter(g => g.movie_id === movie.id)
                          .map(g => {
                            return <li key={g.id}>{g.label}</li>;
                          })}
                      </ul>
                    </div>

                    <div className='py-3'>
                      <h5>Actors</h5>
                      <ul className='list-unstyled mb-0'>
                        {actors
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
