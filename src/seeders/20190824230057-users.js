'use strict';
const { hashPassword } = require('../utils/passwordHash');

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'Users',
      [
        {
          id: '78d9446b-e132-4dc0-b7f7-abb420fd6ddf',
          username: 'johnFardom',
          email: 'john@email.com',
          password: hashPassword('demo'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '407feede-3315-423f-9735-af880bdb3a9c',
          username: 'janeThriller',
          email: 'jane@email.com',
          password: hashPassword('demo'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '3f917ff7-3fa4-4a85-bd6b-f72f9f448a52',
          username: 'lukeStardome',
          email: 'luke@email.com',
          password: hashPassword('demo'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '8843a0e6-9451-441e-abab-30631ee9d036',
          username: 'noble',
          email: 'noble@email.com',
          password: hashPassword('demo'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
