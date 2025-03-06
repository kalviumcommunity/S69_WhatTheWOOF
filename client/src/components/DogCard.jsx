// components/DogCard.jsx
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DogCard = ({ _id, name, breed, age, caption, onDelete }) => {
  const handleDelete = () => {
    axios
      .delete(`http://localhost:3000/api/items/${_id}`)
      .then(() => {
        onDelete(_id); // Notify the parent component to remove the dog from the list
        alert('Dog deleted successfully!');
      })
      .catch((error) => {
        console.error('Error deleting dog:', error);
      });
  };

  return (
    <div className="dog-card">
      <h3>{name}</h3>
      <p>{breed}, {age} years old</p>
      <p>{caption}</p>
      <button onClick={handleDelete}>Delete</button>
      <Link to={`/update/${_id}`}>Edit</Link> {/* Add a link to the update page */}
    </div>
  );
};

export default DogCard;