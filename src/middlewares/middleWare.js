exports.middlewareGlobal = (req, res, next) => {
    res.locals.umaVariavelLocal = 'Valor global';//posso criar qualquer coisa, como funcao por exemplo e exportar
    next(); //essa exportacao locals em um middleware injeta conteudo para todas as rotas, ja em um controller eh pra uma rota especifica
};//para injetar vamos nos views


exports.checkCSRFError = (err, req, res, next) => {
    if(err && err.code === 'EBADCSRFTOKEN'){
        return res.render('erros');
    }
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken(); //usar para todo form dentro do ejs
    next();
};