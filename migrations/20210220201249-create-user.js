'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING(200),
        allowNull: false,
        unique: false
      },
      lastName: {
        type: Sequelize.STRING(200),
        allowNull: false,
        unique: false
      },
      age: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: false
      },
      city: {
        type: Sequelize.STRING(200),
        allowNull: false,
        unique: false
      },
      country: {
        type: Sequelize.STRING(200),
        allowNull: false,
        unique: false
      },
      adress: {
        type: Sequelize.STRING(200),
        allowNull: false,
        unique: false
      },
      username: {
        type: Sequelize.STRING(200),
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING(200),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imageUrl: Sequelize.STRING,
      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};