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

  // Fetch dogs from the server
  useEffect(() => {
    fetch(`http://localhost:3000/api/items`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched dog data:', data);
        setDogs(data.items);
      })
      .catch((err) => console.log('Error:', err));
  }, []);

  // Handle deleting a dog
  const handleDelete = (id) => {
    setDogs(dogs.filter((dog) => dog._id !== id));
  };

  return (
    <Router>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <div className="app">
              <header className="hero">
                <h1>🐾WhatTheWoof</h1>
                <p>Funny dogs. Punny captions. Endless smiles.</p>
                <button>Explore Gallery</button>
              </header>

              <section className="dog-card-section">
                {dogs.length > 0 ? (
                  dogs.map((dog) => (
                    <DogCard key={dog._id} {...dog} onDelete={handleDelete} />
                  ))
                ) : (
                  <p>Loading dog images...</p>
                )}
              </section>
            </div>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path='/login' element={<Login/>}/>
        <Route path="/update/:id" element={<UpdateDog />} /> {/* Add route for update page */}
      </Routes>
    </Router>
  );
}

export default App;