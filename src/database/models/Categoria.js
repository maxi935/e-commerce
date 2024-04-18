module.exports = (sequelize, DataTypes) => {
    let alias = "Categoria"
    let cols = {
        idcategoria: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
    
        },
        nombre: {
            type: DataTypes.STRING(100)
        }
    }
    let config = {
        tableName : "categorias",
        timestamps: false
    }
    const Categoria = sequelize.define(alias, cols, config)
    Categoria.associate = function(models){
        Categoria.hasMany(models.Producto, {
            as : "Producto",
            foreignKey : "fk_idcategoria"
        })
    }
    return Categoria
    }