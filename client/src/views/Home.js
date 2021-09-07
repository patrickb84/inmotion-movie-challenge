import { useEffect, useState } from 'react';
import useMovies from '../hooks/useMovies';
// import _ from 'lodash';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const { getAllMovies } = useMovies();

  useEffect(() => {
    getAllMovies().then(movies => setMovies(movies));
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
                  <div className='card-header'>{movie.title}</div>
                  <div className='card-body'></div>
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
