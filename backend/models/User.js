// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    selectedBatch: String,
//   userId : String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
