const { faker } = require('@faker-js/faker')
const CustomError = require('../CustomError')
const { models } = require('../libs/sequelize')

class UserService {

    async findOne(id) {
        const userFound = await models.User.findByPk(id)
        if(!userFound) {
            throw new CustomError("Product not found", 404)
        }
        return userFound
    }

    async find() {
        const rta = await models.User.findAll({
            include: ['customer']
        })
        return rta
    }

    async create(data) {
        const newUser = await models.User.create(data)
        return newUser
    }

    async update(id, changes) {
        const userFound = await this.findOne(id)
        const rta = await userFound.update(changes)
        return rta
    }

    async delete(id) {
        const userFound = await this.findOne(id)
        await userFound.destroy()
        return { id }
    }
}

module.exports = UserService
