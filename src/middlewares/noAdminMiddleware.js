function noAdminMiddleware(req, res, next) {
    if (req.session && req.session.userLogged && req.session.userLogged.email) {
        const emailPermitido = 'maxi-935@hotmail.com';

        if (req.session.userLogged.email === emailPermitido) {
            return next();
        } else {
            return res.redirect('/usuario/profile');
        }
    }
    res.redirect('/usuario/login');
}

module.exports = noAdminMiddleware;