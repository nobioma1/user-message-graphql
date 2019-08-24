'use strict';

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'users',
      [
        {
          id: '78d9446b-e132-4dc0-b7f7-abb420fd6ddf',
          username: 'johnFardom',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '407feede-3315-423f-9735-af880bdb3a9c',
          username: 'janeThriller',

          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '3f917ff7-3fa4-4a85-bd6b-f72f9f448a52',
          username: 'lukeStardome',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    ),

  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
};
