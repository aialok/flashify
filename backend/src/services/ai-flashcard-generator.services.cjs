const { z } = require("zod");
const { zodResponseFormat } = require("openai/helpers/zod");
const OpenAI = require("openai");
const flashcardServices = require("./flashcard.services");
const {Pack} = require("../models/index");

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const FlashCardSchema = z.object({
  question: z.string({ description: "The question for the flashcard." }),
  answer: z.string({ description: "The answer to the question." }),
});

const FlashCardArraySchema = z.object({
  packName: z.string({ description: "The name of the flashcard pack." }),
  flashcards: z.array(FlashCardSchema),
});

async function createAIGeneratorFlashCard(prompt) {
  try {
    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-2024-08-06",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful flashcards. Create multiple questions and answers for flashcards based on the following prompt. Return an array of flashcards.",
        },
        { role: "user", content: prompt },
      ],
      response_format: zodResponseFormat(FlashCardArraySchema, "flashcards"),
    });

    const flashCardResponse = completion.choices[0].message;

    return flashCardResponse;
  } catch (error) {
    console.log(
      "There is an error in creating flashcards with AI : service layer",
      error
    );
    throw new Error(error.message);
  }
}

async function createFlashCardWithAI(prompt) {
  // Create flashcards with AI
  try {
    const flashcards = await createAIGeneratorFlashCard(prompt);

    if (flashcards.refusal) {
      return {
        success: false,
        message: flashcards.refusal,
      };
    }

    const flashcardData = flashcards.parsed;

    // Create flashcards
    for (const flashcard of flashcardData.flashcards) {
      await flashcardServices.createFlashcard({
        question: flashcard.question,
        answer: flashcard.answer,
        packName: flashcardData.packName,
      });
    }

    const pack = await Pack.findOne({
      where: {
        name: flashcardData.packName,
      },
    });

    return pack.id;
  } catch (error) {
    console.log(
      "There is an error in creating flashcards with AI : service layer",
      error
    );
    throw new Error(error.message);
  }
}

module.exports = {
  createFlashCardWithAI,
};
