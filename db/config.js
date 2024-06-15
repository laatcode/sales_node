// File: /db/config.js
require('dotenv').config()

const USER = encodeURIComponent(process.env.DB_USER)
const PASSWORD = encodeURIComponent(process.env.DB_PASS)
const URI = `mysql://${USER}:${PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

module.exports = {
    development: {
        url: URI,
        dialect: 'mysql',
    },
    production: {
        url: URI,
        dialect: 'mysql',
    }
}
