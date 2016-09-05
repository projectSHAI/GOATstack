'use strict';

var request = require('request'),
  qs = require('querystring'),
  appKandS = {
    app_key: 'ow4ghh8w92ohiqm',
    app_secret: 'nfpkqbkf3oa2f22'
  },
  access = {
    accessToken: 'vobqH4Y_9nAAAAAAAAAACFrtqdBl8tlMhuKfP4CunKzVgtmMDVJubnkymMOuU7bk',
    token_type: 'bearer',
    uid: 564259186
  },
  auth = {
    'bearer': access.accessToken
  };


//authorize dyw with dropbox
module.exports.authorize = function (req, res) {
  var uri = 'https://www.dropbox.com/1/oauth2/authorize?response_type=code&client_id=' + appKandS.app_key;

  var arg = {
    method: 'GET',
    url: uri
  };

  request(arg, function (err, response, body) {
    var obj = JSON.parse(body);
    res.json(obj);
  });
}

//get token for dropbox
module.exports.token = function (req, res, code) {
  var url = 'https://api.dropboxapi.com/1/oauth2/token?code=' + code + '&grant_type=authorization_code';

  var arg = {
    method: 'POST',
    url: url
  };

  request(arg, function (err, response, body) {
    var obj = JSON.parse(body);
    res.json(obj);
  });
}

// Get account information for dropbox
module.exports.accountInfo = function (req, res) {

  var url = 'https://api.dropboxapi.com/1/account/info';

  request.get(url, {
      'auth': auth
    },
    function (err, response, body) {
      var obj = JSON.parse(body);
      res.json(obj);
    });
}

// Upload file into DYW dropbox
module.exports.upload = function (req, res, cb) {
  var data = new Buffer(req.body.data).toString();
  var path = req.body.imageInfo.path;

  var url = 'https://content.dropboxapi.com/1/files_put/auto/' + encodeURIComponent(path) + '?param=val';

  request.post({
    'url': url,
    'auth': auth,
    'body': data
  }, function (err, response, body) {
    var obj = JSON.parse(body);
    return cb ? cb(obj, err) : obj;
  });
}

// Delete file from dropbox
module.exports.del = function (req, res, path, cb) {
  var url = [
    'https://api.dropboxapi.com/1/fileops/delete',
    '?root=auto',
    '&path=' + path
  ].join('');

  request.post({
    'url': url,
    'auth': auth
  }, function (err, response, body) {
    var obj = JSON.parse(body);
    return cb ? cb(obj, err) : obj;
  });
}

// Make directory in DYW dropbox
module.exports.mkdir = function (req, res, path, foldername, cb) {

  var url = [
    'https://api.dropboxapi.com/1/fileops/create_folder',
    '?root=auto',
    '&path=' + path + foldername
  ].join('');

  request.post({
    'url': url,
    'auth': auth
  }, function (err, response, body) {
    var obj = JSON.parse(body);
    // res.json(obj);
    return cb ? cb(obj, err) : obj;
  });
}

// Retrieve metadata for file || folder
module.exports.metadata = function (req, res, path, cb) {

  var url = 'https://api.dropboxapi.com/1/metadata/auto/' + path;

  request.get(url, {
      'auth': auth
    },
    function (err, response, body) {
      var obj = JSON.parse(body);
      return cb ? cb(obj, err) : obj;
    });
}
