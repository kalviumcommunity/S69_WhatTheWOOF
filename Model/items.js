const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  image: { type: String, required: true },  // Ensure consistency with request body
  caption: { type: String, required: true }
});

module.exports = mongoose.model('Item', itemSchema);
