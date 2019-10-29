const express = require('express');
const morgan = require('morgan');

const app = express();

// Settings 
app.set('port', process.env.PORT || 4000);


// Static files
app.use(express.static(__dirname + '/public'));


// Start server
app.listen(app.get('port'), () => {
    console.log("server on port " + app.get('port'));
});

