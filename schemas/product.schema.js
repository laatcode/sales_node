const Joi = require('joi')

const id = Joi.number().integer()
const name = Joi.string().min(3).max(30)
const description = Joi.string().min(10)
const price = Joi.number()
const image = Joi.string().uri()
const categoryId = Joi.number().integer()

const limit = Joi.number().integer()
const offset = Joi.number().integer()

const productsQty = Joi.number().integer()

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
    price
})

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
