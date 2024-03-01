require('dotenv').config();//configurar o dotenv, q serve para n exibir o user e a senha no github

const path = require('path');
const express = require('express');
const app = express();
const routes = require('./routes');
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    app.emit('pronto'); //evita que o servidor escute antes que a conexao com a DB execute 
}).catch(e => console.log(e));


app.use(express.urlencoded({extended: true}));

app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(routes);

app.on('pronto', () => { //evita que o servidor escute antes que a conexao com a DB execute
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000');
    
    });
});
