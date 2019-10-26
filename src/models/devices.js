const mongoose = require('mongoose');

const { Schema } = mongoose;

const TaskSchema = new Schema({
    _id: Number,
    i: Number,
    e: Number,
    user: String,
    name: String,
    password: String,
    type: Number
});

module.exports = mongoose.model('devices', TaskSchema);