import React from "react";
import { Button } from "react-bootstrap";

const AddButton = ({ text, onClick, size }) => {
  return (
    <div>
      <Button
        size="sm"
        onClick={onClick}
        className="btn btn-primary px-4"
        style={{ minHeight: 40, minWidth: 120 }}
      >
        {text}
      </Button>
    </div>
  );
};

export default AddButton;
