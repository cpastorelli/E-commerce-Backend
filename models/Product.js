// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.DECIMAL
      //need to add validation here for price
    },
    stock: {
      type: DataTypes.INTEGER,
      //Default value (10)
      //need to add validation here for price
    },
    category_id: {
      type: DataTypes.INTEGER,
      // references category id
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
