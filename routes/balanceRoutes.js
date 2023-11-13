const express = require('express');
const router = express.Router();
const balanceController = require('../controllers/balanceController')

router.route('/')
    .get(balanceController.getBalance)
    .post(balanceController.createBalance)

module.exports = router;