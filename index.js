const express = require('express')
const app = express()
const PORT = 5000

const { faker } = require('@faker-js/faker')

app.get('/', (req, res) => res.send('Hello, World!'))

app.get('/products', (req, res) => {
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

app.listen(PORT, () => console.log(`Server runing at port ${PORT}`))
