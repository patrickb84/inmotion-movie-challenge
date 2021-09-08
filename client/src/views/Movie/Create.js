import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ActorSelect from '../../components/ActorSelect';
import GenreSelect from '../../components/GenreSelect';
import useMovies from '../../hooks/useMovies';

const MovieCreate = () => {
  const { addMovie } = useMovies();

  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);

  let history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const addedMovie = await addMovie({ title, year, genres, actors });
      console.log(addedMovie);
      history.push('/movies');
    } catch (error) {
      console.log(error);
      // todo: handle
    }
  };

  return (
    <div className='container py-3'>
      <small>
        <Link to='/movies'>Back</Link>
      </small>
      <h2>Add Movie</h2>

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

          <GenreSelect selected={genres} setSelected={setGenres} />
          <ActorSelect selected={actors} setSelected={setActors} />

          <div className='pt-2'>
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
            <button
              onClick={() => history.push('/movies')}
              className='btn btn-secondary ms-1 ml-1'>
              Go Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieCreate;
