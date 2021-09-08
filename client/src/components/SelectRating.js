const SelectRating = ({ setMovieRating, movieRating }) => {
  const RATINGS = ['G', 'PG', 'PG-13', 'R', 'NC-17', 'Not Rated'];

  const handleRadioChange = e => {
    setMovieRating(e.currentTarget.value);
  };

  return (
    <>
      <label className="d-block">Rating</label>
      {RATINGS.map(rating => {
        const id = rating.split('-').join('');
        return (
          <div className='form-check form-check-inline' key={rating}>
            <input
              type='radio'
              className='form-check-input'
              name='movieRatings'
              id={id}
              checked={movieRating === rating}
              value={rating}
              onChange={e => handleRadioChange(e)}
            />
            <label htmlFor={id} className='form-check-label'>
              {rating}
            </label>
          </div>
        );
      })}
    </>
  );
};

export default SelectRating;
