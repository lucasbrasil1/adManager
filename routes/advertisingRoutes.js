const express = require('express');
const router = express.Router();
const advertisingController = require('../controllers/advertisingController')

router.route('/')
    //route get all advertisings
    .get(advertisingController.getAllAdvertising)
    //route create advertising
    .post(advertisingController.createAdvertising);


router.route('/:id')
    //route get advertising by id
    .get(advertisingController.getById)
    //route add amount to advertising
    .post(advertisingController.addAmount)
    //route update advertising
    .patch(advertisingController.consume);



module.exports = router;