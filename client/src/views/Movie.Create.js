import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useMovies from '../hooks/useMovies';

const MovieCreate = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const { addMovie } = useMovies();
  let history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    const movie = { title, year };
    const response = await addMovie(movie);
    if (!response.error) {
      history.push('/movies');
    }
  };

  return (
    <div className='container py-3'>
      <h2>Add Movie</h2>
      <p>
        <Link to='/movies'>Back to library</Link>
      </p>

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

export default MovieCreate;
