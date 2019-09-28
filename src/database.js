const mongoose = require('mongoose');

const URI = 'mongodb://localhost/mern-tasks';

mongoose.connect(URI)
.then(db => console.log('DB is connected'))
.catch(err => console.log("DB no conneced " + err));

module.exports = mongoose;
