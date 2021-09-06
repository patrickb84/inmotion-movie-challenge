import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import useMovies from '../hooks/useMovies';

const MovieDelete = () => {
  let { id } = useParams();
  const [movie, setMovie] = useState({});
  const { getMovie, deleteMovie } = useMovies();
  let history = useHistory();

  useEffect(() => {
    const unsubscribe = getMovie(id).then(result => setMovie(result));
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async () => {
    const response = await deleteMovie(id);
    if (!response.error) {
      history.push({
        pathname: '/movies',
        state: { toastSuccess: `Deleted "${movie.title}".` },
      });
    }
  };

  return (
    <div className='container py-5'>
      <div className='text-center'>
        <div className='card card-body py-5 border-dark'>
          <h2>Delete "{movie.title}" from the library?</h2>
          <p className='lead'>After all, you might miss it.</p>
          <div className='mt-3'>
            <Link to='/movies' className='btn btn-outline-dark px-5'>
              Nevermind, cancel.
            </Link>
            <button onClick={handleDelete} className='ms-2 btn btn-danger px-5'>
              Yes, delete it.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDelete;
