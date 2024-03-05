const HomeModel = require('../models/homeModel');

HomeModel.create({
    nome: 'Gabriel'
}).then((dados) => console.log(dados)).catch(e => console.log(e));

//HomeModel.find(): encontra os dados pra gente

exports.homePage = (req, res) => {
    //req.session.usuario = {nome: 'Gabriel', logado: true};
    res.render('index',
    //posso abrir um objeto e injetar conteudos 
    {titulo: 'Este sera o titulo da pagina'} 
    ); //para injetar vamos nos views
}; 

exports.postado = (req, res) => {
    res.render('errors');
};