'use strict';

const { ProductSchema, TABLE: PRODUCT_TABLE } = require('../models/product.model')
const { CategorySchema, TABLE: CATEGORY_TABLE } = require('../models/category.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema)
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema)
  },

  async down (queryInterface) {
    await queryInterface.dropTable(PRODUCT_TABLE)
    await queryInterface.dropTable(CATEGORY_TABLE)
  }
};
