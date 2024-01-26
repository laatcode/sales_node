const router = require('express').Router()
const { faker } = require('@faker-js/faker')

router.get('/', (req, res) => {
    const products = []

    for (let index = 0; index < 100; index++) {
        products.push({
            name: faker.commerce.productName(),
            price: Number(faker.commerce.price()),
            image: faker.image.url()
        })
    }
    res.json(products)
})

module.exports = router
