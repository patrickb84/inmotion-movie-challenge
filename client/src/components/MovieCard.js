import { useEffect, useState } from 'react';

const MovieCard = ({ movie }) => {

  const [genreList, setGenreList] = useState([]);
  const [actorList, setActorList] = useState([]);
  useEffect(() => {}, []);
  return (
    <div className='col-md-4 mb-3' key={movie.id}>
      <div className='card'>
        <div className='card-body'>
          <small className='text-warning'>{movie.year}</small>
          <h4>{movie.title}</h4>
          {movie.poster && (
            <img
              src={`/images/${movie.poster}`}
              alt='poster'
              style={{ width: '100%' }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
