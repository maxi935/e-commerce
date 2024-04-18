module.exports = (sequelize, DataTypes) => {
    let alias = "Cliente"
    let cols = {
        idcliente: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true

        },
        nombre: {
            type: DataTypes.STRING(100)
        },
        dni: {
            type: DataTypes.STRING(15)
        },
        fecha_nac: {
            type: DataTypes.DATE
        },
        email: {
            type: DataTypes.STRING(200),
            defaultValue: null
        },
        celular: {
            type: DataTypes.STRING(10)
        },
        direccion: {
            type: DataTypes.STRING(200)
        },
        password: {
            type: DataTypes.STRING(200)
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    }
    let config = {
        tableName: "clientes",
        createdAt: "created_at",
        updatedAt: "updated_at",
        timestamps: true
    }
    const Cliente = sequelize.define(alias, cols, config)
    Cliente.associate = function (models) {
        Cliente.hasMany(models.Pedido, {
            as: "Pedido",
            foreignKey: "fk_idcliente"
        })
    }
    return Cliente
}