const express = require("express");
const router = express.Router();


const apiUsuariosControllers = require('../../controllers/api/apiUsuariosControllers');

router.get('/', apiUsuariosControllers.total)
router.get('/paginado', apiUsuariosControllers.paginado)
router.get('/detalle/:id', apiUsuariosControllers.detalle)

router.post('/create', apiUsuariosControllers.create)

module.exports = router;