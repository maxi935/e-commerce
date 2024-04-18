const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator')
let db = require('../database/models')
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");


module.exports = {
    admin: (req, res) => {
        res.render('admin/admin')
    },
    adminProductos: async (req, res) => {
        let productos = await db.Producto.findAll()
        return res.render('admin/adminProductos', { productos });
    },
    crear: (req, res) => {
        db.Categoria.findAll()

            .then(categorias => res.render('admin/crearProducto', { categorias }))

    },
    store: (req, res) => {
        //validacion
        let resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            db.Categoria.findAll()
                .then((categorias) => {
                    return res.render('admin/crearProducto', {
                        errors: resultValidation.mapped(),
                        old: req.body,
                        categorias
                    })
                })

        } else {

            let { marca, tipo, descripcion, volumen, categoria, disponibilidad, precio } = req.body
            let listaCategoria = ["Gaseosa", "Alcohol", "Agua", "Soda", "Jugo", "Energetica"];
            fk_idcategoria = listaCategoria.indexOf(categoria) + 1;
            db.Producto.create({
                marca,
                tipo,
                descripcion,
                volumen,
                fk_idcategoria,
                disponibilidad,
                precio,
                avatar: (req.file ? req.file.filename : '/img/avatars/default-image.png')
            })
                .then(() => {
                    res.redirect('/admin/productos')
                })
                .catch(error => console.log(error.message))
        }
    },
    modificar: async function (req, res) {
        try {
            let idproducto = req.params.id;

            let [Producto, Categorias] = await Promise.all([
                db.Producto.findByPk(idproducto),
                db.Categoria.findAll()
            ]);

            res.render('admin/modificarProducto', { producto: Producto, categorias: Categorias });
        } catch (error) {
            console.log(error.message);
        }
    },
    modificarProceso: async function (req, res) {
        try {
            const { marca, tipo, descripcion, volumen, categoria, disponibilidad, precio } = req.body;

            // Obtener el nombre del archivo anterior del campo oculto
            const avatarAnterior = req.body.avatar_anterior;

            // Determinar el nuevo valor del avatar
            const avatarNuevo = req.file ? req.file.filename : avatarAnterior;

            console.log(req.body);
            // Actualizar el producto en la base de datos
            await db.Producto.update({
                marca,
                tipo,
                descripcion,
                volumen,
                categoria,
                disponibilidad,
                precio,
                avatar: avatarNuevo
            }, {
                where: { idproducto: req.params.id }
            });

            res.redirect('/admin/productos');
        } catch (error) {
            console.log(error.message);
        }
    },
    eliminar: async function (req, res) {
        try {
            await db.Producto.destroy({
                where: { idproducto: req.params.id }
            })
            res.redirect('/admin/productos')
        } catch (error) {
            console.log(error.message);
        }
    },
    buscar: async (req, res) => {
        try {
            const { buscar } = req.query;
            const producto = await db.Producto.findAll({
                where: {
                    marca: {
                        [Op.like]: `%${buscar}%`
                    }
                }
            });
            res.render('admin/adminProductos', { productos: producto });
        } catch (error) {
            console.log(error.message);
            res.send(error.message);
        }
    },
    //USUARIO
    modificarUsuario: async function (req, res) {
        try {
            let clientes = await db.Cliente.findAll()

            res.render('admin/usuario/adminUsuarios', { clientes })
        } catch (error) {
            console.log(error.message);
        }
    },
    modificarUsuarioProcesoGet: async function (req, res) {
        try {
            let idcliente = req.params.id;

            let cliente = await db.Cliente.findByPk(idcliente)


            res.render('admin/usuario/modificarUsuario', { cliente });
        } catch (error) {
            console.log(error.message);
        }
    },
    modificarUsuarioProceso: async function (req, res) {
        try {
            const { nombre, dni, fecha_nac, email, celular, direccion, password } = req.body;

            console.log(req.body);
            // Actualizar el producto en la base de datos
            await db.Cliente.update({
                nombre,
                dni,
                fecha_nac,
                email,
                celular,
                direccion,
                password: bcrypt.hashSync(password, 10),
            }, {
                where: { idcliente: req.params.id }
            });

            res.redirect('/admin/usuarios');
        } catch (error) {
            console.log(error.message);
        }
    },
    eliminarUsuario: async function (req, res) {
        try {
            // Eliminar primero los pedidos relacionados
            await db.Pedido.destroy({
                where: { fk_idcliente: req.params.id }
            });
    
            // Luego eliminar el cliente
            await db.Cliente.destroy({
                where: { idcliente: req.params.id }
            });
    
            res.redirect('/admin/usuarios');
        } catch (error) {
            console.log(error.message);
            // Manejar el error adecuadamente
            res.status(500).send("Error al eliminar el usuario");
        }
    }
}



//BASE DE DATOS PRODUCTOS
// const productsFilePath = path.join(__dirname, '../database/productsDataBase.json');
// let productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

//BASE DE DATOS PEDIDOS
// const pedidosFilePath = path.join(__dirname, '../database/pedidosDB.json')
// let pedidos = JSON.parse(fs.readFileSync(pedidosFilePath, 'utf-8'))



// ADMIN TAREAS
// let adminProductos =
// let adminPedidos = (req,res) =>{
//     res.render('admin/adminPedidos', {pedidos})
// }
// let adminPedidosPost = (req,res) => {
//     res.send('hola')
// }

//crear
// let
// let crear =

//eliminar
// let eliminar = (req, res) => {
//     const id = req.params.id
//     if (id) {
//         productos = productos.filter(producto => producto.id != id)

//         fs.writeFileSync(productsFilePath, JSON.stringify(productos, null, '   '))
//         return res.render('admin/adminProductos', { productos })

//     } else {
//         return res.send('el producto a eliminar ya no existe')
//     }
// }

//modificar
// let modificar = (req, res) => {
//     let id = req.params.id;
//     let productoModificar = productos.find(p => p.id === id);
//     if (productoModificar) {
//         const { nombreProducto, descripcion, imagenProducto, categoria, precio } = req.body;
//         const productoActualizado = {
//             id: id,
//             nombreProducto: nombreProducto || productoModificar.nombreProducto,
//             descripcion: descripcion || productoModificar.descripcion,
//             imagenProducto: imagenProducto || productoModificar.imagenProducto,
//             categoria: categoria || productoModificar.categoria,
//             precio: precio || productoModificar.precio
//         };

//         const index = productos.findIndex(p => p.id === id);

//         productos[index] = productoActualizado;

//         fs.writeFileSync(productsFilePath, JSON.stringify(productos, null, 2));

//         res.render('admin/modificarProducto', { productoActualizado });
//     }
//     else { res.send('no se encuentra el producto solicitado') }
// }

//Buscar
// let buscar = (req, res) => {
//     let queryBusqueda = req.query.buscar.toLowerCase();
//     let busquedaResultante = [];
//     for (let i = 0; i < productos.length; i++) {
//         if (productos[i].nombreProducto.toLowerCase().includes(queryBusqueda)) {
//             busquedaResultante.push(productos[i])
//         }
//     }
//     res.render('admin/adminProductos', { productos: busquedaResultante })
// }