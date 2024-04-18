const express = require("express");
const router = express.Router();

const productsControllers = require("../controllers/productsControllers");
const productosVistos = require('../middlewares/productosVistos')

router.get('/',productsControllers.index)
router.get('/detalle/:id', productosVistos, productsControllers.detalle);

router.get("/carrito", productsControllers.carrito);

//AGREGAR - Boton Carrito
router.post('/agregarcarrito', productsControllers.agregarcarrito)

//http://localhost:4000/productos/buscar
router.get("/buscar", productsControllers.buscar);

router.delete('/carrito/eliminar', productsControllers.eliminarProductoCarrito)

// router.put("/carrito/:id", productsControllers.contarProducto)
// router.delete('/carrito/:id', productsControllers.eliminarProducto)


module.exports = router;
