const productsRouter = require('./products.router')
const userRouter = require('./user.router')
const router = require('express').Router()

const routes = app => {
    app.use('/api/v1', router)
    router.use('/products', productsRouter)
    router.use('/users', userRouter)
}

module.exports = routes
