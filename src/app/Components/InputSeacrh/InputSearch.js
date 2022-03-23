import React from "react";
import { Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const InputSearch = ({ onClick, onChange, value }) => {
  return (
    <form>
      <div className="input-group">
        <Form.Control
          type="text"
          className="form-control"
          placeholder="Cari..."
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={onChange}
          value={value}
          size="sm"
        />
        <div className="input-group-append">
          <button className="btn btn-sm btn-primary" type="submit" onClick={onClick}>
            <FaSearch />
          </button>
        </div>
      </div>
    </form>
  );
};

export default InputSearch;
