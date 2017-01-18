var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  initialize: function() {
    this.on('creating', function(model, attrs, options) {
      model.set('username', username);
      model.set('password', bcrypt.hash(password));
    });
  }
});

module.exports = User;

//need to determine where/how we're passing in username and password