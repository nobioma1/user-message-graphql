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
  Message.associate = ({ user }) => {
    // associations can be defined here
    Message.belongsTo(user, {
      foreignKey: 'userId',
    });
  };
  return Message;
};
