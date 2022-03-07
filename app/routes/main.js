const express = require('express');
const mainController = require('../controllers/main');
const router = express.Router();

router.get('/', mainController.showMain);
router.get('/trades', mainController.getTrades);

module.exports = router;
