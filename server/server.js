//server/server.js
// var express = require('express');
// var router = require('./routes/routes.js')
// var path = require('path');

// var app = express();
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, '../client'));
// app.use(express.static(path.join(__dirname, '../client')));
// app.use('/', router);
// module.exports=app;

var express = require('express');
var router = require('./routes/routes.js');
var path = require('path');
var bodyParser =  require('body-parser');
var mongoose = require('mongoose');

var app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}))

mongoose.connect('mongodb+srv://chris:Kathe1019298@cluster1-bfkud.mongodb.net/test?retryWrites=true&w=majority')

app.use('/', router);



module.exports = app;