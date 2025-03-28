const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  caption: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};
const DogSchema = new mongoose.Schema({
  name: String,
  breed: String,
  age: Number,
  caption: String,
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Add this
});

module.exports = mongoose.model('Dog', DogSchema);

module.exports = mongoose.model("User", UserSchema);
