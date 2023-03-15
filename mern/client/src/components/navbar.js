import React from "react";
import logo from "../public/rocketLogo.png"
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink, Link } from "react-router-dom";
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
// Here, we display our Navbar
export default function Navbar() {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
        <img style={{"width" : 20 + '%'}} src={logo} alt="Logo"></img>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/create">
                Create Agent
              </NavLink>
            </li>
          </ul>
        </div> */}

        {user && (
            <div style={{ padding: 30 }}>
              <span>{user.email} </span>
              <button onClick={handleClick}>Log out</button>
            </div>
        )}

        {!user && (
            <div style={{ padding: 30 }}>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
        )}

      </nav>
    </div>
  );
}
