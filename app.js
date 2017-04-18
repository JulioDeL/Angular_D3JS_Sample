var express = require('express');
var app = express();
var config = require('./config');

var apiController = require('./controllers/apiController');
var routesController = require('./controllers/routesController');

app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

apiController(app);
routesController(app);

app.listen(process.env.PORT || 3000);