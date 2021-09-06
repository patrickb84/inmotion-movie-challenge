import axios from 'axios';
import { useHistory } from 'react-router-dom';

const useMovies = () => {
  let history = useHistory();

  const getMovies = async () => {
    try {
      const response = await axios.get('/api/movies');
      return response.data.movies;
    } catch (error) {
      return console.error(error);
    }
  };

  const getMovie = async id => {
    try {
      console.log('getmovie');
      const response = await axios.get(`/api/movies/${id}`);
      const { movie } = response.data;
      return movie;
    } catch (error) {
      handleMovieApiError(error);
      return error;
    }
  };

  const addMovie = async ({ ...movie }) => {
    try {
      const response = await axios.post('/api/movies', {
        title: movie.title,
        year: movie.year,
      });
      return response.data.newId;
    } catch (error) {
      console.error(error);
      return { error };
    }
  };

  const updateMovie = async ({ ...movie }) => {
    console.log(movie);
    try {
      await axios.put('/api/movies', {
        id: movie.id,
        title: movie.title,
        year: movie.year,
      });
      return true;
    } catch (error) {
      console.error(error);
      handleMovieApiError(error);
      return { error };
    }
  };

  const deleteMovie = async id => {
    try {
      await axios.delete(`/api/movies/${id}`);
      return { error: false };
    } catch (error) {
      handleMovieApiError(error);
    }
  };

  const handleMovieApiError = error => {
    if (error.response.status === 404) history.push('/error/404');
    if (error.response.status === 500) history.push('/error/500');
  };

  return { getMovies, getMovie, addMovie, updateMovie, deleteMovie };
};

export default useMovies;
