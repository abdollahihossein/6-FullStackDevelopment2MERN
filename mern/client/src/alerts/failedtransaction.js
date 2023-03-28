import React from 'react';
import Modal from 'react-bootstrap/Modal';

function Failedtransaction({show, setShow, text}) {

  const handleClose = () => setShow(false)

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ justifyContent: 'center', background: 'orange' }} closeButton>
          <Modal.Title>{text}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: 'orange' }}/>
        <Modal.Footer style={{ background: 'orange' }}/>
      </Modal>
    </>
  );
}

export default Failedtransaction