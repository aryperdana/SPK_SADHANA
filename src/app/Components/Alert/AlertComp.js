import React from "react";
import { Alert } from "react-bootstrap";

const AlertComp = ({ text, onClose, variant }) => {
  return (
    <Alert variant={variant} onClose={onClose} dismissible>
      <div className="my-2" style={{ fontSize: 18 }}>
        {text}
      </div>
    </Alert>
  );
};

export default AlertComp;
