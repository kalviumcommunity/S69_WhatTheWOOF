import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateDog = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    caption: '',
  });

  
  useEffect(() => {
    axios.get(`http://localhost:3000/api/items/${id}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching dog data:', error);
      });
  }, [id]);

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/api/items/${id}`, formData)
      .then(() => {
        alert('Dog updated successfully!');
        navigate('/'); 
      })
      .catch((error) => {
        console.error('Error updating dog:', error);
      });
  };

  return (
    <div>
      <h2>Update Dog</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name of your Dog"
        />
        <input
          type="text"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
          placeholder="Breed of your Dog"
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age of your Dog"
        />
        <input
          type="text"
          name="caption"
          value={formData.caption}
          onChange={handleChange}
          placeholder="Caption of your Dog"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateDog;