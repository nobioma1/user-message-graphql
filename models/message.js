'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'message',
    {
      text: {
        type: DataTypes.STRING,
        allowNull: false,
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
  return message;
};
