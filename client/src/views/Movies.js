import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Movies = () => {
  const [movies, setMovies] = useState('');

  useEffect(() => {
    axios
      .get('/api/movies')
      .then(response => {
        console.log(response.data);
        // setMovies(response.data.movies);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>Movies</h1>
    </div>
  );
};

export default Movies;
