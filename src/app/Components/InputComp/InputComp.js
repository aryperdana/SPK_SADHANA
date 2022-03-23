import React from "react";
import { Form } from "react-bootstrap";

const InputComp = ({
  label,
  type,
  id,
  placeholder,
  size,
  onChange,
  name,
  value,
  readOnly,
  isInvalid,
  errorsText,
}) => (
  <div>
    <Form.Group>
      <label>{label}</label>
      <Form.Control
        type={type}
        id={id}
        placeholder={placeholder}
        size={size}
        onChange={onChange}
        name={name}
        value={value}
        readOnly={readOnly}
        isInvalid={isInvalid}
      />
      <Form.Control.Feedback type="invalid">{errorsText}</Form.Control.Feedback>
    </Form.Group>

    {console.log("text", errorsText)}
  </div>
);

export default InputComp;
