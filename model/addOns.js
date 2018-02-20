//mode1/addOns.js
'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
var addOnSchema = new Schema({
  addonName: String,
  forService: String,
  price: Number,
  channels: [String],
  dvr: Boolean,
  devicesNum: String
});

//export our module to use in server.js
module.exports = mongoose.model('AddOn', addOnSchema);
