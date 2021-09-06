import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import useActors from '../../hooks/useActors';

const ActorDelete = () => {
  let { id } = useParams();
  const [actor, setActor] = useState({});
  const { getActor, deleteActor } = useActors();
  let history = useHistory();

  useEffect(() => {
    const unsubscribe = getActor(id).then(result => setActor(result));
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async () => {
    const response = await deleteActor(id);
    if (!response.error) {
      history.push({
        pathname: '/actors',
        state: { toastSuccess: `Deleted "${actor.name}".` },
      });
    }
  };

  return (
    <div className='container py-5'>
      <div className='text-center'>
        <div className='card card-body py-5 border-dark'>
          <h2>Delete "{actor.name}" from the library?</h2>
          <div className='mt-3'>
            <Link to='/actors' className='btn btn-outline-dark px-5'>
              Cancel
            </Link>
            <button onClick={handleDelete} className='ms-2 btn btn-danger px-5'>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorDelete;
