import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import useActors from '../../hooks/useActors.js';

const ActorIndex = () => {
  const { getAllActors } = useActors();
  const [actors, setActors] = useState([]);

  useEffect(() => {
    getAllActors().then(result => {
      if (result !== undefined) setActors(result);
      // setActors(result);
      console.log(result);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container-fluid py-3'>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <div>
          <h1 className='mb-0'>Actors</h1>
        </div>
        <div>
          <div className='d-flex'>
            <Link className='btn btn-primary ms-2' to='/actors/create'>
              Add&nbsp;Actor
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
                <th>Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {actors.map(actor => {
                return (
                  <tr key={actor.id}>
                    <td>{actor.id}</td>
                    <td>{actor.name}</td>
                    <td className='d-flex justify-content-end'>
                      <Link
                        to={`/actors/edit/${actor.id}`}
                        className='btn btn-sm btn-dark me-1'>
                        Edit
                      </Link>
                      <Link
                        to={`/actors/delete/${actor.id}`}
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

export default ActorIndex;
