'use strict';

var mongoose = require('mongoose');

var WonderSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: 'A wonder must have a name'
  },
  xcoor: {
    type: Number,
    required: 'A wonder needs an X coordinate'
  },
  ycoor: {
    type: Number,
    required: 'A wonder needs a Y coordinate'
  }
});

module.exports = mongoose.model('Wonder', WonderSchema);
