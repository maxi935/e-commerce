const db = require('../database/models');

async function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;
    
    try {
        if (req.cookies.userEmail) {
            
        
    const usuarioCookie = await db.Cliente.findOne({
        where : {
            email : req.cookies.userEmail
        }
    })
    //creo que esta de mas la pegunta
    if (usuarioCookie) {
        req.session.userLogged = usuarioCookie
    }
    } else {
        
        if (req.body && req.body.email) {
    
            // if (req.body.action === "register") {
            //     // Lógica para registro
            // } else 
            if (req.body.action === "login") {
    
                const userFromDB = await db.Cliente.findOne({
                    where: {
                        email: req.body.email
                    }
                });
    
                if (userFromDB) {
                    req.session.userLogged = userFromDB;
                }
            }
        }
    }



        if (req.session && req.session.userLogged) {
            res.locals.isLogged = true;
            res.locals.userLogged = req.session.userLogged;
            res.locals.userEmail = req.session.userLogged.email;
        }
    } catch (error) {
        console.error("Error al verificar el usuario:", error);
    }

    next();
}

module.exports = userLoggedMiddleware;