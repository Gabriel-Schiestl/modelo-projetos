require('dotenv').config();//configurar o dotenv, q serve para n exibir o user e a senha no github

const {middlewareGlobal, checkCSRFError, csrfMiddleware} = require('./src/middlewares/middleWare');
const path = require('path');
const express = require('express');
const app = express();
const routes = require('./routes');
const mongoose = require('mongoose');
const helmet = require('helmet');
const csrf = require('csurf');
mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    app.emit('pronto'); //evita que o servidor escute antes que a conexao com a DB execute 
}).catch(e => console.log(e));

const session = require('express-session');
const MongoStore = require(`connect-mongo`);
const flash = require('connect-flash');

const sessionOptions = session({
    secret: 'O que eu quiser',
    store: MongoStore.create({mongoUrl: process.env.CONNECTIONSTRING}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, //tempo de duracao dos cookies, no caso 1 semana
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash());
app.use(helmet());

app.use(express.urlencoded({extended: true}));

app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
app.use(middlewareGlobal);
app.use(checkCSRFError);
app.use(csrfMiddleware);
app.use(routes);

app.on('pronto', () => { //evita que o servidor escute antes que a conexao com a DB execute
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000');
    
    });
});
