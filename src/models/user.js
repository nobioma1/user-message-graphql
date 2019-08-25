'use strict';
const { hashPassword, compareHashPassword } = require('../utils/passwordHash');

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
        unique: true,
        validate: {
          notEmpty: {
            args: true,
            msg: 'A user has to have a username.',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      hooks: {
        beforeCreate: user => {
          user.password = hashPassword(user.password);
        },
      },
    },
  );
  User.associate = ({ Message }) => {
    // associations can be defined here
    User.hasMany(Message, {
      foreignKey: 'userId',
      as: 'message',
      onDelete: 'CASCADE',
    });
  };

  // Custom model
  User.findByCred = async cred => {
    // This model retrieves a user by email or username

    let user = await User.findOne({
      where: { username: cred },
    });
    if (!user) {
      user = await User.findOne({
        where: { email: cred },
      });
    }
    return user;
  };

  User.prototype.validatePassword = function(password) {
    return compareHashPassword(password, this.password);
  };

  return User;
};
