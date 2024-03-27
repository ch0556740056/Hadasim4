const  mongoose = require("mongoose");

// Create a schema for User
const userSchema = mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  tz:String,
  firstName: String,
  lastName: String,
  city:String,
  street:String,
  homeNumber:String,
  dateOfBirth:Date,
  phone:String,
  mobilePhone:String,
});
module.exports = mongoose.model('User', userSchema);