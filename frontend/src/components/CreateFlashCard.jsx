import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

function CreateFlashCard() {
  const [flashcards, setFlashcards] = useState([
    { id: 1, front: "", back: "" },
    { id: 2, front: "", back: "" },
  ]);

  const navigate = useNavigate();

  const [packName, setPackName] = useState("");

  const addFlashcard = () => {
    const newId = flashcards.length + 1;
    setFlashcards([...flashcards, { id: newId, front: "", back: "" }]);
  };

  const removeFlashcard = (id) => {
    setFlashcards(flashcards.filter((card) => card.id !== id));
  };

  const onSavePackHandler = async (e) => {
    e.preventDefault();

    if (!packName.trim()) {
      toast.error("Please enter a pack name");
      return;
    }

    const createFlashcard = async (card, index) => {
      if (!card.front.trim() || !card.back.trim()) {
        throw new Error(`Please fill out all fields for card ${index + 1}`);
      }
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URI}/api/v1/flashcard`,
          {
            packName: packName.trim(),
            question: card.front.trim(),
            answer: card.back.trim(),
          }
        );
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(`Error creating flashcard ${index + 1}:`, error);
        throw error;
      }
    };

    const createAllFlashcards = async () => {
      const results = await Promise.all(
        flashcards.map((card, index) => createFlashcard(card, index))
      );
      return results[0];
    };

    toast.promise(
      createAllFlashcards().then((res) => {
        navigate(`/flashcard-pack/${res.data}`);
      }),
      {
        loading: "Creating flashcards...",
        success: "Flashcards created successfully",
        error: "Error creating flashcards",
      }
    );
  };

  return (
    <div className="max-w-7xl mx-auto bg-gray-100 min-h-screen p-6">
      <header className="bg-white rounded-lg shadow-md p-6 mb-8 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Pencil className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl sm:text-3xl font-bold text-gray-800">
            Create Flashcards
          </h1>
        </div>
        <button
          className="bg-blue-600 text-white font-semibold py-2 px-4 sm:px-6 rounded-full hover:bg-blue-700 transition duration-300 flex items-center space-x-2 text-sm sm:text-base"
          onClick={onSavePackHandler}
        >
          <span>Save Pack</span>
        </button>
      </header>

      <main className="space-y-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <label
            htmlFor="pack-name"
            className="text-xl font-semibold text-gray-700 block mb-2"
          >
            Pack Name
          </label>
          <input
            type="text"
            id="pack-name"
            placeholder="Enter flashcard pack name"
            className="w-full p-3 border border-gray-300 rounded-lg transition duration-300"
            value={packName}
            onChange={(e) => setPackName(e.target.value)}
          />
          <p className="mt-4 text-gray-600">
            Don't want to write your own flashcards? Try our{" "}
            <Link to="/ai-generator" className="text-blue-600 font-semibold">
              AI Flashcard Generator
            </Link>{" "}
            to instantly transform your notes or documents into flashcards.
          </p>
        </div>

        {flashcards.map((card, index) => (
          <div key={card.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">
                Flashcard {index + 1}
              </h2>
              <button
                onClick={() => removeFlashcard(card.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-medium text-gray-700 block">Front</label>
                <textarea
                  placeholder="Front of card"
                  className="w-full p-3 border border-gray-300 rounded-lg  focus:border-transparent transition duration-300 min-h-[100px]"
                  value={card.front}
                  onChange={(e) => {
                    const newFlashcards = [...flashcards];
                    newFlashcards[index].front = e.target.value;
                    setFlashcards(newFlashcards);
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className="font-medium text-gray-700 block">Back</label>
                <textarea
                  placeholder="Back of card"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-transparent transition duration-300 min-h-[100px]"
                  value={card.back}
                  onChange={(e) => {
                    const newFlashcards = [...flashcards];
                    newFlashcards[index].back = e.target.value;
                    setFlashcards(newFlashcards);
                  }}
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addFlashcard}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition duration-300"
        >
          + Add Flashcard
        </button>
      </main>
    </div>
  );
}

export default CreateFlashCard;
