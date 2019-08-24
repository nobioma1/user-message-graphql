'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
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
  User.associate = ({ message }) => {
    // associations can be defined here
    User.hasMany(message, { onDelete: 'CASCADE' });
  };
  return User;
};
