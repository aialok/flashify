const { Flashcard, Pack } = require("../models");

/**
 * FlashcardServices Class to handle all the services related to Flashcards
 */

class FlashcardServices {
  // create a new Flashcard
  async createFlashcard(data) {
    try {
      const pack = await Pack.findByPk(data.packId);
      if (!pack) {
        throw new Error("Pack not found");
      }

      const flashcard = await Flashcard.create({
        question: data.question,
        answer: data.answer,
        packId: pack.id,
      });

      return flashcard;
    } catch (error) {
      console.log(
        "There is an error in creating a flashcard : service layer",
        error
      );
      throw new Error(error.message);
    }
  }

  // update a Flashcard
  async updateFlashcard(flashCardId, data) {
    try {
      const updatedFlashcard = await Flashcard.update(data, {
        where: { id: flashCardId },
      });

      return updatedFlashcard;
    } catch (error) {
      console.log(
        "There is an error in updating a flashcard : service layer",
        error
      );
      throw new Error(error.message);
    }
  }

  // delete a Flashcard
  async deleteFlashcard(flashCardId) {
    try {
      const deletedFlashcard = await Flashcard.destroy({
        where: { id: flashCardId },
      });

      return deletedFlashcard;
    } catch (error) {
      console.log(
        "There is an error in deleting a flashcard : service layer",
        error
      );
      throw new Error(error.message);
    }
  }

  // get all flashcards
  async getAllFlashcards() {
    try {
      const flashcards = await Flashcard.findAll({
        include: Pack,
      });

      return flashcards;
    } catch (error) {
      console.log(
        "There is an error in getting all flashcards : service layer",
        error
      );
      throw new Error(error.message);
    }
  }

  // get a single flashcard
  async getSingleFlashcard(flashCardId) {
    try {
      const flashcard = await Flashcard.findByPk(flashCardId, {
        include: Pack,
      });

      return flashcard;
    } catch (error) {
      console.log(
        "There is an error in getting a single flashcard : service layer",
        error
      );
      throw new Error(error.message);
    }
  }

  getAllFlashcardsByPackId(packId) {
    try {
      const flashcards = Flashcard.findAll({
        where: {
          packId: packId,
        },
        include: Pack,
      });

      return flashcards;
    } catch (error) {
      console.log(
        "There is an error in getting all flashcards by packId : service layer",
        error
      );
      throw new Error(error.message);
    }
  }
}

module.exports = new FlashcardServices();
