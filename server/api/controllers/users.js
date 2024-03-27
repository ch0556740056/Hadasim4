const User=require('../models/user')
const mongoose=require('mongoose');

module.exports={
    
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
    createNewUser:(req,res)=>{
        const{firstName,lastName,tz,city,street,homeNumber,dateOfBirth,phone,mobilePhone}=req.body;
        User.findOne({ tz: tz })
        .then(existingUser => {
          if (existingUser) {
            return res.status(400).json({ message: 'User with the same ID already exists' });
          }
        });
  //       const idRegex = /^\d{9}$/;
          
  // if (idRegex.test(id)) {
  
  // }
        const user=new User({
            _id:new mongoose.Types.ObjectId,
            firstName,
            lastName,
            tz,
            city,
            street,
            homeNumber,
            dateOfBirth,
            phone,
            mobilePhone
        })
        console.log(user);
        user.save().then(() => {
         res.status(200).json({
            message:"create user"
         })
        })
        .catch(err => {
          // Error saving User
          res.status(500).json({ err
         });
        });
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
        const tz = req.params.tz;
      
        User.updateOne({ tz: tz }, req.body)
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
