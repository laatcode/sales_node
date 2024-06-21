const CustomError = require('../CustomError')
const { models } = require('../libs/sequelize')
const { faker } = require('@faker-js/faker')

class ProductService {

    async createSeeds(query) {
        const categories = await models.Category.findAll()
        if(!categories.length) {
            throw new CustomError("There are no existing product categories")
        }
        for (let i = 0; i < query.productsQty; i++) {
            const product = {
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: faker.commerce.price({
                    min: 2000,
                    max: 10000000,
                    dec: 0
                }),
                image: "https://loremflickr.com/640/480",
                categoryId: Math.floor(Math.random() * categories.length) + 1
            }
            await models.Product.create(product)
            // await this.create(product)
        }
    }

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
