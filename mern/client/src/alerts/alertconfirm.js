import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Alertconfirm({showconfirm, setShowconfirm, setConfirm}) {

  const handleconfirm = () => {
    setConfirm(true)
    setShowconfirm(false)
  }
  const handlereject = () => setShowconfirm(false)

  return (
    <>
      <Modal show={showconfirm} onHide={handlereject}>
        <Modal.Header closeButton>
          <Modal.Title>Update Agent</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to continue?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleconfirm}>
            Yes
          </Button>
          <Button variant="danger" onClick={handlereject}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Alertconfirm