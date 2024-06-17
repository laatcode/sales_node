const { Model, DataTypes, Sequelize } = require('sequelize')
const { TABLE: CATEGORY_TABLE } = require('./category.model')

const TABLE = 'products'

const ProductSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'last_name'
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    },
    categoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'catgeory_id',
        references: {
            model: CATEGORY_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}

class Product extends Model {
    static associate(models) {
        this.belongsTo(models.Catgeory, { as: 'category' })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: TABLE,
            modelName: 'Product',
            timestamps: false
        }
    }
}

module.exports = { TABLE, ProductSchema, Product }
