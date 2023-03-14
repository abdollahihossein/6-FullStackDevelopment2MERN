import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from '../hooks/useAuthContext';
import Alertsuccess from '../alerts/alertsuccess'

export default function Create() {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);

  const text = "Created"
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    region: "",
    rating: "",
    fee: ""
  });
  const navigate = useNavigate();

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
    
    setShow(true)

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };

    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(newPerson),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({ first_name: "", last_name: "", email: "", region: "", rating: "", fee: "" });
    setTimeout(() => {
      navigate("/")
    }, 3000);
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <Alertsuccess modalshow={show} text={text}/>
      <h3>Create New Agent</h3>
      <form onSubmit={onSubmit}>
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
          <input
            type="submit"
            value="Create Agent"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
