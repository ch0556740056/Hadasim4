const mongoose = require('mongoose');
const Disease = require('../models/disease');

module.exports = {

  getAllDiseases: (req, res) => {
    Disease.find()
      .then((diseases) => {
        res.status(200).json({
          diseases
        });
      })
      .catch((error) => {
        res.status(500).json({
          error
        });
      });
  },
  createNewDisease: (req, res) => {
    const { tz, dateOfIllness, dateOfRecovery } = req.body;
    Disease.findOne({ tz: tz })
      .then(existingDisease => {
        if (existingDisease) {
          // כבר קיימת מחלה עם אותה ת"ז
          return res.status(400).json({ message: 'Disease with the same ID already exists' });
        } else {
          const disease = new Disease({
            tz,
            dateOfIllness,
            dateOfRecovery
          });
          disease.save()
            .then(() => {
              res.status(200).json({
                message: "create disease"
              });
            })
            .catch(err => {
              res.status(500).json({ err });
            });
        }
      })
      .catch(err => {
        res.status(500).json({ err });
      });
  },
  getDisease: (req, res) => {
    const tz = req.params.tz;
    console.log(tz);
    Disease.findOne({ tz: tz })
      .then((disease) => {
        res.status(200).json({
          disease
        });

      })
      .catch((error) => {
        res.status(500).json({
          error
        });
      });
  },
  updateDiseases: (req, res) => {
    console.log(req.body.disease);
    Disease.updateOne({ tz: req.body.disease.tz }, req.body.disease)
      .then(() => {
        res.status(200).json({
          message: "disease updated"
        });
      })
      .catch((error) => {
        res.status(500).json({
          error
        });
      });
  },
  deleteDiseases: (req, res) => {
    const tz = req.params.tz;

    Disease.deleteOne({ tz: tz })
      .then(() => {
        res.status(200).json({
          message: "Disease deleted"
        });
      })
      .catch((error) => {
        res.status(500).json({
          error
        });
      });
  },
}
