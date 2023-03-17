import React, { useEffect, useState } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { useAuthContext } from "../hooks/useAuthContext";
import Alertsuccess from '../alerts/alertsuccess';

function Transaction() {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [agents, setAgents] = useState([]);

  const text = "A New Transaction Created"
  const [show, setShow] = useState(false);
  const [showconfirm, setShowconfirm] = useState(false);
  const handleShow = () => setShowconfirm(true)
  const handleClose = () => setShowconfirm(false)

  const [form, setForm] = useState({
    amount: "",
    agent_id: ""
  });

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/record/`, {
        headers: {'Authorization': `Bearer ${user.token}`}
      });

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const agents = await response.json();
      setAgents(agents);
    }

    if (user) {
      getRecords();
    }
    
    return; 
  }, [agents.length, user])

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in')
      console.log(error);
      return
    }

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newTransaction = { ...form };

    await fetch("http://localhost:5000/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(newTransaction),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({ amount: "", agent_id: ""});
    
    setShowconfirm(false)
    setShow(true)
    setTimeout(() => {
      setShow(false)
    }, 3000);
  }

  return (
    <div>
      <Alertsuccess show={show} setShow={setShow} text={text}/>
      {agents.length > 0 && 
      <div>
        <h3>Transactions:</h3>
        <br/>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Amount ($)</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>14/01/2022</td>
              <td>9500</td>
              <td>Mark</td>
              <td>Otto</td>
            </tr>
            <tr>
              <td>2</td>
              <td>15/12/2021</td>
              <td>8000</td>
              <td>Jacob</td>
              <td>Thornton</td>
            </tr>
            <tr>
              <td>3</td>
              <td >01/06/2021</td>
              <td >10000</td>
              <td>Larry</td>
              <td>derek</td>
            </tr>
          </tbody>
        </Table>

        <form>
          
          <Modal show={showconfirm} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Creating a New Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to continue?</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={onSubmit}>
                Yes
              </Button>
              <Button variant="danger" onClick={handleClose}>
                No
              </Button>
            </Modal.Footer>
          </Modal>

          <Row className="g-2">
            <Col md>
              <div className="form-group">
                <label htmlFor="amount">Amount of Transaction ($) :</label>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  value={form.amount}
                  onChange={(e) => updateForm({ amount: e.target.value })}
                />
              </div>
            </Col>
            <Col md>
              <div className="form-group">
                <label>Select an Agent:</label>
                <select
                  className="form-control"
                  aria-label="Agent Select"
                  onChange={(e) => updateForm({ agent_id: e.target.value })}
                >
                  <option value=''>-----</option>
                  {agents.map(agent => (
                    <option key={agent._id} value={agent._id}>
                      {agent.first_name} {agent.last_name} - id: {agent._id}
                    </option>
                  ))}
                </select>
              </div>
            </Col>
            <Col xs='2'>
              <div className="form-group">
                <Button variant="primary" onClick={handleShow}>
                  Submit
                </Button>
              </div>
            </Col>
          </Row>

        </form>
      </div>
      }
    </div>
  );
}

export default Transaction;