var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');


var api = require('./server/routes/api');

var app = express();
var port = 3000;

app.use(express.static(path.join(__dirname, 'dist')));

//Configuring express to use body-parser as middle-ware. 
//https://www.npmjs.com/package/body-parser
app.use(bodyParser.urlencoded({ extended: true })); //Parse text to urlencoded data https://www.urlencoder.org/
app.use(bodyParser.json()); //Parse text to json

//"/api/", Removes assess control error
app.use("/api/", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });

app.use('/api', api); //Should go to server/routes/api.js

//Render index.html
// for any path knows to listen to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, function () {
    console.log("Connecting @ http://localhost:" + port)
});
    


