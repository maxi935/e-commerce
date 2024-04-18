const express = require("express");
const router = express.Router();


const apiProductosControllers = require('../../controllers/api/apiProductosControllers');

router.get('/', apiProductosControllers.total)
router.get('/paginado', apiProductosControllers.paginado)
router.get('/detalle/:id', apiProductosControllers.detalle)
router.post('/create', apiProductosControllers.create)
router.delete('/delete', apiProductosControllers.delete)

module.exports = router;