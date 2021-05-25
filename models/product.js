'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Order}) {
      // define association here
      //this.belongsTo(Order, {foreignKey: 'id', as: 'order'});
      
      this.hasMany(Order, {foreignKey: 'productId',as: 'order'})

        /*this.hasMany(Order, {
          as: 'order'
        })*/
        // define association here
      
    }
  };
  Product.init({
    
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: false
    },
    
    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: false,
    },
   
    image: DataTypes.STRING,
    
    price: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: false
    },
    

  },
     {
    sequelize,
    timestamps: false,
    modelName: 'Product',
    tableName: 'products'
  });
  return Product;
};