const Balance = require('../models/Balance');

const getBalance = (req, res) => {
    return Balance.find().lean().exec();
}

module.exports = {
    getBalance
}