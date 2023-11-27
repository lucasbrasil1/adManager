let dados = [];

const add = (object) => {
    return dados.push(object);
}

const get = () => {
    return dados;
}

const getOne = (id) => {
    return dados.filter(d => d.id == id).at(0);
}

module.exports = { add, get, getOne };