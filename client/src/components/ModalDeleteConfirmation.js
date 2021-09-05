import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const ModalDeleteConfirmation = ({ movie }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async id => {
    const response = await axios.delete(`/api/movies/${id}`);
    console.log(response);
    if (response.status === 200) {
      console.log('deleted');
      setShow(false);
    }
  };

  return (
    <>
      <Button variant='outline-secondary' size='sm' onClick={handleShow}>
        Delete
      </Button>

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
    </>
  );
};

export default ModalDeleteConfirmation;
