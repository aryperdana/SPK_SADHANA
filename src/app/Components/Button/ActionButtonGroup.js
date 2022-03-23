import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { FaClipboardList, FaEdit, FaEraser } from "react-icons/fa";

const ActionButtonGroup = ({ onClickEdit, onClickDelete, onClickDetail }) => {
  return (
    <ButtonGroup size="sm">
      <button className="btn btn-outline-info" onClick={onClickDetail}>
        <FaClipboardList />
      </button>
      <button className="btn btn-outline-success" onClick={onClickEdit}>
        <FaEdit />
      </button>
      <button className="btn btn-outline-danger" onClick={onClickDelete}>
        <FaEraser />
      </button>
    </ButtonGroup>
  );
};

export default ActionButtonGroup;
