import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function Failedlogin({error}) {
  const [show, setShow] = useState(true);
  return (
    <ToastContainer position='top-center'>
      <Toast bg='danger' onClose={() => setShow(false)} show={show} delay={5000} autohide>
        <Toast.Header>
          <strong className="me-auto">Error!</strong>
        </Toast.Header>
        <Toast.Body>{error}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default Failedlogin