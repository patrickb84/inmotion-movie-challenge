import React, { useEffect, useState } from 'react';

const MovieForm = ({ handleSubmit, updating, setUpdating, movie }) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    if (updating) {
      console.log(movie);
      setTitle(movie.title);
      setYear(movie.year);
    }
  }, [updating, movie]);

  const cancelUpdate = () => {
    setTitle('');
    setYear('');
    setUpdating(false);
  };

  const submit = async () => {
    await handleSubmit(title, year);
    setTitle('');
    setYear('');
  };

  return (
    <>
      <div className='mb-3'>
        <h2 className='h4'>
          {!updating ? `Submit Movie` : `Edit "${movie.title}"`}
        </h2>
        <label htmlFor='title' className='form-label'>
          Title
        </label>
        <input
          type='text'
          className='form-control'
          name='title'
          value={title}
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
          value={year}
          onChange={e => setYear(e.target.value)}
        />
      </div>

      <div className='mb-3'>
        <button className='btn btn-primary' onClick={submit}>
          Submit
        </button>
        {updating && (
          <button className='ms-1 btn btn-outline-dark' onClick={cancelUpdate}>
            Cancel Edit
          </button>
        )}
      </div>
    </>
  );
};

export default MovieForm;
