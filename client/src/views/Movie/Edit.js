import { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import useMovies from '../../hooks/useMovies';
import GenreSelect from '../../components/GenreSelect';
import ActorSelect from '../../components/ActorSelect';
import FileUpload from '../../components/FileUpload';

const MovieEdit = () => {
  const { updateMovie, getMovie } = useMovies();

  let { id } = useParams();
  let history = useHistory();

  const [displayTitle, setDisplayTitle] = useState('');
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');

  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);

  useEffect(() => {
    getMovie(id).then(movie => {
      console.log(movie);

      setDisplayTitle(movie.title);
      setTitle(movie.title);
      setYear(movie.year);
      setGenres(movie.genres);
      setActors(movie.actors);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const movie = {
      id,
      title,
      year,
      genres,
      actors,
    };
    console.log(movie);
    await updateMovie(movie);
    // history.push('/movies');
  };

  return (
    <div className='container py-3'>
      <small>
        <Link to='/movies'>Back</Link>
      </small>
      <h2>{displayTitle}</h2>

      <div style={{ maxWidth: 500 }}>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='title' className='form-label'>
              Title
            </label>
            <input
              type='text'
              className='form-control'
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='year' className='form-label'>
              Year
            </label>
            <input
              type='number'
              className='form-control'
              value={year}
              onChange={e => setYear(e.target.value)}
            />
          </div>

          <GenreSelect movieId={id} selected={genres} setSelected={setGenres} />
          <ActorSelect movieId={id} selected={actors} setSelected={setActors} />

          <div className='mb-3'>
            <FileUpload />
          </div>

          <div className='pt-2'>
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
            <button
              onClick={() => history.push('/movies')}
              className='btn btn-secondary ml-1 ms-1'>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieEdit;
