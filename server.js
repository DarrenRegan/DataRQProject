var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');


var api = require('./server/routes/api');

var app = express();
var port = 3000

app.use(express.static(path.join(__dirname, 'dist')));

//Here we are configuring express to use body-parser as middle-ware. 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

//"/api/", Removes assess control error
//https://www.npmjs.com/package/body-parser
app.use("/api/", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });

app.use('/api', api);

//Render index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, function () {
    console.log("App listening at http://%s:" + port)
});
    


