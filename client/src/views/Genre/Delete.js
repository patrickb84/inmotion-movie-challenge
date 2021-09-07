import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import useGenres from '../../hooks/useGenres';

const GenreDelete = () => {
  let { id } = useParams();
  const [genre, setGenre] = useState({});
  const { getGenre, deleteGenre } = useGenres();
  let history = useHistory();

  useEffect(() => {
    const unsubscribe = getGenre(id).then(result => setGenre(result));
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async () => {
    const response = await deleteGenre(id);
    if (!response.error) {
      history.push({
        pathname: '/genres',
        state: { toastSuccess: `Deleted "${genre.label}".` },
      });
    }
  };

  return (
    <div className='container py-5'>
      <div className='text-center'>
        <div className='card card-body py-5 border-dark'>
          <h2>Delete "{genre.label}" from the library?</h2>
          <div className='mt-3'>
            <Link to='/genres' className='btn btn-outline-dark px-5'>
              Cancel
            </Link>
            <button onClick={handleDelete} className='ms-2 ml-2 btn btn-danger px-5'>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenreDelete;
