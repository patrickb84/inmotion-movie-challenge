import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ActorSelect from "../../components/ActorSelect";
import GenreSelect from "../../components/GenreSelect";
import useMovies from "../../hooks/useMovies";
import SelectRating from "../../components/SelectRating";
import InputTitle from "../../components/InputTitle";
import InputYear from "../../components/InputYear";

const MovieCreate = () => {
  const { addMovie } = useMovies();

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);
  const [rating, setRating] = useState("");

  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addedMovie = await addMovie({
        title,
        year,
        genres,
        actors,
        rating,
      });
      console.log(addedMovie);
      history.push("/movies");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container py-3">
      <small>
        <Link to="/movies">Back</Link>
      </small>
      <h2>Add Movie</h2>

      <div style={{ maxWidth: 500 }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <InputTitle setTitle={setTitle} title={title} />
          </div>
          <div className="mb-3">
            <InputYear setYear={setYear} year={year} />
          </div>
          <div className="mb-3">
            <SelectRating setMovieRating={setRating} movieRating={rating} />
          </div>

          <GenreSelect selected={genres} setSelected={setGenres} />
          <ActorSelect selected={actors} setSelected={setActors} />

          <div className="pt-2">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              onClick={() => history.push("/movies")}
              className="btn btn-secondary ms-1 ml-1"
            >
              Go Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieCreate;
