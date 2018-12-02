var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Video = require('../models/video'); //Import Video.js

var mongoDB = "mongodb://darren:123darren123@ds115854.mlab.com:15854/dreganplaylist"
//Avoids Mongoose Errors/Warnings
mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, function(err){
    if(err){
        console.status(404).error("Error " + err);
    }
});

//Get request to http://localhost:3000/api/videos
//Mongoose find to find videos
//Execute method to either Error or list of Videos
router.get('/videos', function(req, res){
    console.log('User get Request for all avaiable videos! ');
    Video.find({}) //look up database
    .exec(function(err, videos){
        if (err){
            console.status(404).log("Error getting videos");
        }else{
            res.status(200).json(videos); //Returns JSON DATA TO http://localhost:3000/api/videos
        }
    })
});


//Get request for a video with an ID
router.get('/videos/:id', function(req, res){
    console.log('User Get Request for a Video with an ID');
    Video.findById(req.params.id)//requests id from web browser
    .exec(function(err, video){
        if (err){
            console.status(404).log("Error getting videos");
        }else{
            res.status(200).json(video); //Returns JSON DATA TO http://localhost:3000/api/videos
        }
    })
});

//Post request to http://localhost:3000/api/video
//Follow Video Schema title, url, description
//Create new object Video to save new information
//Call mongoose safe method to save to database
router.post('/video', function(req, res){
    console.log('Posting a Video');
    var newVideo = new Video();
    newVideo.title = req.body.title;
    newVideo.url = req.body.url;
    newVideo.description = req.body.description;
    newVideo.save(function(err, insertedVideo){
        if (err){
            console.status(404).log('Error saving Video');
        }else{
            res.status(200).json(insertedVideo);
        }
    });
});

//Update Video by ID
//FindByIDandUpdate updates after recieving request using 3 forms
router.put('/video/:id', function(req, res){
    console.log('User Updated a Video! ');
    Video.findByIdAndUpdate(req.params.id,
    {
        //https://docs.mongodb.com/manual/reference/operator/update/set/
        //New values replace old values.
        $set: {title: req.body.title, url: req.body.url, description: req.body.description}
    },
    {
        new:true //if true method below returns new video details, if false shows old details
    },
    function(err, updatedVideo){
        if(err){
            res.status(404).send("Error Updating Video");
        }else{
            res.status(200).json(updatedVideo);
        }
    }
    );
});

//delete request using mongoose findByIdAndRemove
router.delete('/video/:id', function(req, res){
    console.log('Deleting a Video');
    Video.findByIdAndRemove(req.params.id, function(err, deletedVideo){
        if(err){
            res.status(404).send('Error Deleting Video')
        }else{
            res.status(200).json(deletedVideo);
        }
    });
});




module.exports = router;