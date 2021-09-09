import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import TokenBox from "./TokenBox";

import useGenres from "../hooks/useGenres";
import { Link } from "react-router-dom";

const GenreSelect = ({ selected, setSelected }) => {
  const { getAllGenres } = useGenres();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getAllGenres().then((result) => {
      setOptions(result);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form.Group>
      <div className="d-flex justify-content-between">
        <label>Genre(s)</label>
        <Link to="/genres">Genre Settings</Link>
      </div>

      <TokenBox
        options={options}
        placeholder="Select genres..."
        formLabel="Genres"
        selected={selected}
        setSelected={setSelected}
        labelKey="label"
      />
    </Form.Group>
  );
};

export default GenreSelect;
