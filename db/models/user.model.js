// File: /db/models/UserSchema.model.js

const { Model, DataTypes, Sequelize } = require('sequelize')

const TABLE = 'users'

const UserSchema = {
    id: {
        allowNull: false,       //Permite valores nulos
        autoIncrement: true,    //El campos es autoincremental
        primaryKey: true,       //El campo es clave primaria
        type: DataTypes.INTEGER //Define el tipo de datos
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    role: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'customer'
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',    //Especifica el nombre del campo en BD para no usar el del atributo
        defaultValue: Sequelize.NOW
    }
}

class User extends Model {
    // Asociaciones
    static associate() {
    }

    // Recibe una conexión y retorna una configuración
    static config(sequelize) {
        return {
            sequelize,         //Conexión
            tableName: TABLE,   //Nombre de la tabla
            modelName: 'User',  //Nombre del modelo
            timestamps: false   //Uso de createdAt y updatedAt automáticos
        }
    }
}

module.exports = { TABLE, UserSchema, User }
