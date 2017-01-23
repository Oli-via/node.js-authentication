/**
 * Created by aliyy on 2017/1/23.
 */
const mongoose = require('mongoose')
// Schema is what we use to tell mongoose about the very particular fields that our model is going to have
const Schema = mongoose.Schema

// Define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
})



// Create the model class
const ModelClass = mongoose.model('user', userSchema)    // loads the Schema into mongoose


// Export the model
module.exports = ModelClass