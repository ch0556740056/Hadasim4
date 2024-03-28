const express = require('express');
const router = express.Router();

const {
    getAllDiseases,
    createNewDisease,
    getDisease,
    updateDiseases,
    deleteDiseases
} = require('../controllers/diseases');

router.get('/', getAllDiseases)
router.post('/', createNewDisease)
router.get('/:tz', getDisease)
router.patch('/:diseaseId', updateDiseases)
router.delete('/:tz', deleteDiseases)

module.exports = router; 