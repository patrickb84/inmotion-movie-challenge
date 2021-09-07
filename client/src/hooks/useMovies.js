import axios from 'axios';
import { useHistory } from 'react-router-dom';

const useMovies = () => {
  let history = useHistory();

  const getAllMovies = async () => {
    try {
      const response = await axios.get('/api/movies');
      return response.data;
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };

  const searchMovies = async query => {
    try {
      const response = await axios.post('/api/movies/search', { query });
      return response.data.movies;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const getMovie = async id => {
    try {
      const response = await axios.get(`/api/movies/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const addMovie = async ({ ...movie }) => {
    try {
      const response = await axios.post('/api/movies', {
        title: movie.title,
        year: movie.year,
        genres: movie.genres,
        actors: movie.actors,
      });
      return response.data.newId;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const updateMovie = async ({ ...movie }) => {
    console.log(movie);
    try {
      await axios.put('/api/movies', {
        id: movie.id,
        title: movie.title,
        year: movie.year,
        genres: movie.genres,
        actors: movie.actors,
      });
      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const deleteMovie = async id => {
    try {
      await axios.delete(`/api/movies/${id}`);
      return { error: false };
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const handleError = error => {
    if (error.response.status === 404) history.push('/error/404');
    if (error.response.status === 500) history.push('/error/500');
    return error;
  };

  return {
    getAllMovies,
    getMovie,
    addMovie,
    updateMovie,
    deleteMovie,
    searchMovies,
  };
};

export default useMovies;
