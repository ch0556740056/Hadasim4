const User = require('../models/user')
const mongoose = require('mongoose');

module.exports = {

  getAllUsers: (req, res) => {
    User.find()
      .then((users) => {
        res.status(200).json({
          users
        });
      })
      .catch((error) => {
        res.status(500).json({
          error
        });
      });
  },
  createNewUser: (req, res) => {
    try {
      const { firstName, lastName, tz, city, street, homeNumber, dateOfBirth, phone, mobilePhone } = req.body;
      User.findOne({ tz: tz })
        .then(existingUser => {
          if (existingUser) {
            return res.status(400).json({ message: 'User with the same ID already exists' });
          }
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            firstName,
            lastName,
            tz,
            city,
            street,
            homeNumber,
            dateOfBirth,
            phone,
            mobilePhone
          });
          console.log(user);
          user.save()
            .then(() => {
              res.status(200).json({
                message: "User created"
              });
            })
            .catch(err => {
              console.error(err);
              res.status(500).json({
                message: "Failed to create user"
              });
            });
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({
            message: "Error finding user"
          });
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal Server Error"
      });
    }
  },
  getUser: (req, res) => {
    const tz = req.params.tz;
    console.log(tz);
    User.findOne({ tz: tz })
      .then((user) => {
        res.status(200).json({
          user
        });
      })
      .catch((error) => {
        res.status(500).json({
          error
        });
      });
  },
  updateUser: (req, res) => {
    const updatedUser = req.body; // קבלת הערך של User מהבקשה
    
    User.updateOne({ tz: req.body.tz }, updatedUser)
      .then(() => {
        res.status(200).json({
          message: "User updated"
        });
      })
      .catch((error) => {
        res.status(500).json({
          error
        });
      });
  },
  deleteUser: (req, res) => {
    const tz = req.params.tz;

    User.deleteOne({ tz: tz })
      .then(() => {
        res.status(200).json({
          message: "User deleted"
        });
      })
      .catch((error) => {
        res.status(500).json({
          error
        });
      });
  },
}
