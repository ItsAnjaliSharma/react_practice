// models/User.js (Mongoose)
const mongoose = require('mongoose');

// Define the user schema
const getuserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create the User model from the schema
const getUser = mongoose.model('User', getuserSchema);

module.exports = getUser;
