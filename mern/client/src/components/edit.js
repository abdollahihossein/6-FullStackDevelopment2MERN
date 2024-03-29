import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuthContext } from '../hooks/useAuthContext';
import Alertsuccess from '../alerts/alertsuccess';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Edit() {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);

  const text = "An Agent Updated"
  const [show, setShow] = useState(false);
  const [showconfirm, setShowconfirm] = useState(false);
  const handleShow = () => setShowconfirm(true)
  const handleClose = () => setShowconfirm(false)

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    region: "",
    rating: "",
    fee: "",
    records: []
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`, {
        headers: {'Authorization': `Bearer ${user.token}`}
      });

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/agents");
        return;
      }

      setForm(record);
    }

    if (user) {
      fetchData();
    }

    return;
  }, [params.id, navigate, user]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in')
      console.log(error);
      return
    }

    const editedPerson = {
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      region: form.region,
      rating: form.rating,
      fee: form.fee
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
    });

    setShowconfirm(false)
    setShow(true)
    setTimeout(() => {
      navigate("/agents")
    }, 3000);
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <Alertsuccess show={show} setShow={setShow} text={text}/>
      <h3>Update Agent</h3>
      <form>

        <Modal show={showconfirm} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Updating an Agent</Modal.Title>
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

        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstname"
            value={form.first_name}
            onChange={(e) => updateForm({ first_name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastname"
            value={form.last_name}
            onChange={(e) => updateForm({ last_name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={form.email}
            onChange={(e) => updateForm({ email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            className="form-control"
            id="rating"
            value={form.rating}
            onChange={(e) => updateForm({ rating: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fee">Fee</label>
          <input
            type="number"
            className="form-control"
            id="fee"
            value={form.fee}
            onChange={(e) => updateForm({ fee: e.target.value })}
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionNorth"
              value="North"
              checked={form.region === "North"}
              onChange={(e) => updateForm({ region: e.target.value })}
            />
            <label htmlFor="positionNorth" className="form-check-label">North</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionEast"
              value="East"
              checked={form.region === "East"}
              onChange={(e) => updateForm({ region: e.target.value })}
            />
            <label htmlFor="positionEast" className="form-check-label">East</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionSouth"
              value="South"
              checked={form.region === "South"}
              onChange={(e) => updateForm({ region: e.target.value })}
            />
            <label htmlFor="positionSouth" className="form-check-label">South</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionWest"
              value="West"
              checked={form.region === "West"}
              onChange={(e) => updateForm({ region: e.target.value })}
            />
            <label htmlFor="positionWest" className="form-check-label">West</label>
          </div>
        </div>
        <br />

        <div className="form-group">
          <Button variant="primary" onClick={handleShow}>
            Update Agent
          </Button>
        </div>

      </form>
    </div>
  );
}
