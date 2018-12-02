var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//Blueprint for JSON data on mLab
var videoSchema = new Schema({
    title: String,
    url: String,
    description: String
});

//model = Schema title, url, desc  videos = mLab database Name, Collection on mLab is called videos
module.exports = mongoose.model('video', videoSchema, 'videos')