// File: /db/models/customer.model.js
const { Model, DataTypes, Sequelize } = require('sequelize')
const { TABLE: USER_TABLE } = require('./user.model')

const TABLE = 'customers'

const CustomerSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    lastname: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'last_name'
    },
    phone: {
        allowNull: true,
        type: DataTypes.STRING,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    },
    userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'user_id',
        unique: true,
        references: {
            model: USER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}

class Customer extends Model {
    // Asociaciones
    static associate(models) {
        this.belongsTo(models.User, { as: 'user' })
    }

    // Recibe una conexión y retorna una configuración
    static config(sequelize) {
        return {
            sequelize,
            tableName: TABLE,
            modelName: 'Customer',
            timestamps: false
        }
    }
}

module.exports = { TABLE, CustomerSchema, Customer }
