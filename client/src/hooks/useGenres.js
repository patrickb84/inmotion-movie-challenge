import axios from 'axios';
// import { useHistory } from 'react-router-dom';

const useGenres = () => {
  // let history = useHistory();

  const getAllGenres = async () => {
    try {
      const response = await axios.get('/api/genres');
      return response.data.genres;
    } catch (error) {
      console.error(error);
    }
  };

  const getGenre = async id => {
    try {
      const response = await axios.get(`/api/genres/${id}`);
      const { genre } = response.data;
      return genre;
    } catch (error) {
      console.error(error);
    }
  };

  const addGenre = async ({ ...Genre }) => {
    try {
      const response = await axios.post('/api/genres', {
        label: Genre.label,
      });
      return response.data.newId;
    } catch (error) {
      console.error(error);
      return { error };
    }
  };

  const updateGenre = async ({ ...genre }) => {
    try {
      await axios.put('/api/genres', {
        id: genre.id,
        label: genre.label,
      });
      return true;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteGenre = async id => {
    try {
      await axios.delete(`/api/genres/${id}`);
      return { error: false };
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  // const handleError = error => {
  //   if (error.response.status === 404) history.push('/error/404');
  //   if (error.response.status === 500) history.push('/error/500');
  // };

  return {
    getGenre,
    getAllGenres,
    addGenre,
    updateGenre,
    deleteGenre,
  };
};

export default useGenres;
