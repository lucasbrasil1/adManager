const Balance = require('../models/Balance');

const getBalance = (req, res) => {
    return Balance.find().lean().exec();
}

const createBalance = async (req, res) => {
    console.log(req.body);

    return res.json({});
}

module.exports = {
    getBalance,
    createBalance
}