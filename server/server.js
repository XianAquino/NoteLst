var express = require('express');
var app = express();


var port = 3030;
var ip = '127.0.0.1';

console.log(`Listening on port: ${port}`);
app.listen(port,ip);
