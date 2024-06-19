const CustomError = require('../CustomError')
const { models } = require('../libs/sequelize')

class ProductService {

    async findOne(id) {
        const productFound = await models.Product.findByPk(id, { include: 'category' })
        if(!productFound) {
            throw new CustomError("Product not found", 404)
        }
        return productFound
    }

    async find(query) {

        const options = {
            include: ['category']
        }

        const { limit, offset } = query

        if(limit && offset) {
            options.limit = Number(limit)
            options.offset = Number(offset)
        }

        const rta = await models.Product.findAll(options)
        return rta
    }

    async create(data) {
        const newProduct = await models.Product.create(data)
        return await this.findOne(newProduct.id)
    }

    async update(id, changes) {
        const productFound = await this.findOne(id)
        const rta = await productFound.update(changes)
        return rta
    }

    async delete(id) {
        const productFound = await this.findOne(id)
        await productFound.destroy()
        return { id }
    }
}

module.exports = ProductService
