'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'Message',
    {
      text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'A message has to have a text.',
          },
        },
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {},
  );
  Message.associate = ({ User }) => {
    // associations can be defined here
    Message.belongsTo(User, {
      foreignKey: 'userId',
    });
  };
  return Message;
};
