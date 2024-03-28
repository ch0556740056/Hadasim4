const mongoose = require("mongoose");

const vaccinationSchema = mongoose.Schema({
  tz: {
    type: String,
    validate: {
      validator: function (value) {
        return /^\d{9}$/.test(value);
      },
      message: props => `${props.value} אינו תעודת זהות תקינה.`
    },
    required: [true, 'יש להזין תעודת זהות של 9 ספרות בדיוק.'],
    minlength: [9, 'יש להזין תעודת זהות של 9 ספרות בדיוק.'],
    maxlength: [9, 'יש להזין תעודת זהות של 9 ספרות בדיוק.']
  },
  manufacturer: String,
  date: {
    type: Date,
    validate: {
      validator: function (value) {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const selectedDate = new Date(value);
        selectedDate.setHours(0, 0, 0, 0);
        return selectedDate < currentDate;
      },
      message: 'תאריך הלידה חייב להיות תאריך שעבר.'
    },
  }
});
module.exports = mongoose.model('Vaccination', vaccinationSchema);