import React, { useState, useEffect } from "react";

const Signup=()=>{
    const [formData, setFormData]= useState({name:"", breed:"", age:"", caption:""});
    const [users, setUsers]=useState([]);

    useEffect(()=>{
        fetch("http://localhost:3000/api/items")
        .then((res)=>res.json())
        .then((data)=>setUsers(data))
        .catch((err)=>console.log("Error fetching users: ", err))
    },[]);

    const handleSubmit=(e)=>{
        e.preventDefault();
        fetch("http://localhost:3000/api/items",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(formData),
        })
        .then((res)=>{
            if (!res.ok) throw new Error("Failed to add user");
            return res.json();
        })
        .then((newUser)=>{
            setUsers(users.concat(newUser.newUser));
            setFormData({name:"", breed:"",age:"",caption:""});
        })
        .catch((err)=>console.log("Error adding item: ", err))
    };


return(
    <div className="signup-container">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit} className="signup-form">
            <input type="text" name="name" placeholder="Name" value={formData.name} required></input>
            <input type="text" name="breed" placeholder="Breed" value={formData.breed} required></input>
            <input type="number" name="age" placeholder="Age" value={formData.age}></input>
            <input type="text" name="caption" placeholder="Caption" value={formData.caption}></input>
            <button type="submit">Signup</button>
        </form>
    </div>
)
};

export default Signup;