const express = require('express');
const router = express.Router();
const predictionController = require('../controllers/predicitonController')
var authenticateToken = require('../middlewares/auth')


router.get('/result', (req, res) => {
    predictionController.getAllPredictionsByPlaneId(req, res);
})

module.exports  = router;