import Form from 'react-bootstrap/Form';
import { Typeahead } from 'react-bootstrap-typeahead';

const TokenBox = ({
  options,
  placeholder,
  formLabel,
  setSelected,
  selected,
  labelKey,
}) => {
  return (
    <Form.Group>
      <Form.Label>{formLabel}</Form.Label>
      <Typeahead
        id='typahead-token-box'
        labelKey={labelKey}
        multiple
        onChange={setSelected}
        options={options}
        placeholder={placeholder}
        selected={selected}
      />
    </Form.Group>
  );
};

export default TokenBox;
