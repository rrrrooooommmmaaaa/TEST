'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('hero_images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },       
      superheroId: {
        field: 'superhero_id',
        type: Sequelize.INTEGER,
        allowNull: false,            
        references: {
          model: {
            tableName: 'superheroes',
            key: 'id'
          }
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      imagePath: {
        field: 'image_path',
        allowNull: false,           
        type: Sequelize.TEXT
      },
      createdAt: {
        field: 'created_at',        
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: 'updated_at',                
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('hero_images');
  }
};