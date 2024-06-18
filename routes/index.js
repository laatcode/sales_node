const productsRouter = require('./products.router')
const userRouter = require('./user.router')
const customerRouter = require('./customer.router')
const categoryRouter = require('./category.router')
const router = require('express').Router()

const routes = app => {
    app.use('/api/v1', router)
    router.use('/products', productsRouter)
    router.use('/users', userRouter)
    router.use('/customers', customerRouter)
    router.use('/categories', categoryRouter)
}

module.exports = routes
