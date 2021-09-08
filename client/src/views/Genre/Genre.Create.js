import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useGenres from '../../hooks/useGenres';

const GenreCreate = () => {
  const [label, setLabel] = useState('');
  const { addGenre } = useGenres();
  let history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    const genre = { label };
    const response = await addGenre(genre);
    if (!response.error) {
      history.push('/genres');
    }
  };

  return (
    <div className='container py-3'>
      <h2>Add Genre</h2>
      <p>
        <Link to='/genres'>Back to library</Link>
      </p>

      <div style={{ maxWidth: 500 }}>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='title' className='form-label'>
              Label
            </label>
            <input
              type='text'
              className='form-control'
              value={label}
              onChange={e => setLabel(e.target.value)}
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

export default GenreCreate;
