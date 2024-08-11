"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Flashcards", [
      {
        question: "What is JavaScript?",
        answer:
          "JavaScript is a programming language that is commonly used to create interactive elements on websites.",
        packId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question: "What is the difference between let and const in JavaScript?",
        answer:
          "The let keyword is used to declare a variable that can be reassigned, while the const keyword is used to declare a variable that cannot be reassigned.",
        packId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Flashcards", null, {});
  },
};
