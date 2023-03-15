import React from 'react';
import Modal from 'react-bootstrap/Modal';

function Alertsuccess({show, setShow, text}) {

  const handleClose = () => setShow(false)

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ justifyContent: 'center', background: 'lightgreen' }} closeButton>
          <Modal.Title>Agent {text}!</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: 'lightgreen' }}/>
        <Modal.Footer style={{ background: 'lightgreen' }}/>
      </Modal>
    </>
  );
}

export default Alertsuccess