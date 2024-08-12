const flashcardsServices = require("../services/flashcard.services");

const createFlashcard = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const flashcard = await flashcardsServices.createFlashcard(req.body);
    return res.status(201).json({
      message: "Flashcard created successfully",
      success: true,
      data: flashcard,
    });
  } catch (error) {
    console.log(
      "There is an error in creating a flashcard : controller layer",
      error
    ); // For debugging purposes
    return res.status(500).json({ message: error.message, success: false });
  }
};

const updateFlashcard = async (req, res) => {
  try {
    const flashcard = await flashcardsServices.updateFlashcard(
      req.params.id,
      req.body
    );
    return res.status(200).json({
      message: "Flashcard updated successfully",
      success: true,
      data: flashcard,
    });
  } catch (error) {
    console.log(
      "There is an error in updating a flashcard : controller layer",
      error
    ); // For debugging purposes
    return res.status(500).json({ message: error.message, success: false });
  }
};

const deleteFlashcard = async (req, res) => {
  try {
    const flashcard = await flashcardsServices.deleteFlashcard(req.params.id);
    return res.status(200).json({
      message: "Flashcard deleted successfully",
      success: true,
      data: flashcard,
    });
  } catch (error) {
    console.log(
      "There is an error in deleting a flashcard : controller layer",
      error
    ); // For debugging purposes
    return res.status(500).json({ message: error.message, success: false });
  }
};

const getAllFlashcards = async (req, res) => {
  try {
    const flashcards = await flashcardsServices.getAllFlashcards();
    return res.status(200).json({
      message: "Fetched FlashCard Successfully",
      success: true,
      data: flashcards,
    });
  } catch (error) {
    console.log(
      "There is an error in getting all flashcards : controller layer",
      error
    ); // For debugging purposes
    return res.status(500).json({ message: error.message, success: false });
  }
};

const getFlashcardById = async (req, res) => {
  try {
    const flashcard = await flashcardsServices.getSingleFlashcard(
      req.params.id
    );
    return res.status(200).json({
      message: "Fetched FlashCard Successfully",
      success: true,
      data: flashcard,
    });
  } catch (error) {
    console.log(
      "There is an error in getting a flashcard : controller layer",
      error
    ); // For debugging purposes
    return res.status(500).json({ message: error.message, success: false });
  }
};

const getAllFlashcardsByPackId = async (req, res) => {
  try {
    const flashcards = await flashcardsServices.getAllFlashcardsByPackId(
      req.params.id
    );
    return res.status(200).json({
      message: "Fetched FlashCard Successfully",
      success: true,
      data: flashcards,
    });
  } catch (error) {
    console.log(
      "There is an error in getting a flashcard : controller layer",
      error
    ); // For debugging purposes
    return res.status(500).json({ message: error.message, success: false });
  }
};

const getPackLength = async (req, res) => {
  try {
    const packLength = await flashcardsServices.getPackLength(req.params.id);
    return res.status(200).json({
      message: "Fetched FlashCard Successfully",
      success: true,
      data: packLength,
    });
  } catch (error) {
    console.log(
      "There is an error in getting a flashcard : controller layer",
      error
    ); // For debugging purposes
    return res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = {
  createFlashcard,
  updateFlashcard,
  deleteFlashcard,
  getAllFlashcards,
  getFlashcardById,
  getAllFlashcardsByPackId,
  getPackLength
};
