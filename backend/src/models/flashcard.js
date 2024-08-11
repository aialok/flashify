"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Flashcard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Flashcard.belongsTo(models.Pack, { foreignKey: "packId" });
    }
  }
  Flashcard.init(
    {
      question: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      questionImgUrl: {
        type: DataTypes.STRING(2048),
      },
      answer: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      answerImgUrl: DataTypes.STRING(2048),
      packId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Flashcard",
    }
  );
  return Flashcard;
};
