const mongoose = require("mongoose");

const diseaseSchema = mongoose.Schema({
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
  dateOfIllness: {
    type: Date,
    validate: {
      validator: function (value) {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const selectedDate = new Date(value);
        selectedDate.setHours(0, 0, 0, 0);
        return selectedDate < currentDate;
      },
      message: 'תאריך החליאה חייב להיות תאריך שעבר.'
    },
    required: [false, 'יש להזין תאריך מחלה.']
  },
  dateOfRecovery: {
    type: Date,
    validate: [
      {
        validator: function (value) {
          const currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0);
          const selectedDate = new Date(value);
          selectedDate.setHours(0, 0, 0, 0);
          return selectedDate < currentDate;
        },
        message: 'תאריך החלמה חייב להיות תאריך שעבר.'
      },
      {
        validator: function (value) {
          const illnessDate = new Date(this.dateOfIllness);
          const recoveryDate = new Date(value);
          if (!this.dateOfIllness) {
            return true; // אם אין ערך ב-dateOfIllness, אין צורך בבדיקה של dateOfRecovery
          }
          return illnessDate < recoveryDate;
        },
        message: 'תאריך החלמה חייב להיות אחרי תאריך החליאה.'
      }
    ],
    required: [false, 'יש להזין תאריך החלמה.']
  }
});
module.exports = mongoose.model('Disease', diseaseSchema);