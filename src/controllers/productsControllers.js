const path = require('path')
const fs = require('fs')
const db = require('../database/models')
const { Op } = require('sequelize');


module.exports = { 
  //PRODUCTOS
  index : (req,res)=>{
  
    Promise.all([
      db.Categoria.findAll({
        include: [{ association: 'Producto' }]
      }),
      db.Producto.findAll()
    ])
    .then(([categorias, productos]) => {
      res.render('productos/index', { categorias, productos });
    })
    .catch(error => {
      console.error("Error al buscar categorías y productos:", error);
      res.status(500).send("Error interno del servidor");
    });
  },
  detalle: async (req, res) => {
    try {
      let vistos = req.cookies.vistos || [];
      let promesaDetalle = db.Producto.findByPk(req.params.id);
      let promesaLista = db.Producto.findAll({
        where: {
            idproducto: vistos
        }
    });
  
      // Promise.all espera a que ambas promesas se resuelvan
      let [producto, productos] = await Promise.all([promesaDetalle, promesaLista]);
  
      res.render('productos/detalleProducto', { producto, productos});
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Error interno del servidor');
    }
  },
  //CARRITO
  carrito: async (req, res) => {
    try {
        if (!req.session || !req.session.userLogged) {
            return res.send('Usuario no logueado');
        }

        if (!req.cookies.carrito) {
            res.cookie("carrito", [], { maxAge: 900000 });
        }

        let idproductos = req.cookies.carrito.map(item => item.idproducto);
        let cantidad = req.cookies.carrito.map(item => parseInt(item.cantidad));

        let carritoProductos = await db.Producto.findAll({
                  where: {
                      idproducto: idproductos
                  }
      });
      carritoProductos.forEach((producto, index) => {
        producto.dataValues.cantidad = cantidad[index];
    });
                // Obtener la suma de todos los precios
                const total = carritoProductos.reduce((accumulator, producto, index) => accumulator + (parseInt(producto.precio) * cantidad[index]), 0);

                // Obtener la suma de todas las cantidades
                const cantidadestotales = cantidad.reduce((accumulator, currentCantidad) => accumulator + currentCantidad, 0);
        
                console.log(carritoProductos);
                res.render('productos/carrito', { carritoProductos, total, cantidadestotales });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Error interno del servidor');
    }
},
  agregarcarrito: async (req, res) => {
    try {
        if (!req.session || !req.session.userLogged) {
            return res.send('Usuario no logueado');
        }

        if (!req.cookies.carrito) {
            res.cookie("carrito", [], { maxAge: 900000 });
        }

        let idcliente = req.session.userLogged.idcliente;
        let idproducto = req.body.idproducto ;
        let cantidad = parseInt(req.body.cantidad);

        let carritoTemp = req.cookies.carrito || [];

        let encontrado = false;
        for (let i = 0; i < carritoTemp.length; i++) {
            if (carritoTemp[i].idproducto === idproducto) {
                carritoTemp[i].cantidad = cantidad;
                encontrado = true;
                break; 
            }
        }

        if (!encontrado) {
            carritoTemp.push({ idproducto, idcliente, cantidad });
        }

        res.cookie("carrito", carritoTemp, { maxAge: 900000 });


        if (req.body.modificar) {
          return res.redirect('/productos/carrito')
        }else{

          return res.redirect('/productos');
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Error interno del servidor');
    }
},
eliminarProductoCarrito: async (req, res) => {
  try {
      if (!req.session || !req.session.userLogged) {
          return res.send('Usuario no logueado');
      }

      const idProductoEliminar = req.body.idproducto;

      let carritoTemp = req.cookies.carrito || [];

      const nuevoCarrito = carritoTemp.filter(producto => producto.idproducto !== idProductoEliminar);

      res.cookie("carrito", nuevoCarrito, { maxAge: 900000 });

      return res.redirect('/productos/carrito');
  } catch (error) {
      console.error('Error:', error);
      return res.status(500).send('Error interno del servidor');
  }
},
buscar: async (req, res) => {
  try {
      const { buscar } = req.query;
      console.log(buscar);
      const producto = await db.Producto.findAll({
          where: {
              marca: {
                  [Op.like]: `%${buscar}%`
              }
          }
      });
      return res.render('productos/indexBuscar', { productos: producto });
  } catch (error) {
      console.log(error.message);
      res.send(error.message);
  }
},
}

// const productsFilePath = path.join(__dirname, '../database/productosCarritoDB.json');
// let productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
// carrito: (req, res) => {
//   // Calcular la suma CANTIDAD
//   const sumaCantidad = productos.reduce((total, obj) => total + parseInt(obj.cantidad), 0);
  
//   // Calcular la suma PRECIO
//   const sumaPrecio = productos.reduce((total, obj) => total + (parseFloat(obj.precio) * parseFloat(obj.cantidad)), 0);
//   res.render("carrito", { productos, sumaCantidad, sumaPrecio });
// },
// contarProducto: (req, res) => {
//   let id = req.params.id;
//   let productoModificar = productos.find(p => p.id === id);
//   if (productoModificar) {
//     const { cantidad } = req.body;
//     const productoActualizado = {
//       ...productoModificar,
//       cantidad: parseFloat(cantidad)
//     };

//     const index = productos.findIndex(p => p.id === id);
    
//     productos[index] = productoActualizado;
    
//     fs.writeFileSync(productsFilePath, JSON.stringify(productos, null, 2));
//     res.redirect('/carrito')
//   }
  
// },
// eliminarProducto: (req, res) => {
//   const id = req.params.id
//   if (id) {
//     productos = productos.filter(producto => producto.id != id)
    
//     fs.writeFileSync(productsFilePath, JSON.stringify(productos, null, ' '))
//     res.redirect('/carrito')
    
//   } else {
//     res.send('el producto a eliminar ya no existe')
//   }
// }