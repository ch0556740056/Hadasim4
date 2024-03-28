const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
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
  firstName: String,
  lastName: String,
  city: String,
  street: String,
  homeNumber: String,
  dateOfBirth: {
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
  },
  phone: {
    type: String,
    validate: {
      validator: function (value) {
        if (!value) {
          return true; // אם השדה ריק, אין צורך באימות
        }
        return /^0\d{8}$/.test(value);
      },
      message: props => `${props.value} אינו מספר טלפון תקין.`
    },
  },
  mobilePhone: {
    type: String,
    validate: {
      validator: function (value) {
        if (!value) {
          return true; // אם השדה ריק, אין צורך באימות
        }
        return /^0\d{9}$/.test(value);
      },
      message: props => `${props.value} אינו מספר טלפון נייד תקין.`
    },
  }
});
module.exports = mongoose.model('User', userSchema);