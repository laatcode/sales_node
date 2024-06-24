const router = require('express').Router()
const validationHandler = require('../middlewares/validationHandler')
const { getProductSchema, createProductSchema, updateProductSchema, queryProductSchema, querySeedsSchema } = require('../schemas/product.schema')
const ProductService = require('../services/products.service')

const service = new ProductService()

router.get('/seeds',
    validationHandler(querySeedsSchema, 'query'),
    (req, res) => {
        service.createSeeds(req.query)
        res.send('Seeds created')
    }
)

router.get('/',
    validationHandler(queryProductSchema, 'query'),
    async (req, res, next) => service.find(req.query)
        .then(data => res.json(data))
        .catch(error => next(error))
)

router.get('/:id',
    validationHandler(getProductSchema, 'params'),
    (req, res, next) => service.findOne(req.params.id)
        .then(data => res.json(data))
        .catch(error => next(error))
)

router.post('/',
    validationHandler(createProductSchema, 'body'),
    (req, res, next) => service.create(req.body)
        .then(data => res.status(201).json(data))
        .catch(error => next(error))
)

router.patch('/:id',
    validationHandler(getProductSchema, 'params'),
    validationHandler(updateProductSchema, 'body'),
    (req, res, next) => service.update(req.params.id, req.body)
        .then(data => res.json(data))
        .catch(error => next(error))
)

router.delete('/:id',
    validationHandler(getProductSchema, 'params'),
    (req, res, next) => service.delete(req.params.id)
        .then(() => res.status(204).end())
        .catch(error => next(error))
)

module.exports = router
