const express = require("express");
const router = express.Router();
const { body } = require('express-validator')


//middlewares
const guestMiddleware = require('../middlewares/guestMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')


// Validacion usuario 
const validarUsuario = [
    body('email')
        .notEmpty()
        .withMessage('Campo Obligatorio').bail()
        .isEmail()
        .withMessage('Debe ser un Email'),
    body('password')
        .notEmpty()
        .withMessage('Campo Obligatorio').bail()
        .isLength({ min: 6 })
        .withMessage('Contraseña inválida')
        
]

// Validación Registro
const validarRegistro = [
    body('nombre')
        .notEmpty()
        .withMessage('Campo Obligatorio'),
    body('apellido')
        .notEmpty()
        .withMessage('Campo Obligatorio'),
    body('dni')
        .notEmpty()
        .withMessage('Campo Obligatorio'),
    body('celular')
        .isLength({min : 10, max : 10})
        .withMessage('Número de celular no válido'),
    body('password')
        .notEmpty()
        .withMessage('Campo Obligatorio').bail()
        .isLength({ min: 8 })
        .withMessage('Debe Contener más de 8 carácteres'),
    body('password2')
        .notEmpty()
        .withMessage('Campo Obligatorio').bail()
        .isLength({ min: 8 })
        .withMessage('Debe Contener más de 8 carácteres'),
    body('email')
        .notEmpty()
        .withMessage('Campo Obligatorio').bail()
        .isEmail()
        .withMessage('Debe ser un E-mail valido'),
    body('fecha_nac')
        .notEmpty()
        .withMessage('Campo Obligatorio').bail()
        // .isDate()
        // .withMessage('Debe ser una fecha Valida')
        ,
        body('password2').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        })
    
]
const usersControllers = require("../controllers/usersControllers");

//REGISTRO
router.get("/registro", guestMiddleware, usersControllers.registro);
router.post('/registro', validarRegistro, usersControllers.registroValidacion)

//LOGIN
router.get('/login', guestMiddleware, usersControllers.login)
router.post('/login', validarUsuario, usersControllers.loginValidacion)

// PERFIL DE USUARIO
router.get('/profile', authMiddleware, usersControllers.userProfile)

//LOGOUT
router.get('/logout', usersControllers.logout)


module.exports = router;
