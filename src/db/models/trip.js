'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Trip.associate = function(models) {
    // associations can be defined here
  };
  return Trip;
};