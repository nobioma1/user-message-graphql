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

  return User;
};
