const { sequelize } = require("../models");
const { Flashcard, Pack } = require("../models");
const redis = require("../config/redis.config");

/**
 * FlashcardServices Class to handle all the services related to Flashcards
 */

class FlashcardServices {
  // create a new Flashcard
  async createFlashcard(data) {
    const t = await sequelize.transaction();
    try {
      const [pack, created] = await Pack.findOrCreate({
        where: { name: data.packName.trim() },
        defaults: { name: data.packName.trim() },
        transaction: t,
        lock: t.LOCK.UPDATE, // Add a lock to prevent concurrent modifications
      });

      await Flashcard.create(
        {
          question: data.question,
          answer: data.answer,
          packId: pack.id,
        },
        { transaction: t }
      );

      await redis.del("packs");

      await t.commit();
      return pack.id;
    } catch (error) {
      await t.rollback();
      console.log(
        "There is an error in creating a flashcard : service layer",
        error
      );
      throw error;
    }
  }

  // update a Flashcard
  async updateFlashcard(flashCardId, data) {
    try {
      // check flashcard already exist or not
      const checkFlashcardExist = await Flashcard.findByPk(flashCardId);

      if (!checkFlashcardExist) {
        // create a new flashcard
        const newFlashcard = await Flashcard.create(data);
        return newFlashcard;
      }

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

  async getAllFlashcardsByPackId(packId) {
    try {
      // check if data is present in Redis
      const cacheData = await redis.get(`packId/${packId}`);

      if (cacheData) {
        return JSON.parse(cacheData);
      }

      const flashcards = await Flashcard.findAll({
        where: {
          packId: packId,
        },
        include: Pack,
      });

      // cached the data

      await redis.set(`packId/${packId}`, JSON.stringify(flashcards));

      return flashcards;
    } catch (error) {
      console.log(
        "There is an error in getting all flashcards by packId : service layer",
        error
      );
      throw new Error(error.message);
    }
  }

  async getPackLength(id) {
    try {
      const cacheData = await redis.get(`pack_length:${id}`);

      if (cacheData) {
        return parseInt(cacheData, 10);
      }

      const packLength = await Flashcard.count({
        where: { packId: id },
      });

      await redis.set(`pack_length:${id}`, packLength);

      return packLength;
    } catch (error) {
      console.log(
        "There is an error in getting pack length : service layer",
        error
      );
      throw new Error(error.message);
    }
  }
}

module.exports = new FlashcardServices();
