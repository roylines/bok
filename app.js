var server = require('./routes/server'),
	express = require('express');

var app = express();
server.initialise(app);