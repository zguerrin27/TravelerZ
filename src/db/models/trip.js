'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Trip.associate = function(models) {
    Trip.hasMany(models.Comment, {
      foreignKey: "tripId",
      as: "comments"
    });
  };
  return Trip;
};