'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Profile.init({
    type: DataTypes.STRING,
    item: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    amount: DataTypes.FLOAT,
    note: DataTypes.CITEXT
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};