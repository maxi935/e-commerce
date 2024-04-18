const db = require('../../database/models');
const sequelize = db.sequelize;

const apiUsuariosControllers = {
    'total':(req,res)=>{
        db.Cliente.findAll(
            {
                attributes: {
                    include: [
                        [
                            sequelize.literal(
                                `CONCAT('http://localhost:4000/api/usuarios/detalle/', Cliente.idcliente)`
                            ),
                            "url",
                        ],
                    ],
                }
            }
        )
            .then(usuarios => {
                return res.status(200).json({
                    meta: {
                        status: 200,
                        total: usuarios.length,
                        url: 'http://localhost:4000/api/usuarios'
                    },
                    data: usuarios,
                })
            })
    },
    'paginado': (req, res) => {
        let paginaActual = parseInt(req.query.pagina) > 0 ? req.query.pagina : 1;
        let paginaElementos = 10;
        db.Cliente.findAll(
            {
                offset: (paginaActual - 1) * paginaElementos,
                limit: paginaElementos,
                attributes: {
                    include: [
                        [
                            sequelize.literal(
                                `CONCAT('http://localhost:4000/api/usuarios/detalle/', Cliente.idcliente)`
                            ),
                            "url",
                        ],
                    ],

                }
            }
        )
            .then(clientes => {
                return res.status(200).json({
                    meta: {
                        status: 200,
                        total: clientes.length,
                        url: 'http://localhost:4000/api/usuarios/?pagina=' + paginaActual,
                        next: 'http://localhost:4000/api/usuarios/?pagina=' + (parseInt(paginaActual) + 1),
                        previus: 'http://localhost:4000/api/usuarios/?pagina=' + (parseInt(paginaActual) - 1)
                    },
                    data: clientes,
                })
            })
    },
    'detalle': (req, res) => {
        let idCliente = req.params.id
        db.Cliente.findByPk(idCliente)
            .then(cliente => {
                return res.status(200).json({
                    meta: {
                        status: 200,
                        url: req._parsedOriginalUrl.path
                    },
                    data: cliente,
                })
            })
    },
    'create': (req, res) => {
        console.log(req.body);
        db.Cliente.create(
            req.body
    )
    .then((cliente)=> {
        return res.status(200).json({
            meta : {
                status : 200,
                creadted : "ok"
            },
            data : cliente
        })})            
    .catch(error => res.send(error))
}
}

module.exports = apiUsuariosControllers;