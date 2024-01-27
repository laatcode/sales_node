const express = require('express')
const app = express()
const PORT = 5000

const routes = require('./routes')

app.get('/', (req, res) => res.send('Hello, World!'))
app.use(express.json())
routes(app)

app.listen(PORT, () => console.log(`Server runing at port ${PORT}`))
