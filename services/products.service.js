const { faker } = require('@faker-js/faker')
const CustomError = require('../CustomError')
const pool = require('../libs/postgres')

class ProductsService {

    constructor() {
        this.products = []
        this.pool = pool
        this.pool.on("error", err => console.error(err))
    }

    createSeeds() {
        this.products = []
        for (let index = 0; index < 100; index++) {
            const product = {
                id: faker.string.uuid(),
                name: faker.commerce.productName(),
                price: Number(faker.commerce.price({
                    min: 2000,
                    max: 120000
                }))
            }
            this.products.push(product)
        }
    }

    async find() {
        const query = 'SELECT * FROM tasks'
        const response = await this.pool.query(query)
        return response.rows
    }

    findIndex(id) {
        const productIndex = this.products.findIndex(product => product.id === id)
        if(productIndex === -1) {
            throw new CustomError("Product not found", 404)
        }

        return productIndex
    }

    findOne(id) {
        const productIndex = this.findIndex(id)

        return this.products[productIndex]
    }

    create(productData) {
        const newProduct = {
            id: faker.string.uuid(),
            ...productData
        }

        this.products.push(newProduct)
        return newProduct
    }

    update(productId, productData) {
        const productIndex = this.findIndex(productId)

        const updatedProduct = {
            ...this.products[productIndex],
            ...productData,
            id: productId
        }

        this.products[productIndex] = updatedProduct

        return updatedProduct
    }

    delete(productId) {
        this.findIndex(productId)

        const products = this.products.filter(product => product.id !== productId)
        this.products = products
    }
}

module.exports = ProductsService
