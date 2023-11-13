const express = require('express');
const router = express.Router();
const advertisingController = require('../controllers/advertisingController')

router.route('/')
    .get(advertisingController.getAllAdvertising)
    .post(advertisingController.createAdvertising)

module.exports = router;