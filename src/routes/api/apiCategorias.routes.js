const express = require("express");
const router = express.Router();


const apiCategoriasControllers = require('../../controllers/api/apiCategoriasControllers');

router.get('/', apiCategoriasControllers.total)
router.get('/:idcategoria', apiCategoriasControllers.detalle)

module.exports = router;