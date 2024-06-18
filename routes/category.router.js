const router = require('express').Router()
const validationHandler = require('../middlewares/validationHandler')
const { getCategorySchema, createCategorySchema, updateCategorySchema } = require('../schemas/category.schema')
const CategoryService = require('../services/category.service')

const service = new CategoryService()

// router.get('/seeds', (req, res) => {
//     service.createSeeds()
//     res.send('Seeds created')
// })

router.get('/', async (req, res) => {
    const result = await service.find()
    res.json(result)
})

router.get('/:id',
    validationHandler(getCategorySchema, 'params'),
    (req, res, next) => service.findOne(req.params.id)
        .then(data => res.json(data))
        .catch(error => next(error))
)

router.post('/',
    validationHandler(createCategorySchema, 'body'),
    (req, res, next) => service.create(req.body)
        .then(data => res.status(201).json(data))
        .catch(error => next(error))
)

router.patch('/:id',
    validationHandler(getCategorySchema, 'params'),
    validationHandler(updateCategorySchema, 'body'),
    (req, res, next) => service.update(req.params.id, req.body)
        .then(data => res.json(data))
        .catch(error => next(error))
)

router.delete('/:id',
    validationHandler(getCategorySchema, 'params'),
    (req, res, next) => service.delete(req.params.id)
        .then(() => res.status(204).end())
        .catch(error => next(error))
)

module.exports = router
