import { Typeahead } from "react-bootstrap-typeahead";

const TokenBox = ({
  options,
  placeholder,
  formLabel,
  setSelected,
  selected,
  labelKey,
}) => {
  return (
    <Typeahead
      id="typahead-token-box"
      labelKey={labelKey}
      multiple
      onChange={setSelected}
      options={options}
      placeholder={placeholder}
      selected={selected}
    />
  );
};

export default TokenBox;
