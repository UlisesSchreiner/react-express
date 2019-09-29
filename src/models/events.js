const mongoose = require('mongoose');

const { Schema } = mongoose;

const TaskSchema = new Schema({
    i: Number,
    t: Number
});

module.exports = mongoose.model('events', TaskSchema);