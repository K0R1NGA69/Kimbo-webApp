const { crossOriginResourcePolicy } = require("helmet");
const { createConnection } = require("mongoose");

exports.middleWare = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.result = req.flash('result')
    next()
}

exports.checkCsrfError = (err, req, res, next) => {
    if (err) {
        console.log(err.code)
        return res.render("404")
    }

}
exports.csrfMiddleWare = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}

exports.loginRequired=(req,res,next) => {
    
    if(!req.session.user){
        req.flash('errors',"Vous n'est pas connecté")
        req.session.save(()=>res.redirect("/login"))
        return
    }
    next()
}