import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieForm from '../components/MovieForm';

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get('/api/movies')
      .then(response => {
        console.log(response);
        setMovies(response.data.movies);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      <div className='row'>
        <div className='col-md-6'>
          <div className='card card-body bg-light'>
            <MovieForm />
          </div>
        </div>
        <div className='col-md-6'>
          {movies.map(movie => {
            return (
              <div key={movie.id} className='card p-3 mb-3 flex-row d-flex justify-content-between'>
                <h3 className="m-0">
                  {movie.title}{' '}
                  <small className='text-warning'>{movie.year}</small>
                </h3>
                <div>
                  <button className='btn btn-sm btn-dark'>Edit</button>
                  <button className='ms-1 btn btn-sm btn-outline-secondary'>Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Movies;
