const mongoose = require('mongoose');
//const vaccination = require('../models/vaccination');
const Vaccination = require('../models/vaccination');

module.exports = {

  getAllVaccinations: (req, res) => {
    Vaccination.find()
      .then((vaccinations) => {
        res.status(200).json({
          vaccinations
        });
      })
      .catch((error) => {
        res.status(500).json({
          error
        });
      });
  },
  createNewVaccinations: (req, res) => {
    const { tz, manufacturer, date } = req.body;
    Vaccination.find({ tz: tz }).then((vaccication) => {
      if (vaccication.length < 4) {
        console.log({ tz, manufacturer, date });
        const vaccination = new Vaccination({
          _id: new mongoose.Types.ObjectId(),
          tz, manufacturer, date
        });

        vaccination.save().then(() => {
          res.status(200).json({
            message: "create coronaDisease"
          });
        }).catch(err => {
          res.status(500).json({
            err
          });
        });
      }
      else {
        res.status(500).json({
          message: "more than 4 coronaDiseases"
        });

      }
    })


  },
  getVaccinationByTz: (req, res) => {
    const tz = req.params.tz;
    Vaccination.find({ tz: tz })
      .then((vaccination) => {
        res.status(200).json({
          vaccination
        });
      })
      .catch((error) => {
        res.status(500).json({
          error
        });
      });
  },
  updateVaccination: (req, res) => {
    const tz = req.params.tz;

    Vaccination.updateOne({ tz: tz }, req.body)
      .then(() => {
        res.status(200).json({
          message: "vaccination updated"
        });
      })
      .catch((error) => {
        res.status(500).json({
          error
        });
      });
  },
  deleteVaccination: (req, res) => {

    const tz = req.params.tz;
    Vaccination.deleteMany({ tz: tz })
      .then(() => {
        res.status(200).json({
          message: "vaccination deleted"
        });
      })
      .catch((error) => {
        res.status(500).json({
          error
        });
      });
  },
}
