const express = require("express");
const router = express.Router();
const multer = require('multer')
const path = require('path')
const { body } = require('express-validator')


//validaciones
const validarCrearProducto = [
    //Nombre
    body('marca').notEmpty().withMessage('Debes completar el campo').bail()
        .isLength({ min: 5 }).withMessage('Debe contener minimo 5 carácteres'),
    body('tipo').notEmpty().withMessage('Debes completar el campo').bail()
        .isLength({ min: 5 }).withMessage('Debe contener minimo 5 carácteres'),
    //Descripcion
    body('descripcion').notEmpty().withMessage('Debes completar el campo').bail()
        .isLength({ min: 20}).withMessage('Debe contener minimo 20 carácteres').bail()
        .isLength({ max: 200}).withMessage('ha superado el maximo de 200 carácteres'),
    //IMAGEN
    body('avatar').custom((value, { req }) => {
        
        if (req.file) {
            const file = req.file;
            const tipoImagen = ['.jpg', '.jpeg', '.png', '.gif'];
            const fileExtension = path.extname(file.path);
            
            if (!tipoImagen.includes(fileExtension.toLowerCase())) {
                throw new Error('Formato de imagen no permitido. Debes subir una imagen en formato JPG, JPEG, PNG o GIF.');
            }
        }
    
        return true;
    })
]

//direcciones de RUTAS
const adminControllers = require("../controllers/adminControllers");



//lugar donde almacenara las imagenes del formulario - MULTER
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../public/img/avatars'))
    },
    filename: (req, file, cb) => {
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, fileName)
    }
})
const upload = multer({ storage });


//RUTAS
http://localhost:4000/admin
router.get('/',adminControllers.admin)

http://localhost:4000/admin/productos
router.get("/productos", adminControllers.adminProductos);

// CRUD PRODUCTOS
//http://localhost:4000/admin/crearProducto
router.get("/crearProducto", adminControllers.crear);
router.post('/crearProducto', upload.single('avatar'), validarCrearProducto, adminControllers.store)

//http://localhost:4000/admin/modificarProducto/:id
router.get('/modificarProducto/:id', adminControllers.modificar)
router.put("/modificarProducto/:id", upload.single('avatar'), validarCrearProducto, adminControllers.modificarProceso);

//http://localhost:4000/admin/productos/:id
router.delete('/productos/:id', adminControllers.eliminar);

//http://localhost:4000/admin/buscarProducto
router.get("/productos/buscar", adminControllers.buscar);


//CRUD USUARIOS
//http://localhost:4000/admin/usuarios
router.get('/usuarios', adminControllers.modificarUsuario)
//http://localhost:4000/admin/modificarUsuario/:id
router.get('/modificarUsuario/:id', adminControllers.modificarUsuarioProcesoGet)
router.put('/modificarusuario/:id', adminControllers.modificarUsuarioProceso)

//http://localhost:4000/admin/usuarios/:id
router.delete('/usuarios/:id', adminControllers.eliminarUsuario);

// //ADMIN TAREAS

// router.get('/pedidos', adminControllers.adminPedidos);
// router.post('/pedidos', adminControllers.adminPedidosPost);

//EXPORTACION
module.exports = router;
