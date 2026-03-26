const express = require('express');
const router = express.Router();
const fundingController = require('../controllers/fundingController');

router.get('/', fundingController.getFundingMatch);

module.exports = router;
