const router = require('express').Router()
const validationHandler = require('../middlewares/validationHandler')
const { getProductSchema, createProductSchema, updateProductSchema } = require('../schemas/product.schema')
const ProductService = require('../services/products.service')

const service = new ProductService()

// router.get('/seeds', (req, res) => {
//     service.createSeeds()
//     res.send('Seeds created')
// })

router.get('/', async (req, res) => {
    const result = await service.find()
    res.json(result)
})

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
