const Advertising = require('../models/Advertising');

const getAllAdvertising = (req, res) => {
    return Advertising.find().lean().exec();

}

const createAdvertising = (req, res) => {
    return res.json({helo: "helo"});
}

module.exports = {
    getAllAdvertising,
    createAdvertising
}