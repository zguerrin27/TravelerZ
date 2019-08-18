'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      body: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      tripId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE", // delete comment if parent topic is deleted
        allowNull: false,    // validation to prevent null value
        references: {        // association information
          model: "Trips",   // table name that we want to "connect" to
          key: "id",         // attribute  on that table to use to "connect" to it
          as: "tripId"      // this tables reference as tripId
        },
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Comments');
  }
};