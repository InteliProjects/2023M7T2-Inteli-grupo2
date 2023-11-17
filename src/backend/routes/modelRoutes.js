const express = require('express');
const router = express.Router();
var authenticateToken = require('../middlewares/auth')
const modelController = require('../controllers/modelController')


router.get('/all', authenticateToken, (req, res) => {
    modelController.getAll(req, res);
})

router.post('/new', authenticateToken, (req, res) => {
    modelController.newModel(req, res);
})

module.exports  = router;