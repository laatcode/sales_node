const { Model, DataTypes, Sequelize } = require('sequelize')
const { TABLE: CUSTOMER_TABLE } = require('./customer.model')
const { types } = require('joi')

const TABLE = 'orders'

const OrderSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    customerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'customer_id',
        references: {
            model: CUSTOMER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    },
    total: {
        type: DataTypes.VIRTUAL,
        get() {
            if(this.items.length > 0) {
                return this.items.reduce((total, item) => {
                    return total + (item.price * item.OrderProduct.amount)
                }, 0)
            }
            return 0
        }
    }
}

class Order extends Model {
    static associate(models) {
        this.belongsTo(models.Customer, { as: 'customer' })
        this.belongsToMany(models.Product, {
            as: 'items',
            through: models.OrderProduct,
            foreignKey: 'orderId',
            otherKey: 'productId'
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: TABLE,
            modelName: 'Order',
            timestamps: false
        }
    }
}

module.exports = { TABLE, OrderSchema, Order }
