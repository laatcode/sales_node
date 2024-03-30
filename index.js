const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 5000

const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.get('/', (req, res) => res.send('Hello, World!'))
app.use(express.json())

routes(app)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server runing at port ${PORT}`))
