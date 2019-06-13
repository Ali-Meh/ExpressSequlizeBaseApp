'use strict';
const {hash} = require('../components/crypto')
const token = require('rand-token')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('admins', [{
      username : 'admin',
      email: "admin@gmail.com",
      password: await hash('123456'),
      phone: '9146917713',
      reset_token: token.generate(32)
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('admins', null, {});
  }
};
