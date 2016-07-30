'use strict';

var mongoose = require('mongoose');

var CollectionSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.Now
  },
  name: {
    type: String,
    required: 'The collection must have a name'
  },
  order: {
    type: Number,
    required: 'The collection must a order'
  },
  gallery: [{
    _id: mongoose.Schema.Types.ObjectId
  }],
  info: String,
  path: {
    type: String,
    required: 'Collections must have a path for photo upload'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: 'Collections must belong to a user'
  }
});

module.exports = mongoose.model('Collection', CollectionSchema);
