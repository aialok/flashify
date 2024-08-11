import React, { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useFetchFlashCard from "../hooks/useFetchFlashCard";

function EditFlashcardPack() {
  const { id } = useParams();
  const {
    flashCards: initialFlashCards,
    loading,
    packName: initialPackName,
  } = useFetchFlashCard(id);

  const [flashCards, setFlashCards] = useState([]);
  const [packName, setPackName] = useState("");

  useEffect(() => {
    if (initialFlashCards) {
      setFlashCards(initialFlashCards);
    }
    if (initialPackName) {
      setPackName(initialPackName);
    }
  }, [initialFlashCards, initialPackName]);

  const addFlashcard = () => {
    const newId = flashCards.length + 1;
    setFlashCards([...flashCards, { id: newId, question: "", answer: "" }]);
  };

  const removeFlashcard = async (id) => {
    // delete this from database
    const response = await axios.delete(
      `http://localhost:3000/api/v1/flashcard/${id}`
    );
    if (response) {
      setFlashCards(flashCards.filter((card) => card.id !== id));
      alert("successfully deleted");
    }
  };

  const updateHandler = async (e) => {
    e.preventDefault();

    try {
      if (!packName) {
        throw new Error("Please fill out the pack name");
      }

      const response = await axios.put(
        `http://localhost:3000/api/v1/pack/${id}`,
        { name: packName }
      );
      console.log(response);

      const updatePromises = flashCards.map(async (card) => {
        if (!card.question || !card.answer) {
          throw new Error(
            `Please fill out all fields for flashcard ${card.id}`
          );
        }
        return axios.put(`http://localhost:3000/api/v1/flashcard/${card.id}`, {
          question: card.question,
          answer: card.answer,
        });
      });

      await Promise.all(updatePromises);
      alert("Success");
    } catch (error) {
      alert("Failed: " + error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto bg-gray-100 min-h-screen p-6">
      <header className="bg-white rounded-lg shadow-md p-6 mb-8 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Pencil className="w-6 h-6 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Edit Flashcards</h1>
        </div>
        <button
          className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300 flex items-center space-x-2"
          onClick={updateHandler}
        >
          <span>Update Pack</span>
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
            Don't want to write your own flashCards? Try our{" "}
            <span className="text-blue-600 font-semibold">
              AI Flashcard Generator
            </span>{" "}
            to instantly transform your notes or documents into flashCards.
          </p>
        </div>

        {flashCards.map((card, index) => (
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
                  value={card.question}
                  onChange={(e) => {
                    const newFlashcards = flashCards.map((c) =>
                      c.id === card.id ? { ...c, question: e.target.value } : c
                    );
                    setFlashCards(newFlashcards);
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className="font-medium text-gray-700 block">Back</label>
                <textarea
                  placeholder="Back of card"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-transparent transition duration-300 min-h-[100px]"
                  value={card.answer}
                  onChange={(e) => {
                    const newFlashcards = flashCards.map((c) =>
                      c.id === card.id ? { ...c, answer: e.target.value } : c
                    );
                    setFlashCards(newFlashcards);
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

export default EditFlashcardPack;
