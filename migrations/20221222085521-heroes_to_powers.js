'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('heroes_to_powers', { 
      superheroId:{
        field: 'superhero_id',
        type: Sequelize.INTEGER,
        allowNull: false,   
        primaryKey: true,           
        references: {
          model: {
            tableName:'superheroes',
            key: 'id'
          }
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      superpowerId:{
        field: 'superpower_id',
        type: Sequelize.INTEGER,
        allowNull: false,    
        primaryKey: true,        
        references: {
          model: {
            tableName:'superpowers',
            key: 'id'
          }
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('heroes_to_powers');
  }
};