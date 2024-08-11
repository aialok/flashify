"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Packs", [
      {
        name: "JavaScript Basics",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "JavaScript ES6 Features",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Packs", null, {});
  },
};
