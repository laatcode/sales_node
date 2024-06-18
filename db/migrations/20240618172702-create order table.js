'use strict';

const { OrderSchema, TABLE } = require('../models/order.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
      await queryInterface.createTable(TABLE, OrderSchema)
  },

  async down (queryInterface) {
      await queryInterface.dropTable(TABLE)
  }
};
