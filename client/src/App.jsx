// client/src/App.jsx
import React from 'react';
import './App.css';
import DogCard from './components/DogCard';

function App() {
  const coco={
    name: "CoCo",
    breed: "Shih-tzu",
    age: 2,
    image: "/CoCo.JPG",
    caption: "I am the naughty younger one at home, woof woof."
  }
  return (
    <div className="app">
      <header className="hero">
        <h1>🐾WhatTheWoof</h1>
        <p>Funny dogs. Punny captions. Endless smiles.</p>
        <button>Explore Gallery</button>
      </header>

      <section className="dog-card-section">
        <DogCard {...coco} />
      </section>
    </div>
  );
}

export default App;
