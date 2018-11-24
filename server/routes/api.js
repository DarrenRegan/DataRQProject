var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Video = require('../models/video'); //Import Video.js

var mongoDB = "mongodb://darren:123darren123@ds115854.mlab.com:15854/dreganplaylist"
//Avoids Mongoose Errors/Warnings
mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, function(err){
    if(err){
        console.error("Error " + err);
    }
});

//Get request to http://localhost:3000/api/videos
//Mongoose find to find videos
//Execute method to either Error or list of Videos
router.get('/videos', function(req, res){
    //res.send('api works!');
    console.log('Get Request for all Videos! ');
    Video.find({})
    .exec(function(err, videos){
        if (err){
            console.log("Error getting videos");
        }else{
            res.json(videos); //Returns JSON DATA TO http://localhost:3000/api/videos
        }
    })
});

module.exports = router;