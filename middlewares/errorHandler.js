
const { ValidationError } = require('sequelize')

const ormErrorHandler = (err, req, res, next) => {
    if(err instanceof ValidationError) {
        res.status(409).json({
            message: err.name,
            errors: err.errors
        })
    }
    next(err)
}

const errorHandler = (err, req, res, next) => {

    res.status(err.statusCode || 500).json({
        method: req.method,
        path: req.url,
        message: err.message
    })

}

module.exports = { errorHandler, ormErrorHandler }
