var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  initialize: function() {
    this.on('creating', this.hashPassword);
  },

  comparePasswords: function(password, cb) {
    bcrypt.compare(password, this.get('password'), function(err, match) {
      cb(match);
    });
  },

  hashPassword: function(){
    var promisifiedHash = Promise.promisify(bcrypt.hash);
    return promisifiedHash(this.get('password'), null, null).bind(this)
    .then(function(hash) {
      this.set('password', hash);
    })
  }

});

module.exports = User;