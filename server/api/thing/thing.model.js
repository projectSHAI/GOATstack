'use strict';

var mongoose = require('mongoose');

var ThingSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Thing', ThingSchema);
