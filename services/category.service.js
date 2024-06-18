const CustomError = require('../CustomError')
const { models } = require('../libs/sequelize')

class CategoryService {

    async findOne(id) {
        const categoryFound = await models.Category.findByPk(id, { include: 'products' })
        if(!categoryFound) {
            throw new CustomError("Category not found", 404)
        }
        return categoryFound
    }

    async find() {
        const rta = await models.Category.findAll()
        return rta
    }

    async create(data) {
        const newCategory = await models.Category.create(data)
        return await this.findOne(newCategory.id)
    }

    async update(id, changes) {
        const categoryFound = await this.findOne(id)
        const rta = await categoryFound.update(changes)
        return rta
    }

    async delete(id) {
        const categoryFound = await this.findOne(id)
        await categoryFound.destroy()
        return { id }
    }
}

module.exports = CategoryService
