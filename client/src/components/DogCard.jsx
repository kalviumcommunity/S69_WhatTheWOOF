import React from "react";
import './DogCard.css';

const DogCard=({name, breed, age, image, caption})=>{
    return(
        <div className="dog-card">
            <img src={image} alt={name} className="dog-image"></img>
            <div className="dog-info">
                <h2>{name}</h2>
                <p>{breed}, {age} years old</p>
                <p className="dog-caption">{caption}</p>
            </div>
        </div>
    );
};
export default DogCard;
