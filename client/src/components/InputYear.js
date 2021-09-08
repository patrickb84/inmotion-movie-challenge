const InputYear = ({ setYear, year }) => {
  return (
    <>
      <label htmlFor='year' className='form-label'>
        Year
      </label>
      <input
        type='number'
        className='form-control'
        value={year}
        onChange={e => setYear(e.target.value)}
      />
    </>
  );
};

export default InputYear;
