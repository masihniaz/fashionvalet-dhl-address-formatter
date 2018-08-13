const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./routes/api');

// Set up express app.
const app = express();

// Enable cross origin resource sharing.
app.use(cors());

// Setup morgan for logging the request to the console.
app.use(morgan('dev'));

// Set up the body parsers for parsing request body.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Serve public folder middleware
app.use(express.static(path.join(__dirname,'public')));

// Initizalize routes
app.use(routes);

// Set up error handler middleware.
app.use(function(err, req, res, next) {
    res.json({error: err.message});
});

// Fire the server and listen for requests.
app.listen(process.env.PORT || 4000, function(){
    console.log("Listening on port :", (process.env.PORT ||  4000));
});

// export the app for testing purpose.
module.exports = app;

