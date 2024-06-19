const { Model, DataTypes, Sequelize } = require('sequelize')
const { TABLE: ORDER_TABLE } = require('./order.model')
const { TABLE: PRODUCT_TABLE } = require('./product.model')

const TABLE = 'orders_products'

const OrderProductSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    orderId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'order_id',
        references: {
            model: ORDER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    productId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'product_id',
        references: {
            model: PRODUCT_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    }
}

class OrderProduct extends Model {
    static associate(models) {
        // this.belongsTo(models.Customer, { as: 'customer' })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: TABLE,
            modelName: 'OrderProduct',
            timestamps: false
        }
    }
}

module.exports = { TABLE, OrderProductSchema, OrderProduct }
