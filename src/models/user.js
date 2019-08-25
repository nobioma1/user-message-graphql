'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {},
  );
  User.associate = ({ Message }) => {
    // associations can be defined here
    User.hasMany(Message, {
      foreignKey: 'userId',
      as: 'message',
      onDelete: 'CASCADE',
    });
  };
  return User;
};
