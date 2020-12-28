'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users',[
{
  name:'Test',
  pass:'testtest',
  mail:'test@test.jp',
  createdAt: new Date(),
  updatedAt: new Date()
}
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
