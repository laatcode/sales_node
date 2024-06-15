// File: /libs/sequelize.js
require('dotenv').config()
const setupModels = require('../db/models')
const {Sequelize} = require('sequelize')

const USER = encodeURIComponent(process.env.DB_USER)
const PASSWORD = encodeURIComponent(process.env.DB_PASS)
const URI = `mysql://${USER}:${PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

const sequelize = new Sequelize(URI, {
    dialect: 'mysql' // Permite indicar la base de datos a conectar
})

setupModels(sequelize) //Relaciona la conexión con los modelos definidos

sequelize.sync() //Toma la información de los modelos y crea las estructuras de las tablas sincronizando así la información

module.exports = sequelize
