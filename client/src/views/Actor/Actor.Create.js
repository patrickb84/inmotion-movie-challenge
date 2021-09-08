import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useActors from '../../hooks/useActors';

const ActorCreate = () => {
  const [name, setName] = useState('');
  const { addActor } = useActors();
  let history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    const actor = { name };
    const response = await addActor(actor);
    if (!response.error) {
      history.push('/actors');
    }
  };

  return (
    <div className='container py-3'>
      <h2>Add Actor</h2>
      <p>
        <Link to='/actors'>Back to library</Link>
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
              value={name}
              onChange={e => setName(e.target.value)}
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

export default ActorCreate;
