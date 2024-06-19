const router = require('express').Router()
const validationHandler = require('../middlewares/validationHandler')
const { getOrderSchema, createOrderSchema, updateOrderSchema, addItemSchema } = require('../schemas/order.schema')
const OrderService = require('../services/order.service')

const service = new OrderService()

// router.get('/seeds', (req, res) => {
//     service.createSeeds()
//     res.send('Seeds created')
// })

router.get('/', async (req, res) => {
    const result = await service.find()
    res.json(result)
})

router.get('/:id',
    validationHandler(getOrderSchema, 'params'),
    (req, res, next) => service.findOne(req.params.id)
        .then(data => res.json(data))
        .catch(error => next(error))
)

router.post('/',
    validationHandler(createOrderSchema, 'body'),
    (req, res, next) => service.create(req.body)
        .then(data => res.status(201).json(data))
        .catch(error => next(error))
)

router.patch('/:id',
    validationHandler(getOrderSchema, 'params'),
    validationHandler(updateOrderSchema, 'body'),
    (req, res, next) => service.update(req.params.id, req.body)
        .then(data => res.json(data))
        .catch(error => next(error))
)

router.delete('/:id',
    validationHandler(getOrderSchema, 'params'),
    (req, res, next) => service.delete(req.params.id)
        .then(() => res.status(204).end())
        .catch(error => next(error))
)

router.post('/add_item',
    validationHandler(addItemSchema, 'body'),
    (req, res, next) => service.addItem(req.body)
        .then(data => res.status(201).json(data))
        .catch(error => next(error))
)

module.exports = router
