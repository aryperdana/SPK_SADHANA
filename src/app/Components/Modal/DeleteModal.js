import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FaEraser } from "react-icons/fa";

const DeleteModal = ({ show, onHide, title, value, onClick }) => {
  return (
    <div>
      <Modal show={show} onHide={onHide}>
        <Modal.Header style={{ backgroundColor: "white" }} closeButton>
          <b className="text-danger">
            <FaEraser className="mr-4" />
            Delete Data {title}
          </b>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "white" }} className="text-center">
          <b>Apakah Anda Yakin Menghapus Data ?</b>
          <p>
            Anda Akan Mengapus : <b>{value}</b>
          </p>
          <div className="d-flex justify-content-center">
            <Button size="sm" className="btn btn-dark px-4" onClick={onHide}>
              Batal
            </Button>
            <Button size="sm" className="btn btn-danger px-4" onClick={onClick}>
              Hapus Data
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DeleteModal;
