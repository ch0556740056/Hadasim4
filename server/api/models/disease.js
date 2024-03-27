const  mongoose = require("mongoose");

const diseaseSchema = mongoose.Schema({
  tz:String,
  dateOfIllness:Date,
  dateOfRecovery:Date
});
module.exports = mongoose.model('Disease', diseaseSchema);