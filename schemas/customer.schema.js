const Joi = require('joi')

const id = Joi.number().integer()
const name = Joi.string().min(3).max(30)
const lastname = Joi.string().min(3).max(30)
const phone = Joi.string()
const userId = Joi.number().integer()

const email = Joi.string().email()
const password = Joi.string().min(6)
const role = Joi.string().min(5)

const createCustomerSchema = Joi.object({
    name: name.required(),
    lastname: lastname.required(),
    phone: phone.required(),
    userId,
    user: Joi.object({
        email: email.required(),
        password: password.required(),
        role: role.required()
    }),
}).or('userId', 'user').required()

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
