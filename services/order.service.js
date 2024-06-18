const CustomError = require('../CustomError')
const { models } = require('../libs/sequelize')

class OrderService {

    async findOne(id) {
        const orderFound = await models.Order.findByPk(id, { include: ['customer'] })
        if(!orderFound) {
            throw new CustomError("Order not found", 404)
        }
        return orderFound
    }

    async find() {
        const rta = await models.Order.findAll({ include: [{
            association: 'customer',
            include: ['user']
        }] })
        return rta
    }

    async create(data) {
        const newOrder = await models.Order.create(data)
        return await this.findOne(newOrder.id)
    }

    async update(id, changes) {
        const orderFound = await this.findOne(id)
        const rta = await orderFound.update(changes)
        return rta
    }

    async delete(id) {
        const orderFound = await this.findOne(id)
        await orderFound.destroy()
        return { id }
    }
}

module.exports = OrderService
