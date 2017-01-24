var express = require('express');
var app = express();
var router = require('./routes.js');
var parser = require('body-parser');

var port = 3030;
var ip = '127.0.0.1';

app.use(parser.json());
app.use('/api', router);

console.log(`Listening on port: ${port}`);
app.listen(port,ip);
