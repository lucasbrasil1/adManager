const mongoose = require('mongoose');

const balanceSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('Balance', balanceSchema)