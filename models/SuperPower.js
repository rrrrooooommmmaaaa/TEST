'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SuperPower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SuperPower.belongsToMany(models.SuperHero, {
        through: 'heroes_to_powers',
        foreignKey: 'superpowerId'
      });      
    }
  }
  SuperPower.init({
    superPowerKind: {
      field: 'superpower_kind',
      type: DataTypes.STRING,      
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    description: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'SuperPower',
    tableName: 'superpowers',
    underscored: true
  });
  return SuperPower;
};