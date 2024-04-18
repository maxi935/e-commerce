function guestMiddleware(req,res,next) {

    if (req.session.userLogged) {
        res.redirect('/usuario/profile')
    }
    next();
}

module.exports = guestMiddleware;