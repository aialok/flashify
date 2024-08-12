const router = require("express").Router();
const {
  createFlashcard,
  deleteFlashcard,
  getFlashcardById,
  updateFlashcard,
  getAllFlashcards,
  getAllFlashcardsByPackId,
  getPackLength,
} = require("../../controllers/flashcard.controller.js");

const {
  createPack,
  deletePack,
  getAllPacks,
  updatePack,
  getPackById,
} = require("../../controllers/pack.controller.js");

const {
  generateAIFlashCard,
} = require("../../controllers/ai-flashcard-generator.controller.js");

// Flashcard routes

/**
 * @route POST /create-flashcard
 * @description Create a new flashcard
 */
router.post("/flashcard", createFlashcard);

/**
 * @route Delete /delete-flashcard/:id
 * @description Delete a flashcard
 */
router.delete("/flashcard/:id", deleteFlashcard);

/**
 * @route GET /flashcard/:id
 * @description Get a flashcard by id
 */
router.get("/flashcard/:id", getFlashcardById);

/**
 * @route PUT flashcard/:id
 * @description Update a flashcard
 */
router.put("/flashcard/:id", updateFlashcard);

/**
 * @route GET /flashcards
 * @description Get all flashcards
 */
router.get("/flashcards", getAllFlashcards);

/**
 * @route GET /flashcards/pack/:id
 * @description Get all flashcards by pack id
 */
router.get("/flashcards/pack/:id", getAllFlashcardsByPackId);

// Pack routes

/**
 * @route POST /pack
 * @description Create a new pack
 */
router.post("/pack", createPack);

/**
 * @route Delete /pack/:id
 * @description Delete a pack
 */
router.delete("/pack/:id", deletePack);

/**
 * @route GET /packs
 * @description Get all packs
 */
router.get("/packs", getAllPacks);

/**
 * @route PUT /pack/:id
 * @description Update a pack
 */
router.put("/pack/:id", updatePack);

/**
 * @route GET /pack/:id
 */
router.get("/pack/:id", getPackById);

/**
 * @route GET /pack-length/
 * @description Get the number of flashcards in a pack
 */
router.get("/pack-length/:id", getPackLength);

// AI Flashcard Generator routes

/**
 * @route POST /ai-flashcard-generator
 * @description Generate flashcards using AI
 */

router.post("/generate-ai", generateAIFlashCard);

module.exports = router;
