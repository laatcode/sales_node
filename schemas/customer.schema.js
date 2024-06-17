const Joi = require('joi')

const id = Joi.number().integer()
const name = Joi.string().min(3).max(30)
const lastname = Joi.string().min(3).max(30)
const phone = Joi.string()
const userId = Joi.number().integer()

const createCustomerSchema = Joi.object({
    name: name.required(),
    lastname: lastname.required(),
    phone: phone.required(),
    userId: userId.required()
})

const updateCustomerSchema = Joi.object({
    name,
    lastname,
    phone,
    userId
})

const getCustomerSchema = Joi.object({
    id: id.required()
})

module.exports = {
    createCustomerSchema,
    updateCustomerSchema,
    getCustomerSchema
}
