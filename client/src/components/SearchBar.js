import { useState } from 'react';
import useMovies from '../hooks/useMovies';

const SearchBar = ({ setMovies }) => {
  const { searchMovies, getMovies } = useMovies();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async value => {
    const results = await searchMovies(value);
    setMovies(results);
  };

  const handleClear = async () => {
    setMovies(await getMovies());
  }

  return (
    <div className='input-group'>
      <input
        type='text'
        className='form-control'
        placeholder='Search...'
        onChange={e => setSearchTerm(e.target.value)}
      />
      <button
        className='btn btn-outline-secondary'
        onClick={() => handleSearch(searchTerm)}>
        Submit
      </button>
      <button
        className='btn btn-outline-secondary'
        onClick={() => handleClear()}>
        Clear
      </button>
    </div>
  );
};

export default SearchBar;
