/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 * tableName: 'mio_user'
 */

const bcrypt = require('bcryptjs')

module.exports = {
  tableName: 's_user',
  migrate: 'alter',
  attributes: {

    name: {
      type: 'String'
    },
    email: {
      type: 'String',
      unique: true,
      required: true
    },
    password: {
      type: 'String',
      encrypt: true,
      required: true
    },
    age: {
      type: 'number',
      defaultsTo: 0
    },
    blogs: {
      collection: 'blog',
      via: 'writer'
    }
  },
  /*
    isValidPassword: (password, user, callback) => {
      bcrypt.compare(password, user.password, (error, isMatch) => {
        if (error) return callback(error)
  
        if (isMatch) {
          callback(null, true)
        } else callback(new Error('Passwords doesn\'t match'), false)
      })
    }*/
};

