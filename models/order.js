'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        static associate({ User,Product }) {
            //this.hasMany(User,{as:'Order', foreignKey: 'OrderId'})
            this.belongsTo(User, { foreignKey: 'userId', as: 'user' });
            this.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

        }

        /*static associate({Product, User}) {
          this.belongsTo(User, {
            foreignKey: 'userId'
          })
          this.belongsTo(Product, {
            foreignKey: 'productId'
          })

          // define association here
        }*/

    };
    Order.init({

            order_status: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: false
            },

            order_started_date: {
                type: DataTypes.STRING,
                allowNull: false,

            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'User',
                    key: 'id',
                    as: 'userId',
                }
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

        },

        {
            sequelize,
            timestamps: false,
            modelName: 'Order',
            tableName: 'orders'
        });

    return Order;
};