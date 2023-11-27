const { add, get, getOne } = require("../config/dados");

let dados = [];
// @desc Get all advertising
// @route GET /ad
// @access Public
const getAllAdvertising = async (req, res) => {
    // const ads = await Advertising.find().lean().exec();

    return res.json(get());
}

// @desc Get one advertising
// @route GET /ad
// @access Public
const getById = async (req, res) => {
    const { id } = req.params;

    const ad = getOne(id);

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

    const newAd = {
        id : dados.length,
        name,
        description,
        amount: amount || 0,
        bannerClicks: 0,
        bannerViews: 0,
        interstitialClicks: 0,
        interstitialViews: 0
    };

    const ad = add(newAd)

    if (ad) { //created
        res.status(201).json({ message: `Nova campanha ${name} criada` })
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

    const ad = getOne(id);

    if (!ad) {
        return res.status(400).json({ message: 'Campanha não encontrada' });
    }

    const finalAmount = ad.amount + amount;
    ad.amount = finalAmount;

    res.json({ message: `${ad.name} atualizado para valor: ${ad.amount}` })
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

    const ad = getOne(id);

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
    // const updatedAd = await ad.save();

    return res.json({ message: `${ad.name} consumida, valor restante : ${ad.amount}` })
}


module.exports = {
    getAllAdvertising,
    createAdvertising,
    addAmount,
    consume,
    getById
}