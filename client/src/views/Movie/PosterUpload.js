import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import InputFileUpload from '../../components/InputFileUpload';
import useMovies from '../../hooks/useMovies';

const PosterUpload = () => {
  let { id } = useParams();
  const { getMovie } = useMovies();

  const [posterImg, setPosterImg] = useState(null);
  const [movieTitle, setMovieTitle] = useState(null);

  useEffect(() => {
    if (id)
      getMovie(id).then(res => {
        console.log(res);
        setPosterImg(res.poster);
        setMovieTitle(res.title);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container py-4'>
      {id && <Link to={`/movies/edit/${id}`}>Back to "{movieTitle}"</Link>}
      <h2 className='h3 mb-4'>
        Movie Poster
      </h2>
      {posterImg && (
        <img
          src={`/images/${posterImg}`}
          alt='Movie Poster'
          style={{ maxWidth: 300 }}
        />
      )}
      <div className='my-4'>
        <InputFileUpload movieId={id} />
      </div>
      <div className="pt-3">
        <Link to={`/movies/edit/${id}`} className="btn btn-secondary">Done</Link>
      </div>
    </div>
  );
};

export default PosterUpload;
