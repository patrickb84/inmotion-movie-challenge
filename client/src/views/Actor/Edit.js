import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useActors from '../../hooks/useActors';
import { useParams } from 'react-router-dom';

const ActorEdit = () => {
  const { updateActor, getActor } = useActors();

  let { id } = useParams();
  let history = useHistory();

  const [displayTitle, setDisplayTitle] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    getActor(id).then(a => {
      setDisplayTitle(a.name);
      setName(a.name);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const actor = { id, name };
    await updateActor(actor);
    history.push('/actors');
  };

  return (
    <div className='container py-3'>
      <small>
        <Link to='/actors'>Back</Link>
      </small>
      <h2>{displayTitle}</h2>

      <div style={{ maxWidth: 500 }}>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='title' className='form-label'>
              Name
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

export default ActorEdit;
