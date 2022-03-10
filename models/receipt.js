'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Receipt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Receipt.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
      Receipt.belongsTo(models.Profile, {
        foreignKey: 'profile_id',
      });
    }
  }
  Receipt.init({
    user_id: DataTypes.INTEGER,
    profile_id: DataTypes.INTEGER,
    receipt_photo: DataTypes.STRING,
    user_photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Receipt',
  });
  return Receipt;
};