const express = require('express');
const morgan = require('morgan');

const { mongoose } = require('./database');

const app = express();

// Settings 
app.set('port', process.env.PORT || 4000);

// midelwares 
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/api',require('./routes/task.routes'));

// Static files
app.use(express.static(__dirname + '/public'));


// Start server
app.listen(app.get('port'), () => {
    console.log("server on port " + app.get('port'));
});

