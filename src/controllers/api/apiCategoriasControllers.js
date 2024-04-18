const db = require('../../database/models');
const sequelize = db.sequelize;

const apiCategoriasControllers = {
    'total':(req,res)=>{
        db.Categoria.findAll({
            include : "Producto",
            attributes: {
                include: [
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM productos WHERE productos.fk_idcategoria = idcategoria)'),
                        "cantProd",
                    ],
                ],
            }
        })
            .then(categorias => {
                return res.status(200).json({
                    meta: {
                        status: 200,
                        total: categorias.length,
                        url: 'http://localhost:4000/api/categorias'
                    },
                    data: categorias,
                })
            })
    },
    'detalle': (req,res)=>{
        db.Categoria.findByPk(req.params.idcategoria, {
            include: "Producto"
        })
        .then(categoria=>{
            return res.status(200).json({
                meta: {
                    status: 200,
                    url: `http://localhost:4000/api/categorias/${req.params.idcategoria}` 
                },
                data: categoria,
            })
        })
    }
}

module.exports = apiCategoriasControllers;