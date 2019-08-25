'use strict';

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'Messages',
      [
        {
          text: 'Alo, How are you?',
          userId: '78d9446b-e132-4dc0-b7f7-abb420fd6ddf',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: `Hi, I'm learning GraphQL`,
          userId: '407feede-3315-423f-9735-af880bdb3a9c',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: "Hi, I'm another message by user id 1",
          userId: '78d9446b-e132-4dc0-b7f7-abb420fd6ddf',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    ),

  down: queryInterface => queryInterface.bulkDelete('Messages', null, {}),
};
