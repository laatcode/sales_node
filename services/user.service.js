const { faker } = require('@faker-js/faker')
// const CustomError = require('../CustomError')
const { models } = require('../libs/sequelize')

class UserService {
    async find() {
        const rta = await models.User.findAll()
        return rta
    }
}

module.exports = UserService
