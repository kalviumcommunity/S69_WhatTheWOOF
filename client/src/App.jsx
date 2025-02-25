// client/src/App.jsx
import React, { useEffect, useState } from 'react';
import './App.css';
import DogCard from './components/DogCard';


function App() {
  const [dogs, setDogs]=useState([]);

  useEffect(()=>{
    fetch(`http://localhost:3000/api/items`)
    .then((res)=>res.json())
    .then((data) => {
      console.log("Fetched dog data:", data);
      setDogs(data.items);
    })
    .catch((err)=>console.log("Errors: ", err))
  },[]);
  
  return (
    <div className="app">
      <header className="hero">
        <h1>🐾WhatTheWoof</h1>
        <p>Funny dogs. Punny captions. Endless smiles.</p>
        <button>Explore Gallery</button>
      </header>

      <section className="dog-card-section">
      {dogs.length > 0 ? (
          dogs.map((dog) => <DogCard key={dog._id} {...dog} />)
        ) : (
          <p>Loading dog images...</p>
        )}
      </section>
    </div>
  );
}

export default App;
