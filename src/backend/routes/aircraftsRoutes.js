const express = require('express');
const router = express.Router();
var authenticateToken = require('../middlewares/auth')
const aircraftsController = require('../controllers/aircraftsController')

router.get('/getAllAircrafts', authenticateToken, (req, res) => {
    aircraftsController.getAllAircrafts(req, res)
})

router.post('/newAircraft', authenticateToken, (req, res) => {
    aircraftsController.newAircraft(req, res);
});

router.put('/changeActivityAircraft', authenticateToken, (req, res) => {
    aircraftsController.changeActivityAircraft(req, res);
});



module.exports  = router;