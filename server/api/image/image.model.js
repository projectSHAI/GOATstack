'use strict';

var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var ImageSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  pic_order: {
    type: Number,
    required: 'The collection must have a photo order'
  },
  src: {
    type: String,
    required: 'An image src is always required'
  },
  msrc: {
    type: String,
    required: 'An image msrc is always required'
  },
  w: {
    type: Number,
    required: 'Image must have a set width'
  },
  h: {
    type: Number,
    required: 'Image must have a set height'
  },
  name: {
    type: String,
    default: ''
  },
  caption: {
    type: String,
    default: ''
  },
  collectionId: {
    type: Schema.Types.ObjectId,
    required: 'Image must belong to a collection'
  },
  path: {
    type: String,
    required: 'Image must have a source path'
  },
  upvote: [{
    _id: Schema.Types.ObjectId
  }],
  comments: [{
    _id: Schema.Types.ObjectId
  }]
});

module.exports = mongoose.model('Image', ImageSchema);
