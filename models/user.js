const mongoose = require('mongoose')
// Schema is what we use to tell mongoose about the very particular fields that our model is going to have
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

// Define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
})

// On Save Hook, encrypt password
// Before saving the model, run this function
userSchema.pre('save', function (next) {
  // get access to the user model
  const user = this;    // user.email, user.password

  // generate a salt, then run callback
  // a salt is just an encrypted string, or a string of characters
  bcrypt.genSalt(10, function (err, salt) {
    if (err){ return next(err)}

    // hash(encrypt) the password using the salt
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {return next(err)}

      // overwrite plain text password with encrypted password
      user.password = hash;

      // go ahead and save the model
      next();
    })
  })
})

// Create the model class
const ModelClass = mongoose.model('user', userSchema)    // loads the Schema into mongoose


// Export the model
module.exports = ModelClass