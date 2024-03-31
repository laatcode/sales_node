const router = require('express').Router()
const validationHandler = require('../middlewares/validationHandler')
const { getProductSchema, createProductSchema, updateProductSchema } = require('../schemas/products.schema')
const ProductsService = require('../services/products.service')

const service = new ProductsService()

router.get('/seeds', (req, res) => {
    service.createSeeds()
    res.send('Seeds created')
})

router.get('/', async (req, res) => {
    const result = await service.find()
    res.json(result)
})

router.get('/:id', validationHandler(getProductSchema, 'params'), (req, res) => res.json(service.findOne(req.params.id)))

router.post('/', validationHandler(createProductSchema, 'body'), (req, res) => res.status(201).json(service.create(req.body)))

router.patch('/:id', validationHandler(getProductSchema, 'params'), validationHandler(updateProductSchema, 'body'), (req, res) => res.json(service.update(req.params.id, req.body)))

router.delete('/:id', validationHandler(getProductSchema, 'params'), (req, res) => {
    service.delete(req.params.id)
    res.status(204).end()
})

module.exports = router
