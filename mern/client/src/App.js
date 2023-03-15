import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from './hooks/useAuthContext'

// We import all the components we need in our app
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from "./components/navbar";
import Agents from "./components/agents";
import Edit from "./components/edit";
import Create from "./components/create";
import Home from "./pages/home"

const App = () => {
  const { user } = useAuthContext()

  return (
    <div>
      <Navbar />
      <div style={{ margin: 60 }}>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
        <Route exact path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/agents" element={user ? <Agents /> : <Navigate to="/login" />} />
        <Route path="/create" element={user ? <Create /> : <Navigate to="/login" />} />
        <Route path="/edit/:id" element={user ? <Edit /> : <Navigate to="/login" />} />
      </Routes>
      </div>
    </div>
  );
};

export default App;
