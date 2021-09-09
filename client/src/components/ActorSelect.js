import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import TokenBox from "./TokenBox";

import useActors from "../hooks/useActors";
import { Link } from "react-router-dom";

const ActorSelect = ({ selected, setSelected }) => {
  const { getAllActors } = useActors();

  const [options, setOptions] = useState([]);

  useEffect(() => {
    getAllActors().then((result) => setOptions(result));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form.Group>
      <div className="d-flex justify-content-between">
        <label>Actor(s)</label>
        <Link to="/actors">Actor Settings</Link>
      </div>

      <TokenBox
        options={options}
        placeholder="Select actors..."
        formLabel="Actors"
        selected={selected}
        setSelected={setSelected}
        labelKey="name"
      />
    </Form.Group>
  );
};

export default ActorSelect;
