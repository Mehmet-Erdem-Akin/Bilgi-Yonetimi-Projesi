'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

     static associate({Order}){
      //this.belongsTo(Order,{ foreignKey: 'orderId'})
      this.hasMany(Order, {foreignKey: 'userId',as: 'order'})
    }

     /*static associate({Order}) {
      this.hasMany(Order, {
        as: 'order'
      })
      // define association here
    }*/
  };
  User.init({
    
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail:{
          args: true,
          msg: 'must be a valid email address !',
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    
    imageUrl: {
      type: DataTypes.STRING,
    },
    firstName: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: false
    },
    lastName: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: false
    },
    age: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: false
    },
    city: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: false
    },
    country: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: false
    },
    adress: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: false
    },
  },
     {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};