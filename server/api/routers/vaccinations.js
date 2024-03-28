const express = require('express');
const router = express.Router();

const {
    getAllVaccinations,
    createNewVaccinations,
    getVaccinationByTz,
    updateVaccination,
    deleteVaccination
} = require('../controllers/vaccinations');

router.get('/', getAllVaccinations)
router.post('/', createNewVaccinations)
router.get('/:tz', getVaccinationByTz)
router.patch('/:tz', updateVaccination)
router.delete('/:tz', deleteVaccination)

module.exports = router; 