import { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import useMovies from '../../hooks/useMovies';
import GenreSelect from '../../components/GenreSelect';
import ActorSelect from '../../components/ActorSelect';
import SelectRating from '../../components/SelectRating';
import InputTitle from '../../components/InputTitle';
import InputYear from '../../components/InputYear';

const MovieEdit = () => {
  const { updateMovie, getMovie } = useMovies();
  let { id } = useParams();
  let history = useHistory();

  const [displayTitle, setDisplayTitle] = useState('');
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  // const [formPoster, setFormPoster] = useState('');

  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);

  useEffect(() => {
    getMovie(id).then(movie => {
      console.log('edit movie --> ', movie);
      setDisplayTitle(movie.title);
      setTitle(movie.title);
      setYear(movie.year);
      setGenres(movie.genres);
      setActors(movie.actors);
      setRating(movie.rating);
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
      rating,
    };
    // todo: lose this
    console.log('update movie, submit --> ', movie);
    await updateMovie(movie);

    toast.success('Updated!');
  };

  return (
    <>
      <ToastContainer position='bottom-left' icon={false} />
      <div className='container py-3'>
        <Link to='/movies'>Back</Link>
        <h2>{displayTitle}</h2>

        <div style={{ maxWidth: 500 }}>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <InputTitle setTitle={setTitle} title={title} />
            </div>
            <div className='mb-3'>
              <InputYear setYear={setYear} year={year} />
            </div>
            <div className='mb-3'>
              <SelectRating setMovieRating={setRating} movieRating={rating} />
            </div>
            <GenreSelect
              movieId={id}
              selected={genres}
              setSelected={setGenres}
            />
            <ActorSelect
              movieId={id}
              selected={actors}
              setSelected={setActors}
            />
            <div className='mt-4'>
              <Link to={`/movies/poster/${id}`} className='btn btn-info'>
                Set Movie Poster
              </Link>
            </div>

            <hr className='my-3' />

            <div className='mt-3 pt-2'>
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
    </>
  );
};

export default MovieEdit;
