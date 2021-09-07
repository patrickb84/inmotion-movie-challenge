import { useState, useEffect } from 'react';
import TokenBox from './TokenBox';

import useGenres from '../hooks/useGenres';
// import useMovies from '../hooks/useMovies';

const GenreSelect = ({ movieId, selected, setSelected }) => {
  const { getAllGenres } = useGenres();
  // const { getMovieGenres } = useMovies();

  const [options, setOptions] = useState([]);

  useEffect(() => {
    getAllGenres().then(result => {
      setOptions(result);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  return (
    <TokenBox
      options={options}
      placeholder='Select genres...'
      formLabel='Genres'
      selected={selected}
      setSelected={setSelected}
      labelKey='label'
    />
  );
};

export default GenreSelect;
