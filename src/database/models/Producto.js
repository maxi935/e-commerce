module.exports = (sequelize, DataTypes) => {
let alias = "Producto"
let cols = {
    idproducto: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true

    },
    marca: {
        type: DataTypes.STRING(100)
    },
    tipo: {
        type: DataTypes.STRING(100)
    },
    descripcion: {
        type: DataTypes.STRING(200)
    },
    volumen: {
        type: DataTypes.INTEGER.UNSIGNED
    },
    disponibilidad: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue : null
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2).UNSIGNED
    },
    avatar: {
        type: DataTypes.STRING(200)
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    fk_idpedido: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue : null
    },
    fk_idcategoria :{
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue : null
    }
}
let config = {
    tableName : "productos",
    createdAt: "created_at",
    updatedAt: "updated_at",
    timestamps: true
}
const Producto = sequelize.define(alias, cols, config)
Producto.associate = function(models){
    Producto.belongsTo(models.Pedido, {
        as : "Pedido",
        foreignKey : "fk_idpedido"
    })
}
Producto.associate = function(models){
    Producto.belongsTo(models.Categoria, {
        as : "Categoria",
        foreignKey : "fk_idcategoria"
    })
}
return Producto
}