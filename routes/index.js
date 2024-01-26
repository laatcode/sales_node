const productsRouter = require('./products.router')
const router = require('express').Router()

const routes = app => {
    app.use('/api/v1', router)
    router.use('/products', productsRouter)
}

module.exports = routes
