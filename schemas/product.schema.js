const Joi = require('joi')

const id = Joi.number().integer()
const name = Joi.string().min(3).max(30)
const description = Joi.string().min(10)
const price = Joi.number().integer().min(2000)
const image = Joi.string().uri()
const categoryId = Joi.number().integer()

const limit = Joi.number().integer()
const offset = Joi.number().integer()

const productsQty = Joi.number().integer()

const price_min = Joi.number().integer()
const price_max = Joi.number().integer()

const createProductSchema = Joi.object({
    name: name.required(),
    description: description.required(),
    price: price.required(),
    image: image.required(),
    categoryId: categoryId.required()
})

const updateProductSchema = Joi.object({
    name,
    description,
    price,
    image,
    categoryId
})

const getProductSchema = Joi.object({
    id: id.required()
})

const queryProductSchema = Joi.object({
    limit,
    offset,
    price,
    price_min,
    price_max
})
.with('limit', 'offset')
.with('offset', 'limit')
.with('price_min', 'price_max')
.with('price_max', 'price_min')

const querySeedsSchema = Joi.object({
    productsQty: productsQty.required()
})

module.exports = {
    createProductSchema,
    updateProductSchema,
    getProductSchema,
    queryProductSchema,
    querySeedsSchema
}
