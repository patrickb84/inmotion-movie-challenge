import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const DeleteMovieModal = ({ activeMovie, handleDelete, open }) => {
  const [show, setShow] = useState(false);
  const [movie, setMovie] = useState({});

  const handleClose = () => setShow(false);

  useEffect(() => {
    setShow(open);
    setMovie(activeMovie);
  }, [activeMovie, open]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        <div>
          <h4>Delete Movie</h4>
          <p>Are you sure you want to delete "{movie.title}"?</p>
        </div>
        <div className='d-flex justify-content-end'>
          <button
            className='btn btn-sm btn-outline-secondary'
            onClick={handleClose}>
            Cancel
          </button>
          <button
            className='btn btn-sm btn-danger ms-1'
            onClick={() => handleDelete(movie.id)}>
            Delete It
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteMovieModal;
