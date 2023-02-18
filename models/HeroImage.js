'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HeroImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HeroImage.belongsTo(models.SuperHero, {
        foreignKey: 'superheroId'
      });      
    }
  }
  HeroImage.init({
    imagePath: {
      field: 'image_path',
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'HeroImage',
    tableName: 'hero_images',
    underscored: true    
  });
  return HeroImage;
};