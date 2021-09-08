import axios from 'axios';
import { useHistory } from 'react-router-dom';
import useActors from './useActors';
import useGenres from './useGenres';
import _ from 'lodash';

const useMovies = () => {
  let history = useHistory();
  const { getAllMovieActors } = useActors();
  const { getAllMovieGenres } = useGenres();

  const getAllMovies = async () => {
    try {
      const response = await axios.get('/api/movies');
      return response.data;
    } catch (error) {
      console.error(error);
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

  const searchLibrary = async query => {
    try {
      const movies = await getAllMovies();
      const mActors = await getAllMovieActors();
      const mGenres = await getAllMovieGenres();
      
      const libraryMap = movies.map(movie => {
        return {
          year: movie.year,
          title: movie.title,
          genres: mGenres
            .filter(g => g.movie_id === movie.id)
            .map(g => {
              return g.label;
            }).join(" "),
          actors: mActors
            .filter(a => a.movie_id === movie.id)
            .map(a => {
              return a.name;
            }).join(" "),
        };
      });
      console.log(libraryMap);
    } catch (error) {
      console.error(error);
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

  const addMovie = async movie => {
    try {
      const response = await axios.post('/api/movies', movie);
      const addedMovie = response.data;
      return addedMovie;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const updateMovie = async movie => {
    try {
      console.log('updateMovie() -->', movie);
      await axios.put('/api/movies', movie);
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

  const uploadPoster = async (data, movieId) => {
    try {
      const response = await axios.post(`/api/upload/${movieId}`, data);
      console.log('UPLOAD POSTER () ', response);
      return response.data.filename;
    } catch (error) {
      console.error(error);
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
    uploadPoster,
    searchLibrary,
  };
};

export default useMovies;
