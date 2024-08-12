import React, { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import useFetchFlashCard from "../hooks/useFetchFlashCard";
import { toast } from "react-hot-toast";
import Loader from "./Loader";

function EditFlashcardPack() {
  const { id } = useParams();
  const navigate = useNavigate();
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
    try {
      const response = axios
        .delete(`${import.meta.env.VITE_BACKEND_URI}/api/v1/flashcard/${id}`)
        .then(() => {
          setFlashCards(flashCards.filter((card) => card.id !== id));
        });

      toast.promise(response, {
        loading: "Deleting flashcard...",
        success: "Flashcard deleted successfully",
        error: "Failed to delete flashcard",
      });
    } catch (error) {
      toast.error("Failed to delete flashcard: " + error.message);
    }
  };

  const updateHandler = async (e) => {
    e.preventDefault();

    const updateProcess = async () => {
      if (!packName) {
        throw new Error("Please fill out the pack name");
      }

      // Update pack name
      await axios.put(`${import.meta.env.VITE_BACKEND_URI}/api/v1/pack/${id}`, {
        name: packName,
      });

      // Update flashcards
      const updatePromises = flashCards.map(async (card) => {
        if (!card.question || !card.answer) {
          throw new Error(
            `Please fill out all fields for flashcard ${card.id}`
          );
        }
        return axios.put(`${import.meta.env.VITE_BACKEND_URI}/api/v1/flashcard/${card.id}`, {
          question: card.question,
          answer: card.answer,
          packId: id,
        });
      });

      await Promise.all(updatePromises);
    };

    toast
      .promise(updateProcess(), {
        loading: "Updating flashcard pack...",
        success: "Flashcard pack updated successfully!",
        error: (err) => `Update failed: ${err.message}`,
      })
      .then(() => {
        navigate(`/flashcard-pack/${id}`);
      })
      .catch((error) => {
        console.error("Error after toast:", error);
      });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto bg-gray-100 min-h-screen p-6">
      <header className="bg-white rounded-lg shadow-md p-6 mb-8 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Pencil className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl sm:text-3xl font-bold text-gray-800">Edit Flashcards</h1>
        </div>
        <button
          className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300 flex items-center space-x-2 text-sm sm:text-lg"
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
