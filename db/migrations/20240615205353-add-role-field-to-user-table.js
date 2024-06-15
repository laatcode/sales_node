'use strict';

const { UserSchema, TABLE } = require('../models/user.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(TABLE, 'role', UserSchema.role)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(TABLE, 'role')
  }
};
