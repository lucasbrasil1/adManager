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
    balance: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Balance'
    }],
})

module.exports = mongoose.model('Advertising', advertisingSchema)