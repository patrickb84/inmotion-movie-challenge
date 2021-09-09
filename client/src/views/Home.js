import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import useMovies from "../hooks/useMovies";
// import _ from 'lodash';

const Home = () => {
  const [movies, setMovies] = useState([]);

  const { getMoviesMap } = useMovies();

  useEffect(() => {
    getMoviesMap().then((movies) => {
      try {
        console.log(movies);
        setMovies(movies);
      } catch (error) {
        console.log(error);
        setMovies([]);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-fluid py-3">
      <div className="d-flex justify-content-between align-items-end mb-4">
        <h1 className="m-0">Movie Library</h1>
        <div>
          <SearchBar
            data={movies}
            setResults={setMovies}
            clearResults={getMoviesMap}
          />
        </div>
      </div>

      <div className="mt-3">
        <div className="row">
          {/* card */}
          {movies &&
            movies.map((movie) => {
              return (
                <div
                  className="mb-3 col-lg-3 col-xl-2 col-md-4 d-flex"
                  key={movie.id}
                >
                  <div className="card shadow">
                    <div className="card-body">
                      <img
                        src={`/images/${
                          movie.poster ? movie.poster : "poster_placeholder.jpg"
                        }`}
                        alt="poster"
                        className="w-100 mb-2"
                      />

                      <div className="text-info d-flex justify-content-between">
                        <span>{movie.year}</span>
                        <span>{movie.rating}</span>
                      </div>
                      <h4 className="h5">{movie.title}</h4>

                      {movie.genres.length > 0 && (
                        <div className="mb-3">
                          <ul className="list-unstyled mb-0">
                            {movie.genres.map((genre) => {
                              return (
                                <div
                                  className="badge badge-warning mr-1 me-1"
                                  key={genre}
                                >
                                  {genre}
                                </div>
                              );
                            })}
                          </ul>
                        </div>
                      )}

                      {movie.actors.length > 0 && (
                        <div className="mb-2">
                          <h5 className="h6">Starring</h5>
                          <ul className="list-unstyled mb-0">
                            {movie.actors.map((actor) => {
                              return <li key={actor}>{actor}</li>;
                            })}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="card-footer d-flex justify-content-between">
                      <Link to={`/movies/edit/${movie.id}`}>Edit</Link>
                      <Link
                        to={`/movies/delete/${movie.id}`}
                        className="text-danger"
                      >
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
