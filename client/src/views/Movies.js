import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieForm from '../components/MovieForm';
import DeleteMovieModal from '../components/DeleteMovie.Modal';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [showDeleteMovieModal, setShowDeleteMovieModal] = useState(false);
  const [movie, setMovie] = useState({});
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    getMovies();
  }, []);
  
  async function getMovies() {
    try {
      const { movies } = await axios.get('/api/movies').data;
      return movies;
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (title, year) => {
    try {
      const response = await axios.post('/api/movies', { title, year });
      const { newId } = response.data;
      setMovies([...movies, { id: newId, title, year }]);
      setMovie({});
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickDelete = movie => {
    setMovie(movie);
    setShowDeleteMovieModal(true);
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`/api/movies/${id}`);
      setMovies(movies.filter(m => m.id !== id));
      setShowDeleteMovieModal(false);
      setMovie({});
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickEdit = movie => {
    setMovie(movie);
    setUpdating(true);
  };

  return (
    <>
      <div>
        <h1>Movies</h1>
        <div className='row'>
          <div className='col-md-6'>
            <div className='card card-body bg-light'>
              <MovieForm
                handleSubmit={handleSubmit}
                updating={updating}
                setUpdating={setUpdating}
                movie={movie}
              />
            </div>
          </div>
          <div className='col-md-6'>
            {movies.map(movie => {
              return (
                <div
                  key={movie.id}
                  className='card p-3 mb-3 flex-row d-flex justify-content-between'>
                  <h3 className='m-0'>
                    {movie.title}{' '}
                    <small className='text-secondary'>{movie.year}</small>
                  </h3>
                  <div>
                    <button
                      className='btn btn-sm btn-dark me-1'
                      onClick={() => handleClickEdit(movie)}>
                      Edit
                    </button>
                    <button
                      onClick={() => handleClickDelete(movie)}
                      className='btn btn-sm btn-outline-secondary me-1'>
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <DeleteMovieModal
        activeMovie={movie}
        handleDelete={handleDelete}
        open={showDeleteMovieModal}
      />
    </>
  );
};

export default Movies;
