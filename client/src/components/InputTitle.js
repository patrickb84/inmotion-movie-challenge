const inputTitle = ({ setTitle, title }) => {
  return (
    <>
      <label htmlFor='title' className='form-label'>
        Title
      </label>
      <input
        type='text'
        className='form-control'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
    </>
  );
};

export default inputTitle;
