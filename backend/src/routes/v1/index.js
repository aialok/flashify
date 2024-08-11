const router = require("express").Router();

const {
  createFlashcard,
  deleteFlashcard,
  getFlashcardById,
  updateFlashcard,
  getAllFlashcards,
  getAllFlashcardsByPackId,
} = require("../../controllers/flashcard.controller.js");

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

module.exports = router;
