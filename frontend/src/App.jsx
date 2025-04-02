// client/src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import DogCard from './components/pages/DogCard';
import Signup from './components/pages/Signup';
import UpdateDog from './components/pages/UpdateDog';
import Login from './components/pages/Login';

function App() {
  const [dogs, setDogs] = useState([]);
  const [users, setUsers] = useState([]); // Store users for dropdown
  const [selectedUser, setSelectedUser] = useState(''); // Store selected user

  // Fetch users for dropdown
  useEffect(() => {
    fetch('http://localhost:3000/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log('Error fetching users:', err));
  }, []);

  // Fetch dogs (filtered by user if selected)
  useEffect(() => {
    const url = selectedUser
      ? `http://localhost:3000/api/items?created_by=${selectedUser}`
      : 'http://localhost:3000/api/items';

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched dog data:', data);
        setDogs(data.items);
      })
      .catch((err) => console.log('Error:', err));
  }, [selectedUser]);

  // Handle deleting a dog
  const handleDelete = (id) => {
    setDogs(dogs.filter((dog) => dog._id !== id));
  };

  return (
    <Router>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/">Home</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <div className="app">
              <header className="hero">
                <h1>🐾 WhatTheWoof</h1>
                <p>Funny dogs. Punny captions. Endless smiles.</p>
                <button className="cta-button">Explore Gallery</button>
              </header>

              {/* User Selection Dropdown */}
              <div className="user-filter">
                <label>Select User:</label>
                <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                  <option value="">All Users</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dog Cards Section */}
              <section className="dog-card-section">
                {dogs.length > 0 ? (
                  <div className="dog-card-grid">
                    {dogs.map((dog) => (
                      <DogCard key={dog._id} {...dog} onDelete={handleDelete} />
                    ))}
                  </div>
                ) : (
                  <p className="no-dogs-message">No dogs found for this user.</p>
                )}
              </section>
            </div>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path="/update/:id" element={<UpdateDog />} />
      </Routes>
    </Router>
  );
}
export default App;
