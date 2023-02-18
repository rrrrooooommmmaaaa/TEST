'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SuperHero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SuperHero.hasMany(models.HeroImage, {
        foreignKey: 'superheroId'
      });
  
      SuperHero.belongsToMany(models.SuperPower, {
          through: 'heroes_to_powers',
          foreignKey: 'superheroId'
        });      
    }
  }
  SuperHero.init({
    nickName: {
      field: 'nickname',
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    realName: {
      field: 'real_name',
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
      }      
    },
    originDescription: {
      field: 'origin_description',
      type: DataTypes.TEXT
    },
    cathPhrase: {
      field: 'cath_phrase',
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'SuperHero',
    tableName: 'superheroes',
    underscored: true    
  });
  return SuperHero;
};