//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve static files....
app.use(express.static(__dirname + '/dist/tecxam'));

// Send all requests to index.html
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/tecxam/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);