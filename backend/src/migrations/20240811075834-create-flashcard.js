"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Flashcards", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      question: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      questionImgUrl: {
        type: Sequelize.TEXT,
      },
      answer: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      answerImgUrl: {
        type: Sequelize.TEXT,
      },
      packId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Packs",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Flashcards");
  },
};
