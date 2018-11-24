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


//Get request for a video with an ID
router.get('/videos/:id', function(req, res){
    //res.send('api works!');
    console.log('Get Request for a Video with ID');
    Video.findById(req.params.id)//requests id from web browser
    .exec(function(err, video){
        if (err){
            console.log("Error getting videos");
        }else{
            res.json(video); //Returns JSON DATA TO http://localhost:3000/api/videos
        }
    })
});

//Post request to http://localhost:3000/api/video
//Follow Video Schema title, url, description
//Create new object Video to save new information
//Call mongoose safe method to save to database
router.post('/video', function(req, res){
    console.log('Post a Video');
    var newVideo = new Video();
    newVideo.title = req.body.title;
    newVideo.url = req.body.url;
    newVideo.description = req.body.description;
    newVideo.save(function(err, insertedVideo){
        if (err){
            console.log('Error saving Video');
        }else{
            res.json(insertedVideo);
        }
    });
});

//Update Video by ID
//FindByIDandUpdate updates after recieving request using 3 forms
router.put('/video/:id', function(req, res){
    console.log('Update a Video');
    Video.findByIdAndUpdate(req.params.id,
    {
        $set: {title: req.body.title, url: req.body.url, description: req.body.description}
    },
    {
        new:true //if true method below returns new video details, if false shows old details
    },
    function(err, updatedVideo){
        if(err){
            res.send("Error Updating Video");
        }else{
            res.json(updatedVideo);
        }
    }
    );
});




module.exports = router;