import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Alertsuccess from '../alerts/alertsuccess'

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
      <button className="btn btn-link"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const { user } = useAuthContext();

  const text = "Deleted"
  const [show, setShow] = useState(false);
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
  }, [records.length, user]);

  // This method will delete a record
  async function deleteRecord(id) {

    if (!user) {
      return
    }

    setShow(true)
    setTimeout(() => {
      setShow(false)
    }, 3000);

    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
      headers: {'Authorization': `Bearer ${user.token}`}
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <Alertsuccess modalshow={show} text={text}/>
      <h3>Agent List</h3>
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
