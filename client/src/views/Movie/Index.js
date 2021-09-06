import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import useMovies from '../../hooks/useMovies.js';
import SearchBar from '../../components/SearchBar';

const MovieIndex = () => {
  const { getAllMovies } = useMovies();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies().then(result => {
      setMovies(result);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container-fluid py-3'>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <div>
          <h1 className='mb-0'>Movies</h1>
        </div>
        <div>
          <div className='d-flex'>
            <SearchBar {...{ movies, setMovies }} />

            <Link className='btn btn-primary ms-2' to='/movies/create'>
              Add&nbsp;Movie
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
                {/* <th>#</th> */}
                <th>Title</th>
                <th>Year</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.map(movie => {
                return (
                  <tr key={movie.id}>
                    {/* <td>{movie.id}</td> */}
                    <td>
                      <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                    </td>
                    <td>{movie.year}</td>
                    <td className='d-flex justify-content-end'>
                      <Link
                        to={`/movies/edit/${movie.id}`}
                        className='btn btn-sm btn-dark me-1'>
                        Edit
                      </Link>
                      <Link
                        to={`/movies/delete/${movie.id}`}
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

export default MovieIndex;
