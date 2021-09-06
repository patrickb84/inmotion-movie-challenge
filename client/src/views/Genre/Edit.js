import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useGenres from '../../hooks/useGenres';
import { useParams } from 'react-router-dom';

const GenreEdit = () => {
  const { updateGenre, getGenre } = useGenres();

  let { id } = useParams();
  let history = useHistory();

  const [displayTitle, setDisplayTitle] = useState('');
  const [label, setLabel] = useState('');

  useEffect(() => {
    getGenre(id).then(g => {
      setDisplayTitle(g.label);
      setLabel(g.label);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const genre = { id, label };
    await updateGenre(genre);
    history.push('/genres');
  };

  return (
    <div className='container py-3'>
      <small>
        <Link to='/genres'>Back</Link>
      </small>
      <h2>{displayTitle}</h2>

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

export default GenreEdit;
