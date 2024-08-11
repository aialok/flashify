'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Flashcards', 'Flashcards_ibfk_1');
    await queryInterface.addConstraint('Flashcards', {
      fields: ['packId'],
      type: 'foreign key',
      name: 'Flashcards_packId_fkey',
      references: {
        table: 'Packs',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Flashcards', 'Flashcards_ibfk_1');
    await queryInterface.addConstraint('Flashcards', {
      fields: ['packId'],
      type: 'foreign key',
      name: 'Flashcards_packId_fkey',
      references: {
        table: 'Packs',
        field: 'id'
      }
    });
  }
};