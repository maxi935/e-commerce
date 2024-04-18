const db = require('../../database/models');
const sequelize = db.sequelize;

const apiControllers = {
    'total':(req,res)=>{
        db.Producto.findAll(
            {
                include: ["Categoria"],
                attributes: {
                    include: [
                        [
                            sequelize.literal(
                                `CONCAT('http://localhost:4000/api/productos/detalle/', Producto.idproducto)`
                            ),
                            "url",
                        ],
                    ],
                }
            }
        )
            .then(productos => {
                return res.status(200).json({
                    meta: {
                        status: 200,
                        total: productos.length,
                        url: 'http://localhost:4000/api/productos'
                    },
                    data: productos,
                })
            })
    },
    'paginado': (req, res) => {
        let paginaActual = parseInt(req.query.pagina) > 0 ? req.query.pagina : 1;
        let paginaElementos = 10;
        db.Producto.findAll(
            {
                include: ["Categoria"],
                offset: (paginaActual - 1) * paginaElementos,
                limit: paginaElementos,
                attributes: {
                    include: [
                        [
                            sequelize.literal(
                                `CONCAT('http://localhost:4000/api/productos/detalle/', Producto.idproducto)`
                            ),
                            "url",
                        ],
                    ],
                }
            }
        )
            .then(productos => {
                return res.status(200).json({
                    meta: {
                        status: 200,
                        total: productos.length,
                        url: 'http://localhost:4000/api/productos/?pagina=' + paginaActual,
                        next: 'http://localhost:4000/api/productos/?pagina=' + (parseInt(paginaActual) + 1),
                        previus: 'http://localhost:4000/api/productos/?pagina=' + (parseInt(paginaActual) - 1)
                    },
                    data: productos,
                })
            })
    },
    'detalle': (req, res) => {
        let idProducto = req.params.id
        db.Producto.findByPk(idProducto)
            .then(producto => {
                return res.status(200).json({
                    meta: {
                        status: 200,
                        url: req._parsedOriginalUrl.path
                    },
                    data: producto,
                })
            })
    },
    'create': (req, res) => {
        console.log(req.body);
        db.Producto.create(
            req.body
        )
            .then((producto) => {
                return res.status(200).json({
                    meta: {
                        status: 200,
                        creadted: "ok"
                    },
                    data: producto
                })
            })
            .catch(error => res.send(error))
    },
    'delete' : (req, res) => {
        db.Producto.destroy({
            where: { idproducto: req.params.id }
        })
        .then(() => {
            return res.status(200).json({
                meta: {
                    status: 200,
                    deleted: "ok"
                },
            })  
        })
        .catch(error=>{
            return res.send(error)
        })
    }
}

module.exports = apiControllers;