const { Model, DataTypes, Sequelize } = require('sequelize')
const { TABLE: CUSTOMER_TABLE } = require('./customer.model')

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
    }
}

class Order extends Model {
    static associate(models) {
        this.belongsTo(models.Customer, { as: 'customer' })
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
