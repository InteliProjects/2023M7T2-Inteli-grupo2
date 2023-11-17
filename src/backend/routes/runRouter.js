const express = require('express');
const router = express.Router();
var authenticateToken = require('../middlewares/auth')

const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

const runController = require('../controllers/runController')

// Rota que retorna ultimas runs por modelo
router.get('/all', authenticateToken, (req, res) => {
    runController.runsAll(req, res);
})

router.post('/new/:modelId/:aircraftId', authenticateToken, upload.single('parquetFile'), (req, res) => {
    runController.newRun(req, res);
})

module.exports  = router;