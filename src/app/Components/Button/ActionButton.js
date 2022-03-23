import React from "react";
import { Button, Spinner } from "react-bootstrap";

const ActionButton = ({ aksi, size, type, loading }) => {
  return (
    <div>
      <Button
        type={type}
        size={size}
        className={aksi === "add" ? "btn btn-primary" : "btn btn-success"}
      >
        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <div className="d-flex align-items-center">
              <Spinner animation="border" size="sm" />
              <div className="ml-2">Loading . . .</div>
            </div>
          </div>
        ) : (
          <span>Simpan</span>
        )}
      </Button>
    </div>
  );
};

export default ActionButton;
