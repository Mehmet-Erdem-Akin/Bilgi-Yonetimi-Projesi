'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING(200),
                allowNull: false,
                unique: false
            },
            description: {
                type: Sequelize.STRING(200),
                allowNull: false,
                unique: false
            },
            price: {
                type: Sequelize.STRING(200),
                allowNull: false,
                unique: false
            },

            image: Sequelize.STRING,


        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('products');
    }
};