import React, { useState } from "react";
import {
  Pencil,
  Image,
  Trash2,
  RotateCw,
} from "lucide-react";

function ManualFlashcard() {
  const [flashcards, setFlashcards] = useState([
    { id: 1, front: "", back: "" },
    { id: 2, front: "", back: "" },
    { id: 3, front: "", back: "" },
  ]);

  const addFlashcard = () => {
    const newId = flashcards.length + 1;
    setFlashcards([...flashcards, { id: newId, front: "", back: "" }]);
  };

  const removeFlashcard = (id) => {
    setFlashcards(flashcards.filter((card) => card.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto bg-gray-100 min-h-screen p-6">
      <header className="bg-white rounded-lg shadow-md p-6 mb-8 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Pencil className="w-6 h-6 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">
            Create Flashcards
          </h1>
        </div>
        <button className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300 flex items-center space-x-2">
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
          />
          <p className="mt-4 text-gray-600">
            Don't want to write your own flashcards? Try our{" "}
            <span className="text-blue-600 font-semibold">
              AI Flashcard Generator
            </span>{" "}
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
                />
              </div>
              <div className="space-y-2">
                <label className="font-medium text-gray-700 block">Back</label>
                <textarea
                  placeholder="Back of card"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-transparent transition duration-300 min-h-[100px]"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <button className="text-blue-600 hover:text-blue-800 flex items-center space-x-1">
                <Image className="w-5 h-5" />
                <span>Add Image</span>
              </button>
              <button className="text-gray-600 hover:text-gray-800">
                <RotateCw className="w-5 h-5" />
              </button>
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

export default ManualFlashcard;
