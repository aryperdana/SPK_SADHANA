import React from "react";
import { Modal } from "react-bootstrap";

const AddModal = ({ modalShow, setModalShow, Body, menu }) => {
  return (
    <Modal show={modalShow} onHide={() => setModalShow(false)}>
      <Modal.Header closeButton style={{ backgroundColor: "white" }}>
        <Modal.Title>Tambah Data {menu}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "white" }}>{Body}</Modal.Body>
    </Modal>
  );
};

export default AddModal;
