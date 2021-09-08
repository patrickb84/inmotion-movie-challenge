import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import useGenres from '../../hooks/useGenres.js';

const GenreIndex = () => {
  const { getAllGenres } = useGenres();
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getAllGenres().then(result => {
      setGenres(result);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container-fluid py-3'>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <div>
          <h1 className='mb-0'>Genres</h1>
        </div>
        <div>
          <div className='d-flex'>
            <Link className='btn btn-primary ms-2 ml-2' to='/genres/create'>
              Add&nbsp;Genre
            </Link>
          </div>
        </div>
      </div>

      <Card>
        <Card.Header>Index</Card.Header>
        <Card.Body>
          <Table hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Label</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {genres.map(genre => {
                return (
                  <tr key={genre.id}>
                    <td>{genre.id}</td>
                    <td>{genre.label}</td>
                    <td className='d-flex justify-content-end'>
                      <Link
                        to={`/genres/edit/${genre.id}`}
                        className='btn btn-sm btn-dark me-1 mr-1'>
                        Edit
                      </Link>
                      <Link
                        to={`/genres/delete/${genre.id}`}
                        className='btn btn-sm btn-outline-danger'>
                        Delete
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default GenreIndex;
