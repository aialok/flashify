import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, RotateCw, Pencil } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import FlashcardComponent from "./FlipCardComponent";
import useFetchFlashCard from "../hooks/useFetchFlashCard";
import Loader from "./Loader";

const FlashcardPackPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const { flashCards, loading, packName } = useFetchFlashCard(id);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % flashCards.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentCard(
      (prev) => (prev - 1 + flashCards.length) % flashCards.length
    );
    setIsFlipped(false);
  };

  const handleEditPack = () => {
    navigate(`/edit-pack/${id}`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-8 text-gray-900">{packName}</h1>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <FlashcardComponent
            currentCardIndex={currentCard}
            isFlipped={isFlipped}
            setIsFlipped={setIsFlipped}
            cards={
              flashCards.length > 0
                ? flashCards
                : [
                    {
                      question: "No Flashcards found",
                      answer: "Please, add some flashcards to this pack",
                    },
                  ]
            }
          />

          <div className="flex justify-between items-center">
            <button
              onClick={prevCard}
              className="text-blue-600 hover:text-blue-800"
              disabled={flashCards.length === 0}
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="text-gray-600">
              {currentCard + 1} / {flashCards.length}
            </div>
            <button
              onClick={nextCard}
              className="text-blue-600 hover:text-blue-800"
              disabled={flashCards.length === 0}
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex justify-between">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300 flex items-center">
            <RotateCw className="w-5 h-5 mr-2" />
            Shuffle
          </button>
          <button
            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition duration-300 flex items-center"
            onClick={handleEditPack}
          >
            <Pencil className="w-5 h-5 mr-2" />
            Edit Pack
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardPackPage;
