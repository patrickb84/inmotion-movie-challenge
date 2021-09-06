import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useMovies from '../hooks/useMovies';
import { useParams } from 'react-router-dom';

const MovieEdit = () => {
  const { updateMovie, getMovie } = useMovies();

  let { id } = useParams();
  let history = useHistory();

  const [displayTitle, setDisplayTitle] = useState('');
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    getMovie(id).then(movie => {
      setDisplayTitle(movie.title);
      setTitle(movie.title);
      setYear(movie.year);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const movie = { id, title, year };
    await updateMovie(movie);
    history.push('/movies');
  };

  return (
    <div className='container py-3'>
    <small>
      <Link to='/movies'>Back</Link>
    </small>
      <h2>{displayTitle}</h2>

      <div style={{ maxWidth: 500 }}>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='title' className='form-label'>
              Title
            </label>
            <input
              type='text'
              className='form-control'
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='year' className='form-label'>
              Year
            </label>
            <input
              type='number'
              className='form-control'
              value={year}
              onChange={e => setYear(e.target.value)}
            />
          </div>

          <div className='pt-2'>
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieEdit;
