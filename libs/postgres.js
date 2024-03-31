require('dotenv').config()

const { Pool } = require('pg')

const USER = encodeURIComponent(process.env.DB_USER)
const PASSWORD = encodeURIComponent(process.env.DB_PASS)
const URI = `postgress://${USER}:${PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

const pool = new Pool({ connectionString: URI })

module.exports = pool
