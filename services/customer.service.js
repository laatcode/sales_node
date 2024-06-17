const CustomError = require('../CustomError')
const { models } = require('../libs/sequelize')

class CustomerService {

    async findOne(id) {
        const customerFound = await models.Customer.findByPk(id)
        if(!customerFound) {
            throw new CustomError("Customer not found", 404)
        }
        return customerFound
    }

    async find() {
        const rta = await models.Customer.findAll({
            include: ['user']
        })
        return rta
    }

    async create(data) {
        const newCustomer = await models.Customer.create(data)
        return newCustomer
    }

    async update(id, changes) {
        const customerFound = await this.findOne(id)
        const rta = await customerFound.update(changes)
        return rta
    }

    async delete(id) {
        const customerFound = await this.findOne(id)
        await customerFound.destroy()
        return { id }
    }
}

module.exports = CustomerService
