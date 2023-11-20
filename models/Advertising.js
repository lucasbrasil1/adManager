const mongoose = require('mongoose');

const advertisingSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required : true
    },
    amount : {
        type: Number,
        required : true
    },
    bannerClicks : {
        type: Number
    },
    bannerViews : {
        type: Number
    },
    interstitialClicks : {
        type: Number
    },
    interstitialViews : {
        type: Number
    }
})

module.exports = mongoose.model('Advertising', advertisingSchema)