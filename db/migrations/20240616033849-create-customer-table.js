'use strict';

const { CustomerSchema, TABLE } = require('../models/customer.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(TABLE, CustomerSchema)
  },

  async down (queryInterface) {
    await queryInterface.dropTable(TABLE)
  }
};
