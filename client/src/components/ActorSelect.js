import { useState, useEffect } from 'react';
import TokenBox from './TokenBox';

import useActors from '../hooks/useActors';
// import useMovies from '../hooks/useMovies';

const ActorSelect = ({ movieId, selected, setSelected }) => {
  const { getAllActors } = useActors();
  // const { getMovieActors } = useMovies();

  const [options, setOptions] = useState([]);

  useEffect(() => {
    getAllActors().then(result => setOptions(result));
    // if (movieId) {
    //   getMovieActors(movieId).then(selected => setSelected(selected));
    // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TokenBox
      options={options}
      placeholder='Select actors...'
      formLabel='Actors'
      selected={selected}
      setSelected={setSelected}
      labelKey='name'
    />
  );
};

export default ActorSelect;
