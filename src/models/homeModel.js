const mongoose = require('mongoose');
const homeSchema = new mongoose.Schema({
    nome: { type: String, required: true }

});

const HomeModel = mongoose.model('home', homeSchema);;
//nome do esquema, qual esquema

module.exports = HomeModel;