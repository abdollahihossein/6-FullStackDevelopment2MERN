import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

import { useAuthContext } from "../hooks/useAuthContext";
import Alertsuccess from '../alerts/alertsuccess';
import Failedtransaction from "../alerts/failedtransaction";

let text2
let isFirst = true

function Transaction() {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [agents, setAgents] = useState([]);
  const [records, setRecords] = useState([]);
  const [render, setRender] = useState(false)

  const text = "A New Transaction Created"
  
  const [show, setShow] = useState(false);
  const [showconfirm, setShowconfirm] = useState(false);
  const [showfail, setShowfail] = useState(false);
  const handleShow = () => setShowconfirm(true)
  const handleClose = () => setShowconfirm(false)

  const [form, setForm] = useState({
    amount: "",
    agent_id: ""
  });

  const Record = (props) => (
    <tr>
      <td>{props.record.counter}</td>
      <td>{props.record.date}</td>
      <td>{props.record.amount}</td>
      <td>{props.record.first_name}</td>
      <td>{props.record.last_name}</td>
    </tr>
  );

  // This method fetches the transactions from the database.
  useEffect(() => {
    async function getTransaction() {
      const response = await fetch(`http://localhost:5000/transaction-data`, {
        headers: {'Authorization': `Bearer ${user.token}`}
      });

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const info = await response.json();

      let j = 0
      for (let record of info) {
        const response = await fetch(`http://localhost:5000/record/${record.agent_id}`, {
          headers: {'Authorization': `Bearer ${user.token}`}
        });

        if (!response.ok) {
          const message = `An error occured: ${response.statusText}`;
          window.alert(message);
          return;
        }
        
        let info2 = await response.json();
        
        records[j] = {
          counter: j + 1,
          date: info[j].date,
          amount: info[j].amount,
          first_name: info2.first_name,
          last_name: info2.last_name
        }
        
        j++
      }
      
      setRecords(records);
    }
    
    if (user) {
      getTransaction();
    }
    
    return;
  }, [render, records, user])

  if (isFirst) {
    setTimeout(() => {
      setRender(!render)
      isFirst = false
    }, 1300);
  }
  
  // This method fetches the agents from the database.
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

    setRender(!render)
    setShowconfirm(false)

    if (newTransaction.amount > 0 && newTransaction.agent_id !== "") {
      setForm({ amount: "", agent_id: ""});
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 3000);
    }

    if (newTransaction.amount <= 0) {
      text2 = "Amount of transaction has to be positive!"
      setShowfail(true)
      setTimeout(() => {
        setShowfail(false)
      }, 3000);
    }

    if (newTransaction.agent_id === "") {
      text2 = "An agent must be chosen!"
      setShowfail(true)
      setTimeout(() => {
        setShowfail(false)
      }, 3000);
    }
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          key={record._id}
        />
      );
    });
  }

  return (
    <div>
      <Alertsuccess show={show} setShow={setShow} text={text}/>
      <Failedtransaction show={showfail} setShow={setShowfail} text={text2}/>
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
          <tbody>{recordList()}</tbody>
        </Table>

        <Form>
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
              <InputGroup>
                <FloatingLabel controlId="floatingAmount" label="Amount of Transaction ($) :">
                  <Form.Control 
                    type="number"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={(e) => updateForm({ amount: e.target.value })}
                  />
                </FloatingLabel>
              </InputGroup>
            </Col>
            <Col md>
              <InputGroup>
                <Form.Select
                  aria-label="Default select example"
                  value={form.agent_id}
                  onChange={(e) => updateForm({ agent_id: e.target.value })}
                  >
                  <option value=''>Select an Agent:</option>
                  {agents.map(agent => (
                    <option key={agent._id} value={agent._id}>
                      {agent.first_name} {agent.last_name} - id: {agent._id}
                    </option>
                  ))}
                </Form.Select>
              </InputGroup>
            </Col>
            <Col xs='2'>
              <InputGroup>
                <Button variant="primary" onClick={handleShow}>
                  Submit
                </Button>
              </InputGroup>
            </Col>
          </Row>
        </Form>
          
      </div>
      }
    </div>
  );
}

export default Transaction;