'use strict';

const { OrderProductSchema, TABLE } = require('../models/order-product.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
      await queryInterface.createTable(TABLE, OrderProductSchema)
  },

  async down (queryInterface) {
      await queryInterface.dropTable(TABLE)
  }
};
