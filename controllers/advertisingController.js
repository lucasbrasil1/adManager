const Advertising = require('../models/Advertising');

// @desc Get all advertising
// @route GET /ad
// @access Public
const getAllAdvertising = async (req, res) => {
    const ads = await Advertising.find().lean().exec();

    return res.json(ads);
}

// @desc Get one advertising
// @route GET /ad
// @access Public
const getById = async (req, res) => {
    const { id } = req.params;

    const ad = await Advertising.findById(id).lean().exec();

    if (!ad) {
        return res.status(400).json({ message: 'Nenhuma campanha encontrada' });
    }

    return res.json(ad);
}

// @desc Create new advertising
// @route POST /ad
// @access Public
const createAdvertising = async (req, res) => {
    const { name, description, amount } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: "Nome e descrição não podem ser nulos." });
    }

    const duplicate = await Advertising.findOne({ name }).collation({
        locale: 'pt', strength: 2
    }).lean().exec();

    if (duplicate) {
        return res.status(409).json({ message: 'Já existe uma campanha com esse nome.' });
    }

    const newAd = {
        name,
        description,
        amount: amount || 0,
        bannerClicks: 0,
        bannerViews: 0,
        interstitialClicks: 0,
        interstitialViews: 0
    };

    const ad = await Advertising.create(newAd);

    if (ad) { //created
        res.status(201).json({ message: `Nova campanha ${name} criada`, ad })
    } else {
        res.status(401).json({ message: 'Dados inválidos' })
    }
}

// @desc Add amount to advertising
// @route POST /ad/:id
// @access Public
const addAmount = async (req, res) => {
    const { id } = req.params;
    const { amount } = req.body;

    if (!id || !amount) {
        res.status(400).json({ message: 'Dados inválidos' });
    }

    const ad = await Advertising.findById(id).collation({
        locale: 'pt', strength: 2
    }).exec();

    if (!ad) {
        return res.status(400).json({ message: 'Campanha não encontrada' });
    }

    const finalAmount = ad.amount + amount;
    ad.amount = finalAmount;

    const updatedValue = await ad.save();
    res.json({ message: `${updatedValue.name} atualizado para valor: ${updatedValue.amount}` })
}

// @desc Consume advertising
// @route PATCH /ad/:id
// @access Public
const consume = async (req, res) => {
    const { id } = req.params;
    const { action, type } = req.body;

    if (!id || !action || !type) {
        res.status(400).json({ message: 'Dados inválidos' });
    }

    const ad = await Advertising.findById(id).collation({
        locale: 'pt', strength: 2
    }).exec();

    if (!ad) {
        return res.status(400).json({ message: 'Campanha não encontrada' });
    }

    let amount = 0;
    if (action === "view" && type === "banner") {
        amount = process.env.AMOUNT_VIEW_BANNER;
        ad.bannerViews = ad.bannerViews + 1;
    } else if (action === "view" && type === "interstitial") {
        amount = process.env.AMOUNT_VIEW_INTER;
        ad.interstitialViews = ad.interstitialViews + 1;
    } else if (action === "click" && type === "banner") {
        amount = process.env.AMOUNT_CLICK_BANNER;
        ad.bannerClicks = ad.bannerClicks + 1;
    } else if (action === "click" && type === "interstitial") {
        amount = process.env.AMOUNT_CLICK_INTER;
        ad.interstitialClicks = ad.interstitialClicks + 1;
    } else {
        return res.status(400).json({ message: 'Dados inválidos' });
    }

    const updatedAmount = ad.amount - amount;
    if (updatedAmount < 0) {
        return res.status(400).json({ message: "Não é possível consumir essa campanha :(" })
    }

    ad.amount = updatedAmount;
    const updatedAd = await ad.save();

    return res.json({ message: `${updatedAd.name} consumida, valor restante : ${ad.amount}` })
}


// @desc Consume advertising
// @route DELETE /ad
// @access Public
const deleteById = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'Id obrigatório' });
    }

    const ad = await Advertising.findById(id).exec();

    if (!ad) {
        return res.status(400).json({ message: 'Campanha não encontrada' });
    }

    await ad.deleteOne();
    res.json({ message: `Campanha excluída` });
}

module.exports = {
    getAllAdvertising,
    createAdvertising,
    addAmount,
    consume,
    deleteById,
    getById
}