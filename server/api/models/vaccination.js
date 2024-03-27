const  mongoose = require("mongoose");

const vaccinationSchema = mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  tz:String,
  manufacturer:String,
  date:String
});
module.exports = mongoose.model('Vaccination', vaccinationSchema);