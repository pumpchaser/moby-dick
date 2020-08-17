const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
console.log("SERVER STARTING")
app.use(express.static(path.join(__dirname, 'build')));

// db Connection w/ localhost
var db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : '',
    password : '',
    database : 'moby_dick'
  }
});

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
