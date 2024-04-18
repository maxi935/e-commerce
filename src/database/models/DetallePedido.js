module.exports = (sequelize, DataTypes) => {
    let alias = "DetallePedido"
    let cols = {
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        fk_idpedido: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
        },
        fk_idcliente: {
            type: DataTypes.INTEGER.UNSIGNED
        },
        fk_idproducto: {
            type: DataTypes.INTEGER.UNSIGNED
        },
        cantidad: {
            type: DataTypes.INTEGER.UNSIGNED
        },
    }
    let config = {
        tableName: "detallespedidos",
        createdAt: "created_at",
        updatedAt: "updated_at",
        timestamps: true
    }
    const DetallePedido = sequelize.define(alias, cols, config)
    DetallePedido.associate = function (models) {
        // Relación con Pedido
        DetallePedido.belongsTo(models.Pedido, {
            as: 'asociacionpedido',
            foreignKey: 'fk_idpedido'
        });

        // Relación con Producto
        DetallePedido.belongsTo(models.Producto, {
            as: 'asociacionproducto',
            foreignKey: 'fk_idproducto'
        });

        // Relación con Cliente
        DetallePedido.belongsTo(models.Cliente, {
            as: 'asociacioncliente',
            foreignKey: 'fk_idcliente'
        });
    };
    return DetallePedido
}