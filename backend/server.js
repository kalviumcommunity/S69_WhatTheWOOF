const express = require('express');
const mongoose= require('mongoose');
require('dotenv').config();
const app = express();
app.use(express.json());
const PORT = 3000;
const MONGO_URI= process.env.MONGO_URI;
const routes = require('./routes/routes');
const cors=require('cors');
const authRoutes=require("./routes/auth")
app.use(routes);
app.use(cors());
app.use('/api',routes);
app.use('/api',authRoutes);


app.use(cors({
  origin: 'http://localhost:5173',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

mongoose.connect(MONGO_URI).then(()=>console.log("Connected to database")).catch((err)=>console.log('Falied: ', err));


app.get('/', (req, res) => {
  const status= mongoose.connection.readyState===1 ? "Connected" : "Not Connected";
  res.status(200).json({message: "Welcome to WhatTheWoof", database: status});
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
