const express = require('express');
const router = express.Router();
const formalisationController = require('../controllers/formalisationController');

router.get('/', formalisationController.getFormalisationStatus);

module.exports = router;
