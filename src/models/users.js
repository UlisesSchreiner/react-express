const mongoose = require('mongoose');

const { Schema } = mongoose;

const TaskSchema = new Schema({
    name: String,
    password: String,
    devices: Array
});

module.exports = mongoose.model('users', TaskSchema);