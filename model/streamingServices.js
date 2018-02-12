//mode/comments.js
'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
var StreamingSchema = new Schema({
  name: String,
  description: String,
  price: String,
  image_url: String,
  base_channels: [String],
  channel_packages:[String],
  dvr: Boolean,
  numberOfDevices: String
});

//export our module to use in server.js
module.exports = mongoose.model('StreamingService', StreamingSchema);
