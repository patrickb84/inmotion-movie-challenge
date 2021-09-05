import React, { useState } from 'react';
import axios from 'axios';

const MovieForm = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = async () => {
    const movie = { title, year };
    const response = await axios.post('/api/movies', movie);
    console.log(response);
  };

  return (
    <div>
      <div className='mb-3'>
        <label htmlFor='title' className='form-label'>
          Title
        </label>
        <input
          type='text'
          className='form-control'
          name='title'
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      <div className='mb-3'>
        <label htmlFor='year' className='form-label'>
          Year
        </label>
        <input
          type='number'
          className='form-control'
          name='title'
          onChange={e => setYear(e.target.value)}
        />
      </div>

      <div className='mb-3'>
        <button className='btn btn-primary' onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default MovieForm;
