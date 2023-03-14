import React from 'react';
import Modal from 'react-bootstrap/Modal';

function Alertsuccess({modalshow, text}) {

  return (
    <>
      <Modal show={modalshow}>
        <Modal.Header style={{ justifyContent: 'center', background: 'lightgreen' }}>
          <Modal.Title>Agent {text}!</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: 'lightgreen' }}/>
        <Modal.Footer style={{ background: 'lightgreen' }}/>
      </Modal>
    </>
  );
}

export default Alertsuccess