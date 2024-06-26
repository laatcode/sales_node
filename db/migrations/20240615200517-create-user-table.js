'use strict';

const { UserSchema, TABLE } = require('../models/user.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(TABLE, UserSchema)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(TABLE)
  }
};
