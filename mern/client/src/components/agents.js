import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Alertsuccess from '../alerts/alertsuccess';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import "bootstrap/dist/css/bootstrap.css";

export default function Agents() {
  const [records, setRecords] = useState([]);
  const { user } = useAuthContext();

  const text = "An Agent Deleted"
  const [show, setShow] = useState(false);
  const [showconfirm, setShowconfirm] = useState(false);
  const [agenttodelete, setAgenttodelete] = useState(null);
  
  const handleShow = (id) => {
    setShowconfirm(true)
    setAgenttodelete(id)
  }
  const handleClose = () => {
    setShowconfirm(false)
    setAgenttodelete(null)
  }

  const Record = (props) => (
    <tr>
      <td>{props.record.first_name}</td>
      <td>{props.record.last_name}</td>
      <td>{props.record.email}</td>
      <td>{props.record.region}</td>
      <td>{props.record.rating}</td>
      <td>{props.record.fee}</td>
      <td>
        <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
        <button className="btn btn-link" onClick={() => {handleShow(props.record._id)}}>
          Delete
        </button>
      </td>
    </tr>
  );

  // This method fetches the records from the database.
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

      const records = await response.json();
      setRecords(records);
    }

    if (user) {
      getRecords();
    }
    
    return; 
  }, [records.length, user])

  // This method will delete a record
  async function deleteRecord(id) {

    if (!user) {
      return
    }

    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
      headers: {'Authorization': `Bearer ${user.token}`}
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);

    handleClose();
    setShow(true)
    setTimeout(() => {
      setShow(false)
    }, 3000);
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          handleShowdeletemodal={handleShow}
          key={record._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <Alertsuccess show={show} setShow={setShow} text={text}/>
      <Modal show={showconfirm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deleting an Agent</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to continue?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() =>  deleteRecord(agenttodelete)}>
            Yes
          </Button>
          <Button variant="danger" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/create">
                Create Agent
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <h3>Agent Management</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Region</th>
            <th>Rating</th>
            <th>Fee</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}
