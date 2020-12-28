'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type:DataTypes.STRING,
    },
    pass: {
      type: DataTypes.STRING,
    },
    mail: {
      type: DataTypes.STRING,
    },
  }, {});
  User.associate = function(models) {
  };
  return User;
};