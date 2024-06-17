const { Model, DataTypes, Sequelize } = require('sequelize')

const TABLE = 'categories'

const CategorySchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
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
    }
}

class Category extends Model {
    static associate(models) {
        this.hasMany(models.Product, {
             as: 'products',
             foreignKey: 'categoryId'
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: TABLE,
            modelName: 'Category',
            timestamps: false
        }
    }
}

module.exports = { TABLE, CategorySchema, Category }
